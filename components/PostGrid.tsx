"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/post";

interface PostGridProps {
  posts: Post[];
}

const categories = ["All", "Technology", "Design", "Lifestyle", "Travel", "Food"];

export default function PostGrid({ posts }: PostGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, searchQuery]);

  return (
    <section>
      {/* ── Sticky Filter Bar ────────────────────────────── */}
      <div
        className="sticky z-40 flex flex-wrap items-center justify-between gap-3 px-6 py-4"
        style={{
          top: "64px",
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Search Input */}
        <div className="relative w-full max-w-[320px]">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#444440" }}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts…"
            className="search-input w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm transition-all duration-200 focus:outline-none"
            style={{
              background: "var(--surface-2)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </div>

        {/* Category Pills */}
        <div className="scrollbar-hide flex gap-2 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="cursor-pointer select-none whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-all duration-200"
                style={{
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#000" : "var(--muted)",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Post Count ───────────────────────────────────── */}
      <div className="px-6 py-2 text-right">
        <span
          className="text-xs"
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "#444440",
          }}
        >
          Showing {filteredPosts.length} of {posts.length} posts
        </span>
      </div>

      {/* ── Post Grid / Empty State ──────────────────────── */}
      <div className="px-6 pb-6">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-20">
            <span className="text-5xl" style={{ color: "var(--border)" }}>
              ∅
            </span>
            <p
              className="mt-4 text-2xl"
              style={{
                fontFamily: "var(--font-heading), serif",
                color: "#444440",
              }}
            >
              No posts found
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--border)" }}>
              Try a different search or category
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
