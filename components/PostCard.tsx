import Link from "next/link";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`overflow-hidden bg-gray-100 ${
          compact ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <img
          src={post.thumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className={`space-y-3 ${compact ? "p-4" : "p-5"}`}>
        <span className="inline-flex items-center bg-gray-900 px-2 py-1 text-xs font-semibold uppercase tracking-normal text-white">
          {post.category}
        </span>

        <div className="space-y-2">
          <h2
            className={`line-clamp-2 font-semibold leading-snug text-gray-950 ${
              compact ? "text-base" : "text-lg"
            }`}
          >
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-6 text-gray-600">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
          <span className="truncate font-medium text-gray-700">
            {post.author}
          </span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </div>
      </div>
    </Link>
  );
}
