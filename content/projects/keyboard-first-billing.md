---
title: Keyboard-first billing, from Flutter to React + Tauri
summary: Made billing 40% faster by letting pharmacists work without touching the mouse, then built a lighter React + Tauri client to do it better on Windows.
order: 4
role: Performance work, UX architecture, new client
stack: Flutter, React, Tauri, TypeScript, Provider
result: 40% faster billing, 60–120 fps grid, ~80% fewer auto-save requests
---

## The problem

Experienced pharmacists come from older DOS-style software and bill entirely from the keyboard. Every time they reach for the mouse, the queue gets longer.

Our Flutter desktop app had two issues: the billing grid stuttered on large bills, and **keyboard-only navigation on Windows was hard to get right**. Focus jumped unexpectedly, and dialogs needed the mouse.

## Making the Flutter grid smooth

The billing grid has 20+ columns and can hold thousands of rows. I re-architected it:

- **Fixed row heights**, so the grid computes scroll positions with simple maths instead of measuring every row.
- **Cached cell references**, so pressing Enter or Tab no longer creates thousands of short-lived objects.
- **No scroll jitter**: the grid only scrolls when the next cell is actually off-screen.
- **Stable row identity**, so sorting and filtering never show stale values.
- **One update per keystroke** instead of three separate state notifications.

Result: the grid holds **60–120 fps** while scrolling and typing.

## A mouse-free flow

- Arrow keys and Enter move through every form; Enter on a button runs it.
- Escape closes any dialog, and every dialog uses the same shared base.
- **F2 from anywhere** jumps to medicine search for a quick price check.
- Shortcut profiles stored per store, including Tally-style keys, so staff keep their muscle memory.

Together this cut billing time per customer by **40%**.

## Why we built a React + Tauri client

Even after the fixes, Flutter on Windows remained heavy for low-end shop PCs, and keyboard focus handling kept fighting us. I built a second client in **React + Tauri**: it uses the system's built-in web view, so it is much lighter, and web focus handling gave us precise keyboard control. It now runs in **5+ stores**.

```diagram
{
  "rows": [
    [{"label": "Flutter client", "sub": "10+ stores, rich printing and hardware support"}, {"label": "React + Tauri client", "sub": "5+ stores, lighter, keyboard-first"}],
    [{"label": "Same local Django backend", "sub": "both clients share one API"}]
  ],
  "caption": "Because the backend runs locally behind one API, we could add a new client without touching store data."
}
```

## Smarter auto-save

Bills used to save on a fixed 10-second timer, even when nothing changed. I replaced it with a dirty-flag and 5-second debounce: save only after the user pauses and only if something changed. That removed about **80% of save requests**.

## Results

- **40% faster** billing per customer.
- **60–120 fps** billing grid on large bills.
- **~80% fewer** auto-save requests.
- A second, lighter client in production in 5+ stores.
