import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/lib/models/Post";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({ approved: true });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET Posts Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    const slug = slugify(body.title || "new-post");
    
    // Create new post with generated slug, forced approved=true for testing, and ensure an ID exists
    const newPost = new Post({
      ...body,
      slug,
      date: new Date().toISOString(), // Add current date if missing
      approved: true,
      id: body.id || crypto.randomUUID(),
    });

    const savedPost = await newPost.save();
    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    console.error("POST Post Error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
