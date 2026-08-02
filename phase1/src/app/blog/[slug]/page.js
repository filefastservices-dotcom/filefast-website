import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data";

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlug(params.slug);
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
