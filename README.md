# 🖨️ Printnest — Next.js Print Store

[![Next.js](https://img.shields.io/badge/Next.js-v16.1.6-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-purple)](https://redux-toolkit.js.org)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-cyan)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-orange)](https://www.framer.com/motion/)

> A modern, fully-featured Next.js print-on-demand store with dynamic routing, API-driven content, cart management, and smooth animations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Dynamic Routes](#dynamic-routes)
- [Redux Store](#redux-store)
- [Styling & Animations](#styling--animations)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Printnest is a full-featured e-commerce store for print-on-demand products. It showcases modern Next.js patterns including:

- **Dynamic Routing** with `[slug]` parameters for categories, blog posts, and products
- **API-driven Content** fetched from centralized JSON data
- **State Management** using Redux Toolkit for cart and wishlist
- **Smooth Animations** with Framer Motion and CSS transitions
- **Responsive Design** with Tailwind CSS
- **Server-side Order Handling** with order persistence and email notifications

---

## ✨ Features

### Core E-Commerce

- 🏷️ **Product Listings** with quick-view modal and comparison drawer
- 🛒 **Shopping Cart** with quantity adjustment and item removal
- 💖 **Wishlist** with persistent storage via Redux
- 📦 **Multiple Categories** - T-shirts, Business Cards, Hoodies, Packaging
- 🔍 **Blog Section** with individual post pages
- 📱 **Fully Responsive** across all device sizes

### User Experience

- ✅ **Smooth Animations** using Framer Motion variants
- 🎨 **Modern UI** with Tailwind CSS and gradient effects
- 🔔 **Toast Notifications** for cart/wishlist actions
- 📍 **Breadcrumb Navigation** for easy orientation
- ⚡ **Fast Load Times** with Next.js optimization

### Technical Features

- 🔄 **Dynamic Slug-based Routing** for SEO-friendly URLs
- 📡 **RESTful API Endpoints** for all data sections
- 💾 **Redux Toolkit** for centralized state management
- 🎯 **TypeScript Support** with proper interfaces
- 📊 **Order Management** with order persistence and tracking

---

## 🛠️ Tech Stack

| Layer                  | Technologies     |
| ---------------------- | ---------------- |
| **Frontend Framework** | Next.js 16.1.6   |
| **UI Library**         | React 19.2.3     |
| **Styling**            | Tailwind CSS 3.x |
| **Animations**         | Framer Motion    |
| **State Management**   | Redux Toolkit    |
| **Form Handling**      | HTML5 Forms      |
| **Icons**              | Lucide React     |
| **Database**           | JSON (in-memory) |
| **Type Safety**        | TypeScript       |

---

## 📁 Project Structure

```
printnest/
├── src/app/
│   ├── api/                           # API Routes
│   │   ├── about/route.ts
│   │   ├── blog/route.ts
│   │   ├── categories/route.ts
│   │   ├── products/route.ts
│   │   ├── place-order/route.ts
│   │   └── [other sections]/
│   │
│   ├── components/                    # Reusable Components
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── Categories.tsx
│   │   ├── Products.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── QuickViewModal.tsx
│   │   │   ├── CompareDrawer.tsx
│   │   │   └── Toast.tsx
│   │   └── [other components]/
│   │
│   ├── pages/                         # Dynamic Pages
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── category/[slug]/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── product/[slug]/page.tsx
│   │   └── [other pages]/
│   │
│   ├── redux/                         # Redux Store
│   │   ├── Store.ts
│   │   ├── CartSlice.tsx
│   │   ├── WishListSlice.tsx
│   │   └── Provider.tsx
│   │
│   ├── utils/                         # Helper Functions
│   │   ├── animations.ts              # Framer Motion variants
│   │   └── helpers.ts                 # Utility functions
│   │
│   ├── data/                          # Static Data & Endpoints
│   │   └── [various data files]
│   │
│   ├── db.json                        # Central Data Source
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── public/                            # Static Assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd printnest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 📡 API Endpoints

All endpoints serve JSON data from `src/app/db.json`:

| Endpoint            | Data Section              |
| ------------------- | ------------------------- |
| `/api/about`        | About company information |
| `/api/blog`         | Blog posts and articles   |
| `/api/cart`         | Cart page content         |
| `/api/categories`   | Product categories        |
| `/api/checkout`     | Checkout form data        |
| `/api/footer`       | Footer links and info     |
| `/api/hero`         | Hero banner content       |
| `/api/howitworks`   | How-it-works section      |
| `/api/navbar`       | Navigation menu           |
| `/api/packaging`    | Packaging information     |
| `/api/price`        | Pricing plans             |
| `/api/products`     | Product catalog           |
| `/api/social`       | Social media links        |
| `/api/testimonials` | Customer testimonials     |
| `/api/whyus`        | Why choose us section     |
| `/api/place-order`  | Order submission (POST)   |

### Example API Usage

```typescript
// Fetch categories
const response = await fetch("/api/categories");
const data = await response.json();
console.log(data.categories);
```

---

## 🔗 Dynamic Routes

### Categories

- **Route**: `/category/[slug]`
- **Example**: `/category/t-shirts`
- **Source**: Categories data from `/api/categories`

### Blog Posts

- **Route**: `/blog/[slug]`
- **Example**: `/blog/how-to-choose-the-right-material-for-your-prints`
- **Source**: Posts from `/api/blog`

### Products

- **Route**: `/product/[slug]`
- **Example**: `/product/print-mug`
- **Source**: Products from `/api/products`

**Slug Format**: Title is converted to lowercase with spaces replaced by hyphens.

```typescript
// Example conversion
"T-shirts" → "t-shirts"
"Print Mug" → "print-mug"
```

---

## 🏪 Redux Store

### CartSlice

Manages shopping cart state with Redux Toolkit:

```typescript
// Actions
- addToCart(item)          // Add item or increase quantity
- removeFromCart(itemId)   // Decrease quantity by 1
- deleteItem(itemId)       // Remove entire item from cart
- initializeCart(state)    // Initialize from localStorage

// State
{
  cartItems: CartItem[]
  totalQuantity: number
  totalAmount: number
}
```

### WishListSlice

Manages wishlist state:

```typescript
// Actions
- toggleWishlist(item)     // Add or remove from wishlist

// State
{
  items: WishlistItem[]
}
```

---

## 🎨 Styling & Animations

### Tailwind CSS

The project uses Tailwind CSS for responsive design and consistent styling:

- Utility-first CSS framework
- Mobile-first responsive design
- Custom gradients and colors
- Rounded borders and shadows

### Framer Motion

Smooth animations on page elements:

**Key Animation Variants:**

- `fadeUp` - Fade in with upward movement
- `slideInLeft` / `slideInRight` - Slide animations from sides
- `staggerContainer` / `staggerItem` - Staggered list animations
- `scaleIn` - Scale zoom effect
- `rotateIn` - Rotation effect

**Example:**

```tsx
<motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
  Content here
</motion.div>
```

---

## 📦 Cart Features

### Add to Cart

- Click product "Add to cart" button
- Toast notification confirms action
- Item added to Redux store
- Persisted in localStorage

### Manage Cart

- **Increase Quantity**: Click `+` button
- **Decrease Quantity**: Click `-` button
- **Delete Item**: Click red `×` button (top corner) or "Remove item" text
- **View Totals**: Automatic calculation of subtotals and totals

---

## 🎯 Key Components

### Categories Component

- Fetches from `/api/categories`
- Dynamic slug-based links
- Responsive grid layout

### Blog Component

- Lists blog posts with metadata
- Links to individual post pages
- Author info and read time

### Products Component

- Horizontal scrolling carousel
- Quick view modal
- Compare drawer
- Wishlist toggle
- Add to cart functionality

### Cart Page

- Item display with images
- Quantity adjustment
- Delete buttons (corner + text)
- Order summary
- Checkout button

---

## 🌐 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The project works on any Node.js hosting:

- Netlify
- Railway
- Heroku
- AWS Amplify
- DigitalOcean

---

## 🔧 Troubleshooting

### Q: Items not persisting in cart?

**A:** Make sure localStorage is enabled in your browser. The cart state is auto-saved.

### Q: Dynamic routes not working?

**A:** Ensure the `[slug]` directory structure matches exactly: `/app/category/[slug]/page.tsx`

### Q: API endpoints returning errors?

**A:** Verify `src/app/db.json` exists and contains valid JSON data for the requested section.

### Q: Animations not smooth?

**A:** Make sure Framer Motion is installed: `npm install framer-motion`

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check existing documentation
- Review code comments for implementation details

---

**Happy printing!** 🖨️✨

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
