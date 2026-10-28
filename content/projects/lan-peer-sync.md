---
title: Peer-to-peer sync between billing counters
summary: Counters in the same store find each other on the local network and share stock changes within seconds, with no internet and no central server.
order: 4
role: Team project, contributor
stack: Python, MongoDB change streams, Zeroconf / mDNS, Django
resultLabel: Where it stands
result: Team-built and in testing behind a feature flag. I know every part of the design, and what's left to fix
---

## The problem

Many pharmacies have two to four billing counters. If counter 1 sells the last strip of a medicine while the internet is down, counter 2 must know quickly, or it will sell stock that no longer exists.

Store staff can't configure IP addresses, and there is no central server in the shop. The counters had to sort it out themselves.

## My part

This was a team project, and a teammate wrote most of the code. I worked on parts of it, and I took the time to understand every piece: how counters discover each other, the handshake, the change watcher, the batching and the echo protection. I also know the failure cases and why it is still in testing rather than running in stores.

## How it works

```diagram
{
  "rows": [
    [{"label": "Counter A writes a stock change", "sub": "its own local MongoDB"}],
    [{"label": "Change stream fires", "sub": "a watcher thread picks it up"}],
    [{"label": "1-second batch", "sub": "groups rapid writes per collection"}],
    [{"label": "HTTP POST to every peer", "sub": "B and C upsert it and mark it as received"}]
  ],
  "caption": "Received changes are tagged so they are never sent back, which prevents an endless echo between counters."
}
```

- **Zero-config discovery.** Each counter announces itself with mDNS (Zeroconf) on the shop network, so the others find it automatically.
- **Handshake on discovery.** mDNS packets can be lost, so when two counters find each other they also exchange a direct HTTP "announce". A counter that restarts is picked up again quickly.
- **Change streams.** Background threads watch the inventory collections, where stale data hurts most at the counter, and react to every write. This is why each store's MongoDB runs as a replica set: change streams need one.
- **Batching.** Writes are buffered for one second and sent together, so a busy counter doesn't flood the network.
- **Heartbeats.** Counters check on each other every 60 seconds. A peer that misses three in a row is dropped.
- **No extra server.** It runs inside the Django backend each counter already has.

## The tricky part: stopping echo loops

Counter A sends a change to B. B writes it, B's own watcher sees a new write and sends it back to A. A writes it again, and the two counters loop forever.

There are three guards, and a change is re-sent only if it passes all of them:

1. **Who made it.** Every write records which counter made it. A counter only broadcasts its own changes.
2. **Recently received.** IDs that just arrived from a peer go into a short-lived map. When the local watcher fires for one of them, it is skipped.
3. **Sync marker.** Documents written by a sync carry a marker, so the watcher can tell a sync write from a cashier's.

Three guards may sound like a lot, but each one covers a gap the others leave, such as a restart that wipes the in-memory map.

## Why it isn't live yet

Getting the happy path working was the easy half. Before it runs in stores, these need to be solved:

- **Catching up after downtime.** A counter that was off needs every change it missed, not only the new ones.
- **Deletes.** Today, removed records aren't sent to the other counters.
- **Retries.** If a peer is busy when a batch is sent, that batch is lost.
- **Trust.** Any machine on the shop network could currently send changes. Peers need to authenticate each other.

## What I learned

Distributed systems problems show up even inside one small shop. Thinking through failure cases first (dropped packets, restarts, echoes, a counter that was off all morning) matters more than the happy path. Knowing *why* something isn't ready to ship is as valuable as building it.
