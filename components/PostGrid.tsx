"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/post";

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.category))).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      return matchesTitle && matchesCategory;
    });
  }, [activeCategory, posts, searchQuery]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-md">
          <label
            htmlFor="post-search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Search posts
          </label>
          <input
            id="post-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title"
            className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-950"
          />
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`border px-3 py-2 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "border-gray-950 bg-gray-950 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-950 hover:text-gray-950"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPosts.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-600">No posts found</p>
        </div>
      )}
    </section>
  );
}
