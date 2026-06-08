# Marginalia

Marginalia is a modern, premium literary blog built with Next.js 14 (App Router) and MongoDB. It features a stunning dark mode aesthetic, sophisticated typography, and smooth interactive micro-animations.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB
- **Icons:** Lucide React
- **Typography:** Playfair Display, Inter, DM Mono (via `next/font`)

## ✨ Features

- **Premium Design Aesthetics:** Elegant typography combinations, customized selection highlights, custom scrollbars, and golden accent overlays.
- **Dynamic Routing:** Beautifully rendered individual blog post pages.
- **Custom Components:** Includes an automated Reading Progress bar, a floating Back-to-Top button, and graceful Image Fallbacks.
- **Blog Submission:** Fully functioning submission form mapped directly to MongoDB with auto-approval logic.
- **Search & Filtering:** Real-time client-side search and category filtering on the homepage.
- **SEO Optimized:** Dynamic OpenGraph metadata generation per route.

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Ensure you have a `.env.local` file at the root with your MongoDB Connection URI:
   ```env
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/marginalia?retryWrites=true&w=majority
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗂️ Folder Structure

- `/app` - Next.js App Router containing pages, API routes, and layouts.
- `/components` - Reusable UI components (Navbar, Footer, PostCard, SubmitForm, etc).
- `/lib` - Database connection utilities and Mongoose Models.
- `/types` - TypeScript interfaces and type definitions.
- `/public` - Static assets.
