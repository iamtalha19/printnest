# 🖨️ Printnest — Next.js Print Store

[![Next.js](https://img.shields.io/badge/Next.js-v16.1.6-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org)

> A modern, responsive Next.js storefront demo focused on custom printing and on-demand merchandise (T-shirts, hoodies, business cards, packaging and more).

---

Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started (Local)](#getting-started-local)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Core Concepts & Components](#core-concepts--components)
- [API & Orders](#api--orders)
- [Styling & Animations](#styling--animations)
- [Testing & Linting](#testing--linting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting / FAQ](#troubleshooting--faq)

---

## Overview

Printnest is a demo Next.js storefront showcasing a modern UI for ordering printed products. It demonstrates common e-commerce patterns: product listings, cart/wishlist interactions, a checkout flow (server-side order handling), and UI polish using Tailwind CSS and Framer Motion.

The project is ideal as a starter template or a reference for building a lightweight e-commerce frontend with serverless-ish order handling.

---

## Features

- 🏷️ Product listing with product cards and quick-view modal
- 🛒 Cart with add/remove and quantity logic (Redux Toolkit)
- 💖 Wishlist (toggle) using Redux Toolkit
- ✉️ Server-side order handling via `/api/place-order` which saves to `orders.json` and sends email confirmations (nodemailer)
- 💨 Smooth animations via Framer Motion
- 🎨 Fully responsive layout with Tailwind CSS
- 🔍 Search input, account, and helpful UI components (Navbar, Hero, Footer)

---

## Prerequisites

- Node.js 18+ (recommended)
- npm (or yarn/pnpm)

Check Node version:

```bash
node -v
# recommended >= 18.0.0
```

---

## Getting Started (Local)

1. Clone the repo

```bash
git clone <repo-url> printnest
cd printnest
```

2. Install dependencies

```bash
npm install
```

3. Create `.env.local` (see Environment Variables below)

4. Start the dev server

```bash
npm run dev
```

5. Open `http://localhost:3000`

Notes:

- The project uses the App Router (`app/`) and TypeScript-friendly setup.
- Product/content data is seeded from `src/app/db.json`.

---

## Environment Variables

Create a `.env.local` at the project root to enable email sending for order confirmations. Example:

```env
EMAIL_USER=you@example.com
EMAIL_PASS=your-email-password
```

Important:

- For Gmail, use an App Password or configure your account to allow SMTP sending. Never commit `.env.local` to source control.
- If you don't set these env vars, the API will still write to `orders.json` but email sending will fail.

---

## Project Structure (detailed)

```
/ (project root)
├─ package.json
├─ README.md
├─ orders.json         # Created at runtime when orders are placed
├─ src/
│  └─ app/
│     ├─ api/
│     │  └─ place-order/route.ts   # order endpoint & email sender
│     ├─ components/               # UI components (Navbar, Hero, Footer...)
│     ├─ db.json                   # seeded content for pages
│     └─ page.tsx                  # app entry page
└─ tsconfig.json
```

Each UI component is in `src/app/components` and is designed to be small and composable.

---

## Core Concepts & Components

- **Navbar**: header with icons, cart and wishlist quick dropdowns. (Cart logic uses Redux slice in `src/app/redux/CartSlice.tsx`.)
- **Hero**: animated hero with floating assets and product shots.
- **Products**: shows product cards and quick-view modal (product interactions are client-only).
- **Cart & Wishlist**: persisted in Redux store (client-side only in this demo).

Tip: modify `src/app/db.json` to change product images/text and see changes instantly.

---

## API & Orders

The app implements a simple POST endpoint at `POST /api/place-order`:

- It expects a JSON payload: { customer, items, totalAmount }
- Saves an order record to `orders.json` (in repo root)
- Attempts to send two emails (store and confirmation) using nodemailer and `EMAIL_USER` / `EMAIL_PASS` env credentials

Example request (client-side):

```js
fetch("/api/place-order", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ customer, items, totalAmount }),
});
```

Security note: This demo writes file system data on the server. For production, use a database and secure email setup.

---

## Styling & Animations

- Tailwind CSS is configured in `tailwind.config.ts` and used across components.
- Framer Motion adds animated entrances and subtle motion for hero and product elements.

Accessibility tip: ensure images have meaningful alt text in `db.json` and use semantic HTML for form fields.

---

## Common Changes / How-to

- To change the cart/wishlist hover hide delay (stay open after mouse leave):
  1. Option A — Simple timer

```tsx
// in Navbar component
const [isCartOpen, setIsCartOpen] = useState(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const onEnter = () => {
  if (timer) clearTimeout(timer);
  setIsCartOpen(true);
};
const onLeave = () => {
  timer = setTimeout(() => setIsCartOpen(false), 2000);
};
```

2. Option B — Reusable debounced hook (recommended)

```ts
// src/app/hooks/useDebouncedCallback.ts
import { useRef, useCallback, useEffect } from "react";

export function useDebouncedCallback(cb: () => void, delay = 2000) {
  const timerRef = useRef<number | null>(null);
  const run = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(cb, delay) as unknown as number;
  }, [cb, delay]);
  run.cancel = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };
  useEffect(() => () => run.cancel && run.cancel(), [run]);
  return run;
}
```

---

## Testing & Linting

- ESLint is configured. Run:

```bash
npm run lint
```

- There are no unit tests included by default; consider adding Jest / React Testing Library for component tests.

---

## Deployment

### Vercel (recommended)

1. Connect the repo to Vercel and set environment variables (EMAIL_USER, EMAIL_PASS) in the Vercel Dashboard.
2. Deploy — Vercel will detect Next.js and build automatically.

### Docker (optional)

You can containerize the app; ensure env vars are provided and expose port 3000.

---

## Contributing

Thanks for considering contributing! A quick checklist:

1. Fork the repo and create a feature branch (feature/xxx)
2. Follow existing code style and use TypeScript types where appropriate
3. Run linting and ensure no errors
4. Open a PR with a clear description and screenshots (if UI-related)

If you'd like, I can add a `CONTRIBUTING.md` with PR templates and issue templates.

---

## Troubleshooting / FAQ

Q: Emails fail to send — what do I do?

- Check `EMAIL_USER` and `EMAIL_PASS`. If using Gmail, create an App Password. Check server logs for nodemailer errors.

Q: Why is orders.json not created?

- The server will create it on first order; check filesystem permissions.

Q: How to add new products?

- Edit `src/app/db.json` and add a product entry, then refresh the page.

---
