# 🖨️ PrintNest — Modern Print-on-Demand E-Commerce Store

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://typescriptlang.org)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-purple?logo=redux)](https://redux-toolkit.js.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-cyan?logo=tailwindcss)](https://tailwindcss.com)

A modern, fully-featured Next.js e-commerce platform for custom print-on-demand products with authentication, cart management, order processing, and email notifications.

---

## ✨ Key Features

### 🛒 E-Commerce Functionality

- **Product Catalog** with quick view, comparison, and wishlist
- **Shopping Cart** with real-time updates and localStorage persistence
- **Wishlist Management** with Redux state management
- **Dynamic Categories** (T-shirts, Business Cards, Hoodies, Packaging)
- **Checkout System** with order persistence and email confirmations
- **Order Tracking** for authenticated users

### 🔐 Authentication & User Management

- **User Registration** with bcrypt password hashing
- **JWT Authentication** with HTTP-only cookies
- **Protected Routes** with auth middleware
- **User Dashboard** with order history and account management
- **Guest Checkout** option available

### 🎨 UI/UX

- **Fully Responsive** design across all devices
- **Smooth Animations** with Framer Motion
- **Modern Design** using Tailwind CSS with gradients and effects
- **Toast Notifications** for user feedback
- **Interactive Dropdowns** for cart and wishlist preview
- **Breadcrumb Navigation** for easy site navigation

### 🚀 Technical Features

