import { existsSync, readFileSync } from "fs";
import path from "path";
import mongoose from "mongoose";
import posts from "../data/posts.json";
import type { Post } from "../types/post";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmedLine.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, equalsIndex).trim();
    const value = trimmedLine.slice(equalsIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  }
}

async function seedPosts() {
  loadEnvLocal();

  const [{ connectDB }, { default: PostModel }] = await Promise.all([
    import("../lib/mongodb"),
    import("../lib/models/Post"),
  ]);

  await connectDB();

  const seedPosts = posts as Post[];

  await PostModel.bulkWrite(
    seedPosts.map((post) => ({
      updateOne: {
        filter: { slug: post.slug },
        update: { $set: post },
        upsert: true,
      },
    })),
  );

  await mongoose.disconnect();

  console.log(`Seeded ${seedPosts.length} posts.`);
}

seedPosts().catch(async (error) => {
  console.error("Failed to seed posts:", error);
  await mongoose.disconnect();
  process.exit(1);
});
