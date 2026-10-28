---
title: Offline-first pharmacy POS & ERP
summary: A billing, inventory and reporting platform that keeps working when the internet doesn't, packaged as a one-click Windows install.
order: 1
role: Backend, sync, search, desktop clients, deployment
stack: Flutter, React, Tauri, Django, MongoDB, SQLite, Meilisearch, PyInstaller, Inno Setup
result: In daily use in 5+ stores on Flutter and 2+ on React + Tauri; new store setup cut from about 2 hours to about 7 minutes
---

## The problem

A pharmacy counter has a queue of unwell people, thousands of medicines with near-identical names, batch numbers, expiry dates and GST rules. If billing stops, the store stops. Internet in many Indian retail locations is unreliable, so a cloud-only web app was never an option.

The product had to bill, print and update stock with **no internet at all**, then catch up with the cloud when the connection came back.

## What we built

Every store computer runs the full system locally. A desktop client talks to a Django backend on the same machine, and that backend has its own MongoDB. **The same Django code runs in the cloud and in the shop.** One flag decides which mode it is in, and every cloud-only call (push notifications, payments, queues) checks that flag first. The cloud holds the master catalog, backups and heavy background work. It is never on the critical path of a sale.

```diagram
{
  "rows": [
    [{"label": "Desktop client", "sub": "Flutter or React + Tauri"}],
    [{"label": "Local backend", "sub": "Django on Waitress, frozen into one .exe"}],
    [{"label": "MongoDB (single-node replica set)", "sub": "sales, stock, customers; replica set enables transactions and change streams"}, {"label": "SQLite", "sub": "Django internals, remembered database addresses"}, {"label": "Meilisearch (optional)", "sub": "typo-tolerant index; MongoDB search is the fallback"}],
    [{"label": "Other counters on the LAN", "sub": "peer-to-peer sync (in testing)"}, {"label": "Cloud", "sub": "catalog, backups, async jobs"}]
  ],
  "caption": "Each store machine can bill on its own. It catches up with the cloud whenever the internet is back."
}
```

Main parts of the platform:

- **Billing with multiple open bills.** Each bill tab has its own isolated state, so a pharmacist can park a customer who forgot their prescription and serve the next person without losing anything.
- **Batch-aware selling.** Selling 15 tablets when one batch has only 10 left automatically splits the line across batches, oldest first. Loose tablets and full strips are both supported.
- **Printing.** One shared print model covers sales, purchases and returns, and outputs 3-inch thermal receipts or multi-page A4 PDFs with continuation headers and a final tax summary.
- **Role-based reports.** Cashiers see daily collections; owners also see margins, supplier ledgers and GST reports. Exports stream to Excel without freezing the UI.
- **A database that repairs itself.** Shop PCs get switched off at the wall. On start-up the backend checks that MongoDB is reachable, starts the Windows service if it isn't, and repairs the replica set if it comes back in the wrong state. Staff never see a database error screen.

## Catching up with the cloud

When the internet returns, a background sync moves data in both directions, collection by collection:

- **Watermarks.** Each collection remembers the time of its last successful sync, so a sync only moves documents changed since then. The watermark is the time the sync *started*, so a write that lands during a sync is picked up next time instead of being lost.
- **Safe to repeat.** Every write is an upsert on the document's business key, so a sync that dies halfway can simply run again without creating duplicates.
- **Deletes travel too.** A deleted document leaves a small "tombstone" record, which sync carries to the other side.
- **Conflicts.** When the same document changes on both sides, the last write wins. For a single-counter store this is simple and predictable, and the trade-off is documented.

## Shipping it to a store

A pharmacy has no IT team, so installation had to be one file. The release build is automated:

1. **PyInstaller** freezes the Django backend into a single Windows executable.
2. **Inno Setup** bundles it with the desktop app, the search engine, database setup scripts, runtimes and a pre-built copy of the medicine catalog.
3. The installer registers the backend to start with Windows, so the pharmacist just turns on the computer and starts billing.

The whole build runs from one script, so a release is repeatable instead of a manual checklist.

## Onboarding a new store: about 2 hours → about 7 minutes

A new store needs the full medicine catalog, 450,000+ products, before it can bill. Pulling it through the sync API took around **2 hours** on typical shop broadband. Loading the whole file at once also used 2 GB+ of extra RAM, which made 4 GB shop PCs crawl. The fix had four parts:

1. **Ship the catalog in the installer.** The build time becomes the sync watermark, so the first sync downloads only what changed since the build, not 450,000 products.
2. **Stream instead of load.** The file is read one product per line, with a flat parser about 5× faster than the generic one, so memory stays flat.
3. **Bulk insert into empty collections.** Instead of one upsert per product, products go in with `insert_many` in batches of 50,000. With unordered writes, one duplicate no longer stops a whole batch, and the counts stay correct.
4. **Move slow work off the first login.** Building the search index and copying database indexes now run in background threads.

I built the streaming loader, the bulk-insert path with its error handling, and per-stage timing logs that show exactly where setup time goes. Setup now takes **about 7 minutes**. The exact time depends on the PC and the connection.

## Results

- In daily use in **5+ stores** on the Flutter client and **2+ stores** on the React + Tauri client.
- Billing continues with zero internet; data catches up automatically when the connection returns.
- New store setup reduced from **about 2 hours to about 7 minutes**.

## What I'd do differently

I'd invest in automated end-to-end tests of the billing flow from day one. We're adding component and full-flow tests now, so every release can be checked before it reaches a store.
