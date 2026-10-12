---
title: Peer-to-peer sync between billing counters
summary: Counters in the same store find each other automatically and share sales and stock in real time over the local network, with no internet and no server.
order: 3
role: Design and implementation
stack: Python, MongoDB change streams, Zeroconf / mDNS, Django
result: Multi-counter stores stay consistent during internet outages
---

## The problem

Many pharmacies have two to four billing counters. If counter 1 sells the last strip of a medicine while the internet is down, counter 2 must know immediately, or it will sell stock that no longer exists.

Store staff can't configure IP addresses, and there is no central server in the shop. The counters had to sort it out themselves.

## How it works

```diagram
{
  "rows": [
    [{"label": "Counter A writes a sale", "sub": "local MongoDB"}],
    [{"label": "Change stream fires", "sub": "watcher thread picks it up"}],
    [{"label": "1-second batch", "sub": "groups rapid writes"}],
    [{"label": "Counter B and C", "sub": "apply the change, mark it as received"}]
  ],
  "caption": "Received changes are tagged so they are not broadcast back, which prevents an endless echo between counters."
}
```

- **Zero-config discovery.** Each counter announces itself with mDNS (Zeroconf), so others find it automatically when they join the network.
- **Handshake on discovery.** mDNS packets can be lost, so when two counters find each other they also exchange a direct HTTP announce. A counter that restarts is picked up again right away.
- **Change streams.** Background threads watch the sales, stock and customer collections and react to every write.
- **Batching.** Writes are buffered for one second and sent together, so a busy counter doesn't flood the network.

## The tricky part: stopping echo loops

Counter A sends a change to B. B writes it, B's own watcher sees a new write, and sends it back to A. A writes it again… and the two counters loop forever.

I solved this with a small in-memory set of IDs that arrived from peers. Before writing a received change, the ID goes into the set. When the local watcher fires, it checks the set, removes the ID and skips re-broadcasting. Only changes made *at that counter* are sent out.

## Results

- Stores with multiple counters keep stock consistent during internet outages.
- No setup by store staff: plug in the computer and the counters find each other.

## What I learned

Distributed systems problems show up even inside one small shop. Thinking through failure cases first (dropped packets, restarts, echoes) mattered more than the happy path.
