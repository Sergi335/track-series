This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

Track My Series is a web application for discovering and tracking TV series. It includes:

- **Public Access**: Browse the homepage and discover new series without authentication
- **Authentication**: Secure login system powered by [Clerk](https://clerk.com/)
- **Protected Features**: Personal series tracking and watchlist management (requires authentication)

## Authentication Setup

This project uses Clerk for authentication. To set up authentication:

1. **Create a Clerk account** at [https://clerk.com/](https://clerk.com/)
2. **Create a new application** in your Clerk dashboard
3. **Copy your API keys** from the Clerk dashboard
4. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and replace the placeholder values with your actual Clerk keys:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_key_here
   ```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Route Protection

- **Public routes**: `/` (homepage), `/discover` - accessible without authentication
- **Protected routes**: `/myseries`, `/watchlist` - require user authentication

## Project Structure

- `/src/app/` - Next.js app router pages
- `/src/components/` - Reusable React components
- `/src/middleware.ts` - Route protection middleware
- `/src/contexts/` - React contexts (theme, etc.)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
