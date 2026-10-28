---
title: Premium features with safe online payments
summary: Lets a store buy add-on features in the app and pay online, with payments that can never be lost or applied twice, even offline or when the payment gateway misbehaves.
order: 3
role: Sole developer: backend, app integration, tests
stack: Django, MongoDB, Pinelab, Ably, Flutter
result: Live in stores. Built end to end on my own: every paid order unlocks exactly once, backed by 470+ automated tests
---

## The problem

The business wanted to sell add-ons, such as smarter search, bulk upload and extra reports, on top of the basic licence. A store owner should be able to buy one inside the app, pay online, and have it unlock straight away on every store they own.

Payments are where software loses trust fastest. A real payment gateway sends callbacks late, twice, or not at all. The app may be closed mid-payment. And our stores run their own backend, often without internet. Whatever happened, the rule had to be: **every paid order unlocks exactly once, and nobody pays for something they don't get.**

## What I built

- **A catalog of feature groups.** Customers buy a group (for example "Smart Search", yearly), never a single feature. Prices, durations and grace periods live in the database, so the business can change them without a release.
- **Locks in three places.** The app hides or blurs locked screens. The backend refuses a locked API with a clear `402 PREMIUM_LOCKED`. Global search still answers, but skips locked tabs and says so.
- **Fair pricing.** A plan bought mid-licence is priced only up to the licence end date. A renewal bought early starts the day after the current one ends.
- **Never block a pharmacy by mistake.** If the licence check itself fails, the store is treated as fully licensed. A bug in my code must never stop a sale.

## The hard part: payments that can't go wrong

Three independent paths can each finish a payment, and any one of them is enough:

```diagram
{
  "rows": [
    [{"label": "Pinelab callback", "sub": "the gateway calls us"}, {"label": "App polling", "sub": "every 5 seconds while open"}, {"label": "Reconcile job", "sub": "every 10 minutes"}],
    [{"label": "Atomic claim", "sub": "one find-and-update; only one caller wins"}],
    [{"label": "Create the entitlement", "sub": "unique per order; per-store lock for date stacking"}],
    [{"label": "Mark done, notify every store", "sub": "Ably push, app refreshes its locks"}]
  ],
  "caption": "Any path, any number of times, even at the same moment: the order is fulfilled exactly once."
}
```

How each risk is handled:

- **Called twice at once.** A single atomic database update moves the order from *pending* to *in progress*. Only one caller can win. The others just read the current state.
- **Crash halfway.** A unique index on the order ID means a second entitlement can never exist. If a worker dies after inserting, the retry reuses the record it finds. A claim older than 5 minutes can be taken over.
- **Two purchases at the same moment.** A short lease lock per business stops two orders from getting overlapping dates.
- **Callback never arrives.** The reconcile job finds paid-but-unfulfilled orders and finishes them. It only gives up on an order when the gateway *says* it is unpaid after 24 hours. An unreachable gateway is "unknown", not "unpaid".
- **Repeated failure.** After 5 failed attempts the order raises a support alert, so a person fixes it instead of it failing silently.
- **Offline stores.** Purchases are always written to the cloud. Each store's local backend keeps a synced copy for reading, and checks again with the cloud before blocking anything, so a store never stays locked after paying.

## Testing

I wrote **470+ automated tests** with fake databases and a fake gateway. They cover every flow: duplicate callbacks, crashes between steps, races between two payments, the gateway being down, licence changes, and the offline backend. None of them touch a real database or a real payment.

## Results

- **Live in production**: stores buy and unlock features from inside the app.
- One purchase flow that is safe to retry from anywhere, at any time.
- Support tools to grant, extend or revoke a plan, and an analytics page showing demand, the paywall funnel and revenue.
- Documentation that maps every business flow to the exact function that implements it.

## What I learned

With payments, the happy path is only the start. I listed every way a payment can go wrong first, and designed so that the worst case is "a little late", never "lost" or "charged twice".