- **Server-Side Rendering** with Next.js App Router
- **TypeScript** for type safety
- **Redux Toolkit** for global state management
- **API Routes** for all data and operations
- **Dynamic Slug-based Routing** for SEO-friendly URLs
- **Email Notifications** with Nodemailer (Gmail SMTP)
- **File-based Database** (JSON for demo purposes)

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Features Overview](#-features-overview)
- [API Routes](#-api-routes)
- [Authentication Flow](#-authentication-flow)
- [Redux Store](#-redux-store)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🛠️ Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| **Framework**        | Next.js 16.1.6 (App Router)  |
| **Frontend**         | React 19.2.3                 |
| **Language**         | TypeScript 5.x               |
| **Styling**          | Tailwind CSS 4.x             |
| **Animations**       | Framer Motion 12.30          |
| **State Management** | Redux Toolkit 2.11           |
| **Icons**            | Lucide React 0.563           |
| **Authentication**   | JWT + bcryptjs               |
| **Email**            | Nodemailer 7.0               |
| **Utilities**        | clsx, tailwind-merge, cookie |

---

## � Package Installation Commands

### Install All Packages

```bash
npm install
```

### Production Dependencies

Install all production dependencies at once:

```bash
npm install @reduxjs/toolkit bcryptjs clsx cookie framer-motion jsonwebtoken lucide-react next nodemailer react react-dom react-redux tailwind-merge
```

Or install individually:

#### State Management

```bash
npm install @reduxjs/toolkit@^2.11.2      # Redux Toolkit for state management
npm install react-redux@^9.2.0            # React bindings for Redux
```

#### Authentication & Security

```bash
npm install bcryptjs@^3.0.3               # Password hashing
npm install jsonwebtoken@^9.0.3           # JWT token generation/validation
npm install cookie@^1.1.1                 # Cookie parsing utilities
```

#### UI & Styling

```bash
npm install framer-motion@^12.30.0        # Animation library
npm install lucide-react@^0.563.0         # Icon library
npm install clsx@^2.1.1                   # Conditional className utility
npm install tailwind-merge@^3.4.0         # Tailwind class merging utility
```

#### Framework & Core

```bash
npm install next@16.1.6                   # Next.js framework
npm install react@19.2.3                  # React library
npm install react-dom@19.2.3              # React DOM renderer
```

#### Email

```bash
npm install nodemailer@^7.0.13            # Email sending (SMTP)
```

### Development Dependencies

Install all dev dependencies at once:

```bash
npm install -D @tailwindcss/postcss @types/bcryptjs @types/cookie @types/jsonwebtoken @types/node @types/nodemailer @types/react @types/react-dom babel-plugin-react-compiler eslint eslint-config-next tailwindcss typescript
```

Or install individually:

#### CSS & Styling

```bash
npm install -D @tailwindcss/postcss@^4   # Tailwind PostCSS integration
npm install -D tailwindcss@^4             # Tailwind CSS framework
```

#### TypeScript Types

```bash
npm install -D @types/bcryptjs@^2.4.6     # Type definitions for bcryptjs
npm install -D @types/cookie@^0.6.0       # Type definitions for cookie
npm install -D @types/jsonwebtoken@^9.0.10 # Type definitions for JWT
npm install -D @types/node@^20            # Type definitions for Node.js
npm install -D @types/nodemailer@^7.0.9   # Type definitions for nodemailer
npm install -D @types/react@^19           # Type definitions for React
npm install -D @types/react-dom@^19       # Type definitions for React DOM
npm install -D typescript@^5              # TypeScript compiler
```

#### Linting & Build Tools

```bash
npm install -D eslint@^9                  # JavaScript/TypeScript linter
npm install -D eslint-config-next@16.1.6  # Next.js ESLint configuration
npm install -D babel-plugin-react-compiler@1.0.0  # React compiler plugin
```

### Package Purposes

| Package              | Purpose                                                 |
| -------------------- | ------------------------------------------------------- |
| **@reduxjs/toolkit** | Simplified Redux setup with createSlice, configureStore |
| **bcryptjs**         | Hash passwords securely before storing                  |
| **clsx**             | Conditionally join classNames together                  |
| **cookie**           | Parse and serialize HTTP cookies                        |
| **framer-motion**    | Production-ready motion library for React               |
| **jsonwebtoken**     | Create and verify JWT tokens for auth                   |
| **lucide-react**     | Beautiful & consistent icon set                         |
| **next**             | React framework with SSR, routing, API routes           |
| **nodemailer**       | Send emails from Node.js (order confirmations)          |
| **react**            | JavaScript library for building UIs                     |
| **react-dom**        | React package for working with the DOM                  |
| **react-redux**      | Official React bindings for Redux                       |
| **tailwind-merge**   | Merge Tailwind CSS classes without conflicts            |
| **tailwindcss**      | Utility-first CSS framework                             |
| **typescript**       | Typed superset of JavaScript                            |

---

## �📁 Project Structure

```
printnest/
├── src/app/
│   ├── api/                          # API Routes (18 endpoints)
│   │   ├── auth/                     # Authentication endpoints
│   │   │   ├── login/route.ts        # User login
│   │   │   ├── signup/route.ts       # User registration
│   │   │   └── me/route.ts           # Get current user
│   │   ├── place-order/route.ts      # Order submission
│   │   ├── orders/route.ts           # Fetch user orders
│   │   ├── products/route.ts         # Product data
│   │   ├── categories/route.ts       # Category data
│   │   ├── blog/route.ts             # Blog posts
│   │   └── [other routes]/           # Content endpoints
│   │
│   ├── components/                   # React Components (15 components)
│   │   ├── Navbar.tsx                # Header with cart/wishlist dropdowns
│   │   ├── Hero.tsx                  # Animated hero section
│   │   ├── Products.tsx              # Product carousel with modal
│   │   ├── Categories.tsx            # Category grid
│   │   ├── Blog.tsx                  # Blog post listing
│   │   ├── Footer.tsx                # Footer with links
│   │   ├── AuthInitializer.tsx       # Session check on mount
│   │   ├── AuthPromptModal.tsx       # Login prompt for checkout
│   │   └── products/                 # Product sub-components
│   │       ├── ProductCard.tsx       # Individual product card
│   │       ├── QuickViewModal.tsx    # Product quick view
│   │       ├── CompareDrawer.tsx     # Product comparison
│   │       └── Toast.tsx             # Notification toast
│   │
│   ├── redux/                        # Redux Store
│   │   ├── Store.tsx                 # Redux store configuration
│   │   ├── CartSlice.tsx             # Cart state & actions
│   │   ├── WishListSlice.tsx         # Wishlist state & actions
│   │   ├── AuthSlice.tsx             # Auth state & actions
│   │   └── Provider.tsx              # Redux provider wrapper
│   │
│   ├── lib/                          # Utilities
│   │   └── db.ts                     # Database operations
│   │
│   ├── (pages)/                      # Page Routes
│   │   ├── account/page.tsx          # User dashboard
│   │   ├── cart/page.tsx             # Shopping cart
│   │   ├── checkout/page.tsx         # Checkout form
│   │   ├── shop/page.tsx             # All products
│   │   ├── wishlist/page.tsx         # User wishlist
│   │   ├── login/page.tsx            # Login page
│   │   ├── signup/page.tsx           # Registration page
│   │   ├── thank-you/page.tsx        # Order confirmation
│   │   ├── product/[slug]/page.tsx   # Product detail
│   │   ├── category/[slug]/page.tsx  # Category products
│   │   └── blog/[slug]/page.tsx      # Blog post detail
│   │
│   ├── db.json                       # Static content data (28KB)
│   ├── logindb.json                  # User & order data (runtime)
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── globals.css                   # Global styles
│
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind config
└── next.config.ts                    # Next.js config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd printnest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   Create `.env.local` in the root directory:

   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   JWT_SECRET=your-secret-key-here
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

### Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Email Configuration (for order confirmations)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# JWT Secret (generate a random string)
JWT_SECRET=your-secret-key-minimum-32-characters
```

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Google account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use the App Password in `EMAIL_PASS`

**Note**: If env vars are not set, orders will still be saved but email sending will fail silently.

---

## 🎯 Features Overview

### Shopping Cart

- **Add to Cart**: Click any product's "Add to cart" button
- **View Cart**: Hover over cart icon or navigate to `/cart`
- **Adjust Quantity**: Use +/- buttons
- **Remove Items**: Click trash icon or "Remove" button
- **LocalStorage Persistence**: Cart survives page refreshes

### Wishlist

- **Add to Wishlist**: Click heart icon on any product
- **Toggle**: Click again to remove
- **Redux Persistence**: Wishlist state managed globally

### Authentication

1. **Sign Up**: Create account at `/signup`
2. **Login**: Access account at `/login`
3. **Protected Routes**: `/checkout` and `/account` require authentication
4. **Guest Checkout**: Available for non-authenticated users
5. **Session Management**: JWT tokens stored in HTTP-only cookies

### Checkout Process

1. Navigate to `/checkout`
2. Fill in billing information
3. Select payment method (COD or Bank Transfer)
4. Place order
5. Receive confirmation email
6. View order in `/account` dashboard

---

## 📡 API Routes

### Content APIs (GET)

All return JSON data from `db.json`:

| Endpoint            | Description           |
| ------------------- | --------------------- |
| `/api/about`        | About company info    |
| `/api/blog`         | Blog posts list       |
| `/api/cart`         | Cart page content     |
| `/api/categories`   | Product categories    |
| `/api/checkout`     | Checkout form data    |
| `/api/footer`       | Footer links          |
| `/api/hero`         | Hero banner content   |
| `/api/howitworks`   | How it works section  |
| `/api/navbar`       | Navigation menu data  |
| `/api/packaging`    | Packaging info        |
| `/api/price`        | Pricing plans         |
| `/api/products`     | Product catalog       |
| `/api/social`       | Social media links    |
| `/api/testimonials` | Customer testimonials |
| `/api/whyus`        | Why choose us section |

### Authentication APIs

| Endpoint           | Method | Description       |
| ------------------ | ------ | ----------------- |
| `/api/auth/signup` | POST   | User registration |
| `/api/auth/login`  | POST   | User login        |
| `/api/auth/me`     | GET    | Get current user  |

### Order APIs

| Endpoint           | Method | Description     |
| ------------------ | ------ | --------------- |
| `/api/place-order` | POST   | Submit order    |
| `/api/orders`      | GET    | Get user orders |

---

## 🔐 Authentication Flow

### Registration (Signup)

```typescript
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- Password is hashed with bcrypt
- User stored in `logindb.json`
- Returns JWT token

### Login

```typescript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

- Validates credentials
- Returns JWT token
- Token stored in HTTP-only cookie

### Session Check

```typescript
GET / api / auth / me;
```

- Validates JWT from cookie
- Returns user data if authenticated
- Used by `AuthInitializer` component on mount

---

## 🏪 Redux Store

### Cart Slice

**State:**

```typescript
{
  cartItems: CartItem[]
  totalQuantity: number
  totalAmount: number
}
```

**Actions:**

- `addToCart(item)` - Add item or increase quantity
- `removeFromCart(itemId)` - Decrease quantity by 1
- `deleteItem(itemId)` - Remove entire item
- `initializeCart(state)` - Load from localStorage

### Wishlist Slice

**State:**

```typescript
{
  items: WishlistItem[]
}
```

**Actions:**

- `toggleWishlist(item)` - Add or remove from wishlist

### Auth Slice

**State:**

```typescript
{
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
```

**Actions:**

- `loginSuccess({ user, token })` - Set authenticated user
- `logout()` - Clear auth state

---

## 📄 Pages & Routes

### Public Pages

- `/` - Home page with all sections
- `/shop` - All products grid
- `/product/[slug]` - Product detail page
- `/category/[slug]` - Category products
- `/blog/[slug]` - Blog post detail
- `/cart` - Shopping cart
- `/wishlist` - User wishlist
- `/login` - Login page
- `/signup` - Registration page

### Protected Pages

- `/checkout` - Checkout form (prompts login for guests)
- `/account` - User dashboard with orders

### Dynamic Routes

Slugs are generated from titles:

- "Print Mug" → `/product/print-mug`
- "T-shirts" → `/category/t-shirts`
- Blog title → `/blog/slug-version`

---

## 🧩 Components

### Core Components

- **Navbar** - Header with search, cart/wishlist dropdowns, user menu
- **Hero** - Animated hero section with floating elements
- **Products** - Product carousel with quick view modal
- **Categories** - Category grid with images
- **Blog** - Blog post cards with author info
- **Footer** - Footer with newsletter signup and links
- **AuthInitializer** - Silent session check on app load
- **AuthPromptModal** - Login prompt for checkout

### Product Components

- **ProductCard** - Product display with wishlist toggle
- **QuickViewModal** - Product quick view overlay
- **CompareDrawer** - Side drawer for product comparison
- **Toast** - Notification toast for actions

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

Works on any Node.js hosting:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

**Requirements:**

- Node.js 18+
- Set environment variables
- Run `npm run build`

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components inspired by modern e-commerce platforms
- Icons by [Lucide](https://lucide.dev)
- Typography by [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)

---

## 📞 Support

For issues or questions:

- Open an issue on GitHub
- Check the troubleshooting section
- Review existing pull requests

---

**Made with ❤️ for the printing community** 🖨️✨
