import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data";

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  const rawTitle = post.metaTitle || post.title;
  const pageTitle = rawTitle.replace(/\s*\|\s*FileFast(?: Global)?$/i, "");

  return {
    title: pageTitle,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: "https://www.filefastglobal.com/blog/" + post.slug,
      title: pageTitle,
      description: post.metaDescription || post.excerpt,
    }
  };
}

function renderContent(content) {
  const phrase = "GST Registration service";
  const parts = content.split(phrase);

  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && (
        <a
          href="/services/gst-registration"
          className="font-medium text-blue-700 underline underline-offset-2"
        >
          {phrase}
        </a>
      )}
    </span>
  ));
}
 
export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    mainEntityOfPage: "https://www.filefastglobal.com/blog/" + post.slug,
    image: "https://www.filefastglobal.com/og-image.png",
    author: {
      "@type": "Organization",
      name: "FileFast Global"
    },
    publisher: {
      "@type": "Organization",
      name: "FileFast Global",
      logo: {
        "@type": "ImageObject",
        url: "https://www.filefastglobal.com/logo.png"
      }
    },
    datePublished: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined
  };

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <p className="eyebrow">{post.category}</p>

      <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-8 whitespace-pre-line text-sm leading-relaxed text-navy/80">
        {renderContent(post.content)}
      </div>
    </article>
  );
}
