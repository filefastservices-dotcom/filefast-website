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

const INTERNAL_LINKS = [
  { phrase: "GST Registration service", href: "/services/gst-registration" },
  { phrase: "GST registration documents checklist", href: "/blog/gst-registration-documents-checklist" },
  { phrase: "GST registration address proof", href: "/blog/gst-registration-address-proof" },
  { phrase: "documents required for GST return filing", href: "/blog/documents-required-for-gst-return-filing" },
  { phrase: "GSTR-1 filing", href: "/services/gstr-1-filing" },
  { phrase: "GSTR-3B filing", href: "/services/gstr-3b-filing" },
  { phrase: "ITR filing", href: "/services/itr-filing" }
];

function renderContent(content) {
  const phrasePattern = /(GST Registration service|GST registration documents checklist|GST registration address proof|documents required for GST return filing|GSTR-1 filing|GSTR-3B filing|ITR filing)/gi;
  return content.split(phrasePattern).map((part, index) => {
    const link = INTERNAL_LINKS.find((item) => item.phrase.toLowerCase() === part.toLowerCase());
    if (!link) return <span key={index}>{part}</span>;
    return (
      <a
        key={index}
        href={link.href}
        className="font-medium text-blue-700 underline underline-offset-2"
      >
        {part}
      </a>
    );
  });
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
