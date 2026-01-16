# VIRASAT - Heritage Luxury E-Commerce

**Virasat** is a premium e-commerce platform dedicated to preserving and selling masterwork Indian heritage artifacts (Sarees, Jewelry, and Hand-crafted apparel). It is built with a focus on "Royal Indian Minimalist" aesthetics, featuring a custom design system, seamless animations, and a secure checkout flow.

![Virasat Preview](https://via.placeholder.com/1200x600?text=VIRASAT+Heritage+Luxury)

## 🚀 Technology Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: Vanilla CSS with a Custom "Royal Heritage" Design System (Variables tailored for Deep Burgundy & Antique Gold).
*   **Authentication**: [Clerk](https://clerk.com/)
*   **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
*   **Payments**: [Razorpay](https://razorpay.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Step-by-Step Setup Guide

Follow these instructions to set up the project locally.

### 1. Prerequisite
Ensure you have **Node.js 18+** installed.

### 2. Clone the Repository
```bash
git clone https://github.com/Ayush0135/e-commerce.git
cd ecommerce-web
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env.local` in the root directory. This is critical for the app to function. 

**Copy and paste the following template into `.env.local`:**

```env
# ---------------------------------------------------
# CLERK AUTHENTICATION
# Obtain keys from: https://dashboard.clerk.com
# ---------------------------------------------------
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# ---------------------------------------------------
# SUPABASE DATABASE
# Obtain keys from: https://supabase.com/dashboard
# ---------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# ---------------------------------------------------
# RAZORPAY PAYMENTS
# Obtain keys from: https://dashboard.razorpay.com
# ---------------------------------------------------
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

### 5. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor to create the products table:

```sql
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric not null,
  category text,
  image_url text, -- primary image
  images text[], -- additional images array
  stock integer default 0,
  is_exclusive boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (Optional for dev, recommended for prod)
alter table products enable row level security;
create policy "Public Read Access" on products for select using (true);
```

### 6. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🎨 Design System: "Royal Indian Minimalist"

The UI is built on a strict set of CSS variables defined in `src/app/globals.css`.

*   **Primary Color**: `var(--royal-burgundy)` (`#721818`) - Used for primary actions, headers, and brand identity.
*   **Accent Color**: `var(--royal-gold)` (`#C5A059`) - Used for borders, highlights, and secondary text.
*   **Background**: `var(--ivory)` (`#FFFCF2`) - A warm off-white that replaces clinical white for a heritage feel.
*   **Typography**: 
    *   *Headings*: **Cinzel** (Google Fonts) - A typeface inspired by first-century Roman inscriptions.
    *   *Body*: **Outfit** (Google Fonts) - Clean, modern, high-legibility.

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/          # Admin Dashboard (Protected)
│   │   ├── api/            # Backend API Routes (Checkout, etc.)
│   │   ├── cart/           # Shopping Cart
│   │   ├── checkout/       # Checkout Flow (Shipping -> Payment)
│   │   ├── products/       # Product Listing & Details
│   │   ├── tracking/       # Order Tracking Page
│   │   ├── globals.css     # Global Design System
│   │   ├── layout.tsx      # Root Layout (Fonts, Providers)
│   │   └── page.tsx        # Home Page (Landing)
│   ├── components/
│   │   └── shared/         # Reusable Components (Navbar, Footer)
│   └── lib/
│       ├── supabase.ts     # Database Client
│       └── types.ts        # TypeScript Interfaces
├── middleware.ts           # Clerk Auth Middleware
├── .env.local              # Environment Secrets (GitIgnored)
└── package.json
```

## 💳 Payment Flow
1.  **Cart**: User reviews items.
2.  **Checkout**: 
    *   Step 1: Shipping Details.
    *   Step 2: Choose Payment (Card vs COD).
    *   Step 3: Final Review.
3.  **Processing**: 
    *   If Card: Frontend calls `/api/checkout` -> Receive OrderID -> Open Razorpay Modal.
    *   If COD: Instant confirmation.
4.  **Success**: Redirect to success view.

## 🤝 Contributing
1.  Fork the repo.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---
© 2026 Virasat International.
