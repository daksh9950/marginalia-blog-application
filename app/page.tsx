import PostGrid from "@/components/PostGrid";
import BackToTop from "@/components/BackToTop";
import { connectDB } from "@/lib/mongodb";
import PostModel from "@/lib/models/Post";
import type { Post } from "@/types/post";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();

  // Fetch approved posts and convert to plain objects
  const postsDocs = await PostModel.find({ approved: true })
    .sort({ date: -1 })
    .lean<Array<Post & { _id: unknown }>>();

  // Map to Post interface shape
  const posts = postsDocs.map((doc) => ({
    id: doc._id?.toString() || doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    author: doc.author,
    date: doc.date,
    category: doc.category,
    thumbnail: doc.thumbnail,
    approved: doc.approved,
  }));

  return (
    <>
      <main className="animate-fade-in min-h-screen" style={{ background: "var(--bg)" }}>
        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden px-6 pb-[80px] pt-[120px] text-center">
          {/* Background Glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(232,197,71,0.12), transparent 70%)",
              animation: "pulse-glow 4s ease-in-out infinite",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[800px]">
            {/* Label */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div
                className="h-[1px] w-[40px]"
                style={{ background: "var(--border)" }}
              />
              <span
                className="text-xs tracking-widest"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  color: "var(--accent)",
                }}
              >
                EST. 2025
              </span>
              <div
                className="h-[1px] w-[40px]"
                style={{ background: "var(--border)" }}
              />
            </div>

            {/* Main Heading */}
            <h1
              className="animate-fade-up font-black leading-none"
              style={{
                fontFamily: "var(--font-heading), serif",
                fontSize: "clamp(40px, 8vw, 72px)",
                color: "var(--text)",
              }}
            >
              Ideas Worth
              <br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Reading Slowly.
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="animate-fade-up mx-auto mt-8 max-w-[500px]"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.6,
                animationDelay: "150ms",
              }}
            >
              A digital sanctuary for thoughtful essays, design explorations, and
              cultural commentary. Take a breath and stay a while.
            </p>
          </div>
        </section>

        {/* ── Grid Section ─────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1280px]">
          <PostGrid posts={posts} />
        </section>
      </main>
      <BackToTop />
    </>
  );
}
