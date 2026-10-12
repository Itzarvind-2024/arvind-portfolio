---
title: Offline-first pharmacy POS & ERP
summary: A billing, inventory and reporting platform that keeps working when the internet doesn't, packaged as a one-click Windows install.
order: 1
role: Architecture, backend, desktop clients, deployment
stack: Flutter, React, Tauri, Django, MongoDB, SQLite, Meilisearch, PyInstaller, Inno Setup
result: In daily use across 10+ stores; new store setup cut from 2 hours to 7 minutes
---

## The problem

A pharmacy counter has a queue of unwell people, thousands of medicines with near-identical names, batch numbers, expiry dates and GST rules. If billing stops, the store stops. Internet in many Indian retail locations is unreliable, so a cloud-only web app was never an option.

The product had to bill, print and update stock with **no internet at all**, then catch up with the cloud when the connection came back.

## What I built

Every store computer runs the full system locally: a desktop client talks to a Django backend on the same machine, which keeps its own databases. The cloud is used for the master catalog, backups and heavy background work. It is never on the critical path of a sale.

```diagram
{
  "rows": [
    [{"label": "Desktop client", "sub": "Flutter or React + Tauri"}],
    [{"label": "Local backend", "sub": "Django on Waitress, runs as a background process"}],
    [{"label": "MongoDB replica set", "sub": "sales, stock, customers"}, {"label": "SQLite", "sub": "fast local cache"}, {"label": "Meilisearch", "sub": "fuzzy text index"}],
    [{"label": "Other counters on the LAN", "sub": "peer-to-peer sync"}, {"label": "Cloud", "sub": "catalog, backups, async jobs"}]
  ],
  "caption": "Each store machine is self-sufficient. Counters sync with each other over the LAN and with the cloud when online."
}
```

Main parts of the platform:

- **Billing with multiple open bills.** Each bill tab has its own isolated state, so a pharmacist can park a customer who forgot their prescription and serve the next person without losing anything.
- **Batch-aware selling.** Selling 15 tablets when one batch has only 10 left automatically splits the line across batches, oldest first. Loose tablets and full strips are both supported.
- **Printing.** One shared print model covers sales, purchases and returns, and outputs 3-inch thermal receipts or multi-page A4 PDFs with continuation headers and a final tax summary.
- **Role-based reports.** Cashiers see daily collections; owners also see margins, supplier ledgers and GST reports. Exports stream to Excel without freezing the UI.
- **Background checks.** Expiry alerts, slow-moving stock and reorder suggestions, run by a thread-safe task manager that never starts the same job twice.

## Shipping it to a store

A pharmacy has no IT team, so installation had to be one file. I automated the release build:

1. **PyInstaller** freezes the Django backend into a single Windows executable.
2. **Inno Setup** bundles it with the desktop app, the local search engine, database setup scripts and runtimes.
3. The installer registers the backend to start with Windows, so the pharmacist just turns on the computer and starts billing.

The whole build runs from one script, so a release is repeatable instead of a manual checklist.

## Onboarding a new store: 2 hours → 7 minutes

A new store needs the full medicine catalog, 450,000+ products, on its machine. Pulling it through the API took around **2 hours** on typical shop broadband. I replaced this with a pre-built catalog file loaded through unordered bulk upserts into MongoDB, which brought setup down to about **7 minutes**.

## Results

- In daily use across **10+ stores** on the Flutter client and **5+ stores** on the React + Tauri client.
- Billing continues with zero internet; data catches up automatically when the connection returns.
- New store setup reduced from **2 hours to 7 minutes**.

## What I'd do differently

I'd invest in automated end-to-end tests of the billing flow from day one. We're adding component and full-flow tests now, so every release can be checked before it reaches a store.
