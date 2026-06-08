import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import type { Post } from "@/types/post";
import { getCategoryBadgeClasses } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  index?: number;
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

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="post-card animate-fade-up group block overflow-hidden rounded-xl border opacity-0 transition-all duration-300 ease-in-out [animation-fill-mode:forwards]"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* ── Thumbnail ────────────────────────────────────── */}
      <div className="relative h-[200px] overflow-hidden">
        {post.thumbnail ? (
          <ImageWithFallback
            src={post.thumbnail}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      </div>

      {/* ── Card Body ────────────────────────────────────── */}
      <div className="p-5">
        {/* Category Badge */}
        <span
          className={`inline-block rounded px-2.5 py-1 text-xs uppercase tracking-wider ${getCategoryBadgeClasses(
            post.category
          )}`}
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          {post.category}
        </span>

        {/* Title */}
        <h2
          className="mt-3 text-lg font-bold leading-snug"
          style={{
            fontFamily: "var(--font-heading), serif",
            color: "var(--text)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{
            color: "var(--muted)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.excerpt}
        </p>

        {/* Divider */}
        <div
          className="mt-4 border-t pt-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-2.5">
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
              <span className="text-sm" style={{ color: "var(--muted)" }}>
                {post.author}
              </span>
            </div>

            {/* Date */}
            <time
              dateTime={post.date}
              className="text-xs"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "#444440",
              }}
            >
              {formatPostDate(post.date)}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}
