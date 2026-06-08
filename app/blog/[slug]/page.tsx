import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import PostModel from "@/lib/models/Post";
import RelatedPosts from "@/components/RelatedPosts";

export const dynamic = "force-dynamic";

// Avoid making production builds depend on a live MongoDB connection.
export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await PostModel.find({ approved: true }, "slug").lean<
      { slug: string }[]
    >();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate blog static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB();
  const post = await PostModel.findOne({ slug: params.slug, approved: true }).lean<{ title: string; excerpt: string }>();

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  await connectDB();
  
  const post = await PostModel.findOne({ slug: params.slug, approved: true }).lean<{
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    thumbnail: string;
    content: string;
    slug: string;
  }>();

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Container */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-10">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            &larr; Back to Home
          </Link>
        </div>

        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-6">
            <span className="inline-flex items-center bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {post.category}
            </span>
          </div>
          
          <h1 className="mb-8 font-serif text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-gray-600">
            <span>{post.author}</span>
            <span className="text-gray-300">&bull;</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </div>
        </header>

        {/* Banner Image */}
        <div className="relative mt-12 mb-16 aspect-[2/1] w-full overflow-hidden bg-gray-100">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Content Body */}
        <div className="mx-auto max-w-prose text-lg leading-[1.8] text-gray-800">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        {/* Divider */}
        <hr className="mx-auto my-20 max-w-prose border-gray-200" />

        {/* Related Posts */}
        <div className="mt-16">
          <RelatedPosts currentSlug={post.slug} category={post.category} />
        </div>
      </div>
    </article>
  );
}
