---
title: Offline medical search engine
summary: Finds the right medicine in under 15 ms from a 450,000-product catalog, even when the pharmacist misspells it, and shows what's in stock first.
order: 2
role: Design and implementation
stack: Python, MongoDB, Double Metaphone, Django
result: Under 15 ms per search over 450,000+ products, fully offline
---

## The problem

Medicine names are hard to search. Brands mix letters, numbers and units (`Dolo 650mg`, `M2Pan-D`, `VSL3`), many products differ only by strength, and pharmacists often type what a doctor's handwriting *sounded* like. A normal text search either finds nothing or buries the right product under fifty wrong ones.

It also had to run **offline on the store's own computer**, often older hardware, while the customer waits.

## How it works

### 1. Medicine-aware tokenizing

Units are split from numbers (`Dolo650mg` becomes `Dolo`, `650`, `mg`), but brand names that contain digits stay whole (`M2Pan` stays `M2Pan`). Generic tokenizers break these into meaningless pieces.

### 2. Phonetic matching

Every product also gets a Double Metaphone sound code, so spellings that sound alike still match the right brand.

### 3. Search in tiers, strictest first

Instead of one expensive fuzzy query, the engine runs a series of cheap, indexed MongoDB queries and stops once it has enough good candidates.

```diagram
{
  "rows": [
    [{"label": "Starts-with match", "sub": "index scan, with space/hyphen variants"}],
    [{"label": "All words match", "sub": "exact tokens"}],
    [{"label": "Brand without strength", "sub": "drops numbers"}],
    [{"label": "Sounds-like match", "sub": "phonetic codes"}],
    [{"label": "Shortened prefixes, then wider fallbacks", "sub": "only if still short of results"}]
  ],
  "caption": "Most searches finish in the first one or two tiers, which keeps response time low."
}
```

### 4. Ranking that knows the shelf

Candidates are scored on match quality, which tier found them and how much of the query they cover. Products **currently in stock at that store** get a large boost, because the pharmacist needs to sell what is on the shelf, not the best spelling match.

## Results

- Searches return in **under 15 ms** across **450,000+ products**, with no internet.
- Misspelled and phonetic queries still find the right brand.
- In-stock items appear first, which reduces back-and-forth at the counter.

## What I learned

Domain rules beat clever algorithms. The biggest wins came from understanding how pharmacists actually type, not from a fancier fuzzy-matching library.
