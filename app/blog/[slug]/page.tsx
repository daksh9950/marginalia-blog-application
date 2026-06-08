import { notFound } from "next/navigation";
import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import PostModel from "@/lib/models/Post";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/post";
import ReadingProgress from "@/components/ReadingProgress";
import { getCategoryBadgeClasses } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await PostModel.find({ approved: true }, "slug").lean<{
      slug: string;
    }[]>();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate blog static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  await connectDB();
  const post = await PostModel.findOne({
    slug: params.slug,
    approved: true,
  }).lean<{ title: string; excerpt: string }>();

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  await connectDB();

  const post = await PostModel.findOne({
    slug: params.slug,
    approved: true,
  }).lean<any>();

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const relatedDocs = await PostModel.find({
    category: post.category,
    slug: { $ne: params.slug },
    approved: true,
  })
    .limit(3)
    .lean<any[]>();

  const relatedPosts: Post[] = relatedDocs.map((doc) => ({
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

  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      <ReadingProgress />
      <article className="animate-fade-in min-h-screen" style={{ background: "var(--bg)" }}>
        {/* ── Back Button ────────────────────────────────────── */}
        <div className="mx-auto max-w-[1280px] px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#888880] transition-colors duration-200 hover:text-[#E8C547]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* ── Banner Image ───────────────────────────────────── */}
        <div className="relative h-[280px] w-full md:h-[480px]">
          {post.thumbnail ? (
            <ImageWithFallback
              src={post.thumbnail}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
              fallbackElement={
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #1A1A1A, #2A2A2A)",
                  }}
                />
              }
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(to bottom right, #1A1A1A, #2A2A2A)",
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, #0A0A0A 100%)",
            }}
          />
        </div>

        {/* ── Post Header ────────────────────────────────────── */}
        <header
          className="relative z-10 mx-auto max-w-[760px] px-6"
          style={{ marginTop: "-80px" }}
        >
          {/* Category Badge */}
          <span
            className={`inline-block rounded px-2.5 py-1 text-xs uppercase tracking-wider ${getCategoryBadgeClasses(
              post.category
            )}`}
            style={{
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1
            className="mt-4 font-black"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </h1>

          {/* Meta Row */}
          <div
            className="mt-4 flex flex-wrap items-center gap-3 text-sm"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body), sans-serif",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs"
                style={{
                  background: "var(--border)",
                  color: "var(--muted)",
                  fontFamily: "var(--font-mono), monospace",
                }}
              >
                {getInitials(post.author)}
              </div>
              <span>{post.author}</span>
            </div>
            <span>&middot;</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>&middot;</span>
            <span>{readTime} min read</span>
          </div>
        </header>

        {/* ── Content Body ───────────────────────────────────── */}
        <div className="mx-auto max-w-[680px] px-6 py-12 pb-20 md:py-12">
          <div className="flex flex-col">
            {post.content.split("\n\n").map((paragraph: string, idx: number) => {
              if (!paragraph.trim()) return null;
              return (
                <p
                  key={idx}
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "17px",
                    lineHeight: 1.85,
                    color: "#D0D0C8",
                  }}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* ── Related Posts Section ──────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section
            className="w-full border-t"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="mx-auto max-w-[1280px] px-6 py-16">
              <div className="mb-8">
                <div
                  className="flex items-center gap-1.5 text-xs tracking-widest"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  <span style={{ color: "#444440" }}>MORE FROM</span>
                  <span
                    style={{
                      color: "var(--accent)",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <div
                  className="mt-2 h-[2px] w-[40px]"
                  style={{ background: "var(--accent)" }}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, idx) => (
                  <PostCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}

