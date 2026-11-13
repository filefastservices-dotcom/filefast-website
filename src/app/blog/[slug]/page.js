import { notFound } from "next/navigation";
import Link from "next/link";
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
  { phrase: "GST for e-commerce sellers", href: "/blog/gst-registration-for-ecommerce-sellers" },
  { phrase: "GSTR-1 vs GSTR-3B", href: "/blog/gstr-1-vs-gstr-3b" },
  { phrase: "GST input tax credit checklist", href: "/blog/gst-input-tax-credit-checklist" },
  { phrase: "GSTR-1 filing", href: "/services/gstr-1-filing" },
  { phrase: "GSTR-3B filing", href: "/services/gstr-3b-filing" },
  { phrase: "ITR filing", href: "/services/itr-filing" }
];

function toValidIsoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function renderContent(content) {
  const phrasePattern = /(GST Registration service|GST registration documents checklist|GST registration address proof|documents required for GST return filing|GST for e-commerce sellers|GSTR-1 vs GSTR-3B|GST input tax credit checklist|GSTR-1 filing|GSTR-3B filing|ITR filing)/gi;
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

  const postUrl = "https://www.filefastglobal.com/blog/" + post.slug;
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": postUrl + "#article",
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        image: "https://www.filefastglobal.com/og-image.png",
        author: {
          "@type": "Organization",
          name: "FileFast Global",
          url: "https://www.filefastglobal.com/about"
        },
        publisher: {
          "@type": "Organization",
          name: "FileFast Global",
          url: "https://www.filefastglobal.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.filefastglobal.com/logo.png"
          }
        },
        ...(toValidIsoDate(post.createdAt) ? { datePublished: toValidIsoDate(post.createdAt) } : {}),
        ...(toValidIsoDate(post.updatedAt) ? { dateModified: toValidIsoDate(post.updatedAt) } : {}),
        inLanguage: "en-IN"
      },
      {
        "@type": "BreadcrumbList",
        "@id": postUrl + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.filefastglobal.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.filefastglobal.com/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl }
        ]
      }
    ]
  };
  const serializedArticleSchema = JSON.stringify(articleSchema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedArticleSchema }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-navy/60">
        <Link href="/" className="hover:text-gold-dark">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/blog" className="hover:text-gold-dark">Blog</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page" className="text-navy/80">{post.title}</span>
      </nav>
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
