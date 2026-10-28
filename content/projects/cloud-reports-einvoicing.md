---
title: GST e-invoicing and cloud report jobs
summary: Files GST e-invoices and e-way bills for wholesale sales automatically, and keeps store reports up to date in the background on Google Cloud, so nobody has to do either by hand.
order: 6
role: E-invoicing (main author), report pipeline (contributor)
stack: Python, Django, MongoDB, GCP Pub/Sub, Cloud Functions, Cloud Storage, GSTZen API
resultLabel: Outcome
result: Wholesale invoices get their GST IRN and e-way bill on each supplier's own schedule; invalid invoices are caught before they ever reach the GST portal
---

## The problem

Two kinds of work were slowing the product down or depending on people:

- **GST e-invoicing.** In India, B2B sales above a turnover limit need an e-invoice registered with the GST portal (an IRN), and often an e-way bill for transport. Done by hand, it is slow, easy to forget, and has legal deadlines. One wrong field and the portal rejects the invoice.
- **Reports.** Owners want per-medicine stock movement, purchase and sales reports, and profit and loss. Working that out from raw data while the owner waits is slow, and it loads the database that billing uses.

Neither needs to happen while a customer is at the counter, so both run in the background, behind a queue.

## GST e-invoicing (main author)

```diagram
{
  "rows": [
    [{"label": "Wholesale sale saved", "sub": "validated, payload built"}],
    [{"label": "Queue row: pending", "sub": "same database transaction as the sale"}],
    [{"label": "Cloud Function", "sub": "due today? file with GSTZen"}],
    [{"label": "IRN + e-way bill", "sub": "PDFs stored in Cloud Storage"}]
  ],
  "caption": "The sale and its queue row are saved together, so a sale is never lost from the queue and the queue never holds a sale that was rolled back."
}
```

**In the backend**, I wrote the part that turns a sale into a valid e-invoice:

- **Validation before filing.** Around 30 checks taken from the official e-invoice schema: GSTINs and state codes, document number rules, PIN codes, HSN codes, units, e-way bill transport details, and totals that must add up within the portal's tolerance. A bad invoice is rejected with a clear list of errors *when it is saved*, not days later by the portal.
- **Payload builder.** Maps our sale to the government's JSON format: CGST + SGST for sales inside a state, IGST across states, and pack sizes converted to official unit codes (`10 tablets` becomes `TBS`).
- **Queue in the same transaction.** The queue row is written in the same MongoDB transaction as the sale. If the sale fails, no row; if the row fails validation, the sale is not saved.

**In the cloud**, I wrote two Cloud Functions on my own:

1. **Filing.** Picks pending invoices oldest first, in batches of up to 100. Each supplier chooses when to file: the same day, or after a set number of days. On a configurable day each month, every pending invoice from the previous month is filed regardless, so nothing misses the deadline. It calls GSTZen for the IRN (and the e-way bill when needed), and records *pending → processing → success / failed* with the full response.
2. **PDFs.** Downloads the e-invoice and e-way bill PDFs and stores them in Cloud Storage. Failed downloads are simply picked up again on the next run, and storing the same file twice is harmless.

My teammates later added credit and debit notes, keeping the queue in step when a sale is edited, and an "E-Way Bill" button that files instantly instead of waiting for the next run.

## Cloud report jobs (contributor)

Every sale and purchase publishes a small **Pub/Sub** message. Cloud Functions update the report data: a stock ledger per medicine and batch, and the numbers behind the reports screen. On offline stores the same function code runs inside the local backend instead.

This pipeline was built by the team. From my first months in 2024, I worked on:

- the backend side that publishes each stock movement, and keeping the "buy later" list in step with the low-stock purchase list;
- flipping a medicine's *in stock* flag in the offline search index only when its stock crosses zero, instead of on every sale;
- report correctness: purchase reports used the goods value instead of the net invoice value, stock valuation used the wrong purchase price, and bill-wise profit and loss was off.

## Results

- Wholesale invoices are filed automatically, on each supplier's schedule, with a record of every attempt.
- Invalid invoices are caught at save time, with errors the user can act on.
- Billing never waits on the GST portal or on report calculations.

## What I learned

For anything with a legal deadline, validate early and keep a status and a full record for every item, so a person can always see what happened. And queues make a product feel fast, but correctness is where the real work is: a report that loads in a second and shows the wrong profit is worse than a slow one.
