---
title: Keyboard-first desktop apps, from Flutter to React + Tauri
summary: Made our Flutter data-entry grids fast and usable without a mouse, then co-built a lighter React + Tauri client with my team for low-end Windows PCs.
order: 5
role: Grid performance, keyboard navigation, co-built the new client
stack: Flutter, React, Tauri, TypeScript, Provider
result: Smooth keyboard-driven grids on large purchase bills, far fewer background saves, and a second desktop client in 2+ stores
---

## The problem

Experienced pharmacists come from older DOS-style software and work almost entirely from the keyboard. Every time they reach for the mouse, the queue gets longer.

Our Flutter desktop app had two issues. The big data-entry grids (a supplier bill can have hundreds of lines and 13+ columns) **lagged when scrolling and typing**, and **keyboard-only navigation on Windows was hard to get right**: focus jumped unexpectedly, and some dialogs needed the mouse.

## Proving the approach first

Before changing production screens, I built a small proof of concept that compared two ways of doing mouse-free grids: a custom focus manager that maps every cell to a (row, column) position, and a ready-made grid package. The custom approach kept our existing UI and cell types with no new dependency, so that is what we took forward.

## Making the Flutter grids smooth

I then rebuilt the purchase invoice, purchase return and add-inventory grids on one shared architecture, with a reusable **2D keyboard traversal** helper:

- **Fixed row heights**, so Flutter computes scroll positions with simple maths instead of measuring every row. Dragging the scrollbar across thousands of rows stays smooth.
- **Cached cell references**, rebuilt only when rows are added, removed or filtered. Before, a single Enter key press rebuilt the cell list twice and created thousands of short-lived objects.
- **Scroll only when needed**: tabbing across cells in a row that is already visible no longer fires a scroll animation, which removed the jitter.
- **Stable row identity**: rows are keyed by the data item, not by their position, so sorting and filtering never show stale values in the wrong row.
- **Fewer rebuilds**: one update per keystroke instead of three, and off-screen rows are no longer kept alive in memory.

I wrote this up as an architecture guide so the rest of the team could build new grids the same way.

## Keyboard flow

- Arrow keys, Tab and Enter move through every cell, in both directions.
- **F2 from anywhere** puts focus in the medicine search for a quick price check.
- A shared dialog base, now used by 20+ dialogs, so **Escape closes any of them**.

## Smarter auto-save

The purchase list used to save on a fixed 10-second timer, even when nothing had changed. I replaced it with **dirty flags and a debounce**: each changed row is marked, and the list saves a few seconds after the user stops typing, only if something changed, and only the changed rows. Idle screens stopped saving altogether, so most of those save requests disappeared.

## Why we built a React + Tauri client

Even after these fixes, Flutter on Windows stayed heavy for low-end shop PCs. Together with my teammates, I co-built a second client in **React + Tauri**. It uses the system's built-in web view, so it is much lighter, and browser focus handling gives precise keyboard control. My larger areas there were the clinic and dermatology workflows (reception, appointments, billing, payments and cash management), shared components, and automated flow tests. It now runs in **2+ stores**.

```diagram
{
  "rows": [
    [{"label": "Flutter client", "sub": "5+ stores, rich printing and hardware support"}, {"label": "React + Tauri client", "sub": "2+ stores, lighter, keyboard-first"}],
    [{"label": "Same local Django backend", "sub": "both clients share one API"}]
  ],
  "caption": "Because the backend runs locally behind one API, we could add a new client without touching store data."
}
```

## Results

- **Smooth scrolling and typing** on large purchase bills, entirely from the keyboard.
- **Far fewer** auto-save requests from the purchase list.
- One grid architecture and guide that new screens now follow.
- A second, lighter client in production in 2+ stores.
