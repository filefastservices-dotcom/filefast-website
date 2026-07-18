import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

async function getPost(slug) {
  try {
    await connectDB();
    const post = await Blog.findOne({ slug, isPublished: true }).lean();
    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <p className="eyebrow">{post.category}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-8 whitespace-pre-line text-sm leading-relaxed text-navy/80">
        {post.content}
      </div>
    </article>
  );
}
