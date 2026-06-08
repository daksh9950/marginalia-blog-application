# Marginalia

Marginalia is a blog application built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB. It includes a public post feed, search and category filtering, dynamic blog detail pages, and a post submission form that saves new posts through an API route.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **UI:** React 18
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB Atlas or any MongoDB-compatible database
- **ODM:** Mongoose
- **Icons:** Lucide React
- **Fonts:** `next/font/google` with Playfair Display, Inter, and DM Mono
- **Tooling:** ESLint, TypeScript, npm
- **Script Runner:** `tsx` for TypeScript scripts

## Features

- Home page with hero section and post grid
- Client-side search by post title
- Client-side category filters
- Dynamic post pages at `/blog/[slug]`
- Related posts by category
- Submit form for new posts
- API routes for reading and creating posts
- Cached MongoDB connection for Next.js development mode
- Mongoose Post model with unique slugs
- Global Navbar and Footer
- Loading UI for blog routes

## Routes

### Pages

- `/` - Home page with approved posts
- `/about` - About page
- `/submit` - Post submission page
- `/blog/[slug]` - Single blog post page

### API

- `GET /api/posts` - Returns approved posts
- `POST /api/posts` - Creates a new post
- `GET /api/posts/[slug]` - Returns one approved post by slug

## Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

MongoDB Atlas users must also add their current IP address in **Atlas > Network Access**.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Starts the Next.js development server
- `npm run build` - Builds the production app
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint
- `npm run seed` - Runs `scripts/seed.ts` with `tsx`

Note: `package.json` currently includes a `seed` script, but the `scripts/seed.ts` and seed data files are not present in the current project tree. Add those files before using `npm run seed`.

## Folder Structure

```text
assign/
|-- app/
|   |-- about/
|   |   `-- page.tsx
|   |-- api/
|   |   `-- posts/
|   |       |-- [slug]/
|   |       |   `-- route.ts
|   |       `-- route.ts
|   |-- blog/
|   |   `-- [slug]/
|   |       |-- loading.tsx
|   |       `-- page.tsx
|   |-- submit/
|   |   `-- page.tsx
|   |-- favicon.ico
|   |-- globals.css
|   |-- layout.tsx
|   |-- loading.tsx
|   `-- page.tsx
|-- components/
|   |-- BackToTop.tsx
|   |-- Footer.tsx
|   |-- ImageWithFallback.tsx
|   |-- Navbar.tsx
|   |-- PostCard.tsx
|   |-- PostGrid.tsx
|   |-- ReadingProgress.tsx
|   |-- RelatedPosts.tsx
|   `-- SubmitForm.tsx
|-- lib/
|   |-- models/
|   |   `-- Post.ts
|   |-- mongodb.ts
|   `-- utils.ts
|-- public/
|   |-- file.svg
|   |-- globe.svg
|   |-- next.svg
|   |-- vercel.svg
|   `-- window.svg
|-- types/
|   `-- post.ts
|-- .env.local
|-- .eslintrc.json
|-- next.config.mjs
|-- package.json
|-- postcss.config.mjs
|-- README.md
`-- tsconfig.json
```

## Data Flow

1. `app/page.tsx` connects to MongoDB and fetches approved posts.
2. Approved posts are passed to `components/PostGrid.tsx`.
3. `PostGrid` handles client-side searching and category filtering.
4. `PostCard` links each post to `/blog/[slug]`.
5. `app/blog/[slug]/page.tsx` fetches the matching approved post from MongoDB.
6. `components/SubmitForm.tsx` sends new posts to `POST /api/posts`.
7. `app/api/posts/route.ts` creates the MongoDB document using the Mongoose Post model.

## MongoDB Notes

- The MongoDB connection helper is in `lib/mongodb.ts`.
- The Mongoose schema/model is in `lib/models/Post.ts`.
- The `slug` field is unique.
- The app depends on `MONGODB_URI` being available in `.env.local`.
- If Atlas DNS or IP access is blocked, post fetching and submission will fail until network access is fixed.
