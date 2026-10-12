---
title: Supplier bill reading and nightly jobs on GCP
summary: Turns photos and PDFs of supplier bills into purchase entries in the background, and runs nightly reports and expiry alerts for every store.
order: 5
role: Backend and cloud pipeline
stack: GCP Pub/Sub, Cloud Scheduler, Python, Django, MongoDB
result: No more typing supplier bills line by line; daily reports and alerts with no manual work
---

## The problem

Every stock delivery comes with a supplier bill listing dozens of medicines, batches, expiry dates and prices. Typing it in by hand is slow and full of mistakes.

At the same time, store owners want daily reports and early warnings about expiring stock, without anyone remembering to run them.

## Reading supplier bills

Reading a bill image takes too long to do while the pharmacist waits, so the work is queued instead:

```diagram
{
  "rows": [
    [{"label": "Pharmacist uploads a bill", "sub": "photo or PDF"}],
    [{"label": "Pub/Sub message", "sub": "the app moves on immediately"}],
    [{"label": "Background worker", "sub": "image-to-text, then matched to products"}],
    [{"label": "Draft purchase entry", "sub": "pharmacist reviews and confirms"}]
  ],
  "caption": "The slow step runs in the cloud. The pharmacist keeps working and confirms the draft when it's ready."
}
```

## Nightly jobs

**Cloud Scheduler** triggers jobs every night to:

- generate inventory and sales reports for each store, and
- flag medicines nearing expiry and stock that isn't moving.

Owners see the results when they open the app in the morning.

## Results

- Purchase entry starts from a draft instead of a blank screen.
- Billing never waits on slow cloud work.
- Daily reports and expiry alerts arrive with no manual effort.

## What I learned

Queues make a product feel fast. Anything that doesn't need an answer *right now* should leave the user's critical path.
