---
title: Offline medical search engine
summary: Finds the right medicine in a 450,000-product catalog, even when the pharmacist misspells it, and shows what's in stock first. Built on MongoDB, fully offline.
order: 2
role: Design and implementation
stack: Python, MongoDB, Double Metaphone, RapidFuzz, Django
result: About 110 ms per search over 450,000+ products, fully offline; indexed lookups about 1,000× faster than a regex scan
---

## The problem

Medicine names are hard to search. Brands mix letters, numbers and units (`Dolo 650mg`, `M2Pan-D`, `VSL3`), many products differ only by strength, and pharmacists often type what a doctor's handwriting *sounded* like. A normal text search either finds nothing or buries the right product under fifty wrong ones.

It also had to run **offline on the store's own computer**, often older hardware, while the customer waits. Running a separate search server (Meilisearch) on every shop PC was heavy, slow to index and sometimes simply not running. So I built search into the database the store already had.

## How it works

### 1. Medicine-aware tokenizing (when a product is saved)

Each product name is turned into two indexed arrays:

- **Prefix tokens.** Every word is stored with its prefixes (`par`, `para`, … `paracetamol`), so typing the start of a name is an exact index match, not a slow pattern scan.
- **Sound codes.** Every word also gets a Double Metaphone code, so `krosin` and `Crocin` both become `KRSN`.

Units are split from numbers (`650mg` becomes `650` + `mg`), but brand names that contain digits stay whole (`M2Pan`, `VSL3`, `T4`). A generic tokenizer would break them into meaningless pieces. Common words get sibling spellings, so typing `tab` matches `Tablet`.

### 2. Search in tiers, strictest first

Instead of one expensive fuzzy query, the engine runs a series of cheap, indexed MongoDB queries. It stops as soon as it has enough candidates.

```diagram
{
  "rows": [
    [{"label": "Starts-with match", "sub": "with space and hyphen variants"}],
    [{"label": "All words match", "sub": "exact tokens"}],
    [{"label": "Brand without strength", "sub": "drops the numbers"}],
    [{"label": "Sounds-like match", "sub": "phonetic codes"}],
    [{"label": "Shorter prefixes, then any word", "sub": "only if still short of results"}]
  ],
  "caption": "Each tier is an indexed query that joins in this store's stock. Later tiers run only when earlier ones didn't find enough."
}
```

### 3. Ranking that knows the shelf

Candidates are scored on which tier found them, whether the name starts with the query, how much of the query they cover, and a fuzzy similarity score (RapidFuzz). Products **currently in stock at that store** get a large boost, because the pharmacist needs to sell what is on the shelf, not the best spelling match.

## Measured, not guessed

I wrote a read-only benchmark that runs real queries against the full 450,000-product catalog (on a development laptop, not a store PC):

| Query | Typical time | Top result |
|---|---|---|
| `crocin` | 112 ms | Crocin ✔ |
| `krosin` (misspelt) | 86 ms | Crocin DS syrup ✔ (sounds-like) |
| `azitral` (misspelt) | 22 ms | Azithral ✔ |
| `parasetamol 500` (misspelt) | 288 ms | Paracetamol 500 mg ✔ |

- **Typical search: about 110 ms. Slowest: about 300 ms.** That includes every tier, the stock lookup and ranking.
- **Indexed lookup: 2 ms** reading 9 index keys, compared with **2,173 ms** reading 454,080 keys for a plain regex search over the same names.

The benchmark also showed me three weaknesses, which are now the next fixes:

1. **Overlapping tiers.** Early tiers often return the same products, so later tiers still run. This is why `paracetamol` is the slowest query.
2. **`dolo650` without a space** ranks Dolo 500 above Dolo 650, because the word and number aren't split when no unit follows.
3. **No minimum score.** Gibberish still returns the "closest sounding" product instead of nothing.

## Results

- About **110 ms per search** across **450,000+ products**, with no internet and no extra search server.
- Misspelled and phonetic queries still find the right brand.
- In-stock items appear first, which reduces back-and-forth at the counter.
- Meilisearch can still be switched on per store; MongoDB search is the fallback when it isn't running.

## What I learned

Domain rules beat clever algorithms. The biggest wins came from understanding how pharmacists actually type, not from a fancier fuzzy-matching library. And measuring is humbling: the benchmark found problems that no amount of reading the code had shown me.
