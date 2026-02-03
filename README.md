# 🖨️ Printnest — Next.js Print Store

> A modern Next.js storefront demo for custom printing services (T-shirts, hoodies, business cards and more).

---

## 🚀 Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## ✨ Highlights & Features

- ✅ **Framework:** Next.js (App Router)
- 🎨 **Styling:** Tailwind CSS
- ⚡ **Animations:** Framer Motion
- 🧭 **State Management:** Redux Toolkit (`cart`, `wishlist`)
- 🛒 **Orders:** Server route to place orders (`/api/place-order`) that writes to `orders.json` and sends email confirmations via **nodemailer**
- 🛠️ **Icons:** lucide-react
- 🧪 **TypeScript** ready

---

## 🔧 Scripts

| Command         | What it does            |
| --------------- | ----------------------- |
| `npm run dev`   | Start dev server        |
| `npm run build` | Create production build |
| `npm start`     | Start production server |
| `npm run lint`  | Run eslint              |

---

## 📁 Project Structure (important files)

- `app/` — Next.js app pages & components
  - `app/page.tsx` — Entry page
  - `app/components/` — Reusable UI components (Navbar, Hero, Footer, etc.)
  - `app/api/place-order/route.ts` — Order processing (writes to `orders.json` and emails via nodemailer)
- `src/app/db.json` — Local content & seed data
- `orders.json` — Saved orders (created at runtime)
- `package.json` — Scripts & dependencies

---

## 🧩 Major Components

- `Navbar` — header, cart & wishlist interactions
- `Hero` — hero section with animated visuals
- `Products` — product listing and product cards
- `HowItWorks` / `WhyUs` / `Testimonials` — marketing sections
- `Footer` — newsletter & links

> You can find all components in `src/app/components/`.

---

## 🔐 Environment Variables (for email)

Create a `.env.local` in the project root with the following values for order email notifications:

```env
EMAIL_USER=you@example.com
EMAIL_PASS=your-email-password
```

> NOTE: For Gmail, you may need an App Password or enable less-secure access depending on your account.

---

## 🧑‍💻 Development Tips

- Edit the UI by modifying files under `src/app/components/` and pages under `src/app/`.
- Redux slices live in `src/app/redux/` — update actions / reducers there.
- The `place-order` API demonstrates server-side file writing (to `orders.json`) and sending transactional emails.

---

## ✅ Contribution

Contributions, issues, and feature requests are welcome. Feel free to open a PR or an issue.

---

## 📜 License

This project is provided as-is for demo purposes.

---

Thanks for checking out Printnest! If you want, I can add a badges section, CI config, or a more detailed contribution guide next. 🙌

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
