# PromptShop

> Full-stack demo store for selling premium AI image prompts—listing, hosted checkout, and post-payment unlock—built to show end-to-end commerce and integration work.

## Live demo

[→ https://prompt-shop-one.vercel.app/](https://prompt-shop-one.vercel.app/)

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19, [Tailwind CSS](https://tailwindcss.com/) 4 |
| Language | TypeScript (`strict`) |
| Payments | [Stripe](https://stripe.com/) Checkout (Test Mode in MVP) |
| Data | Static JSON (`data/products.json`)—no database |
| Deploy | [Vercel](https://vercel.com/) |

## Features

- Product grid with platform / category filters and debounced search
- Product detail with image gallery, pricing, and usage notes
- Prompt shown blurred until purchase; reduced DOM leakage for the full prompt
- Stripe Hosted Checkout; success page shows unlocked prompt and copy affordance
- Webhook route verifies Stripe signatures and handles `checkout.session.completed`
- Responsive layout; product pages use SSG; metadata / Open Graph for sharing

## Getting started

### Prerequisites

- Node.js 18+
- A [Stripe](https://stripe.com/) account (Test Mode keys)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (optional, for local webhook forwarding)

### Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Copy environment template and fill in values:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Purpose |
   |----------|---------|
   | `STRIPE_SECRET_KEY` | Server-side Stripe API (Test Mode `sk_test_…`) |
   | `STRIPE_PUBLISHABLE_KEY` | Reserved for client-side Stripe.js if needed (`pk_test_…`) |
   | `STRIPE_WEBHOOK_SECRET` | Signing secret from Stripe webhook endpoint (`whsec_…`) |
   | `NEXT_PUBLIC_BASE_URL` | Absolute origin for Checkout return URLs and asset URLs (`http://localhost:3000` locally; production site URL on Vercel) |

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

### Stripe webhook (local)

Forward events to the app (use the secret Stripe CLI prints for `STRIPE_WEBHOOK_SECRET` in `.env.local`, or use the secret from a [CLI-only listener](https://stripe.com/docs/webhooks#test-webhook)):

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server (after `build`) |
| `npm run lint` | ESLint |

## Architecture notes

- **JSON instead of a database** — MVP has a small, read-only catalog; no admin or inventory writes.
- **Hosted Checkout** — Card data stays on Stripe; no custom PCI scope for the demo app.
- **Session-based unlock** — No user accounts; the success page uses the Checkout session to reveal the purchased prompt.

## Project structure

```text
prompt-shop/
├── app/
│   ├── api/checkout/route.ts   # Creates Stripe Checkout Session
│   ├── api/webhook/route.ts    # Verifies webhook + fulfillment hook
│   ├── products/[id]/page.tsx  # Product detail (SSG)
│   ├── success/page.tsx        # Post-payment prompt display
│   ├── layout.tsx              # Global shell + metadata
│   └── page.tsx                # Listing
├── components/                 # UI pieces (filters, gallery, buy button, …)
├── data/products.json          # Catalog source
├── lib/                        # Stripe client, products helpers, utils
└── public/                     # Static assets (`/images/…` paths from `data/products.json`)
```

## License

MIT
