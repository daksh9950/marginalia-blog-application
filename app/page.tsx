import PostGrid from "@/components/PostGrid";
import { connectDB } from "@/lib/mongodb";
import PostModel from "@/lib/models/Post";
import type { Post } from "@/types/post";

export const dynamic = "force-dynamic";

async function getApprovedPosts(): Promise<Post[]> {
  try {
    await connectDB();

    const posts = await PostModel.find({ approved: true })
      .sort({ date: -1 })
      .select("id title slug excerpt content author date category thumbnail approved")
      .lean<Post[]>();

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      thumbnail: post.thumbnail,
      approved: post.approved,
    }));
  } catch (error) {
    console.error("Failed to fetch approved posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getApprovedPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-gray-500">
              Independent notes and essays
            </p>
            <h1 className="text-4xl font-bold tracking-normal text-gray-950 sm:text-5xl">
              Marginalia
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              Thoughtful writing on technology, design, travel, food, and the
              small choices that shape everyday life.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <PostGrid posts={posts} />
      </section>
    </main>
  );
}
