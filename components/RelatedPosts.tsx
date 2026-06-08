import { connectDB } from "@/lib/mongodb";
import PostModel from "@/lib/models/Post";
import type { Post } from "@/types/post";
import PostCard from "./PostCard";

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

export default async function RelatedPosts({
  currentSlug,
  category,
}: RelatedPostsProps) {
  await connectDB();

  const posts = await PostModel.find({
    approved: true,
    category,
    slug: { $ne: currentSlug },
  })
    .sort({ date: -1 })
    .limit(3)
    .lean<Post[]>();

  if (!posts.length) {
    return null;
  }

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-950">Related Posts</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}
