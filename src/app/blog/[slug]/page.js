import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";

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
  { phrase: "ITR filing", href: "/services/itr-filing" },
  { phrase: "GST ITC reconciliation", href: "/blog/gst-input-tax-credit-reconciliation-guide" },
  { phrase: "LUT export compliance checklist", href: "/blog/lut-export-goods-services-gst-guide" },
  { phrase: "exporting under LUT", href: "/blog/lut-export-goods-services-gst-guide" },
  { phrase: "marketplace GST and TCS reconciliation", href: "/blog/ecommerce-marketplace-gst-tcs-reconciliation" },
  { phrase: "e-commerce TCS reconciliation", href: "/blog/ecommerce-marketplace-gst-tcs-reconciliation" },
  { phrase: "TDS on freelancer payments", href: "/blog/tds-freelancers-contractors-business-checklist" },
  { phrase: "freelancer and contractor payments", href: "/blog/tds-freelancers-contractors-business-checklist" },
  { phrase: "monthly accounting checklist", href: "/blog/small-business-month-end-accounting-checklist-india" },
  { phrase: "month-end accounting close", href: "/blog/small-business-month-end-accounting-checklist-india" },
  { phrase: "TDS return filing", href: "/services/tds-return-filing" },
  { phrase: "accounting and bookkeeping", href: "/services/accounting-bookkeeping" }
];

function toPublicImageUrl(value) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const url = new URL(value, "https://www.filefastglobal.com");
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function toValidIsoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function renderInline(text, keyPrefix) {
  const phrasePattern = /(GST Registration service|GST registration documents checklist|GST registration address proof|documents required for GST return filing|GST for e-commerce sellers|GSTR-1 vs GSTR-3B|GST input tax credit checklist|GSTR-1 filing|GSTR-3B filing|ITR filing|GST ITC reconciliation|LUT export compliance checklist|exporting under LUT|marketplace GST and TCS reconciliation|e-commerce TCS reconciliation|TDS on freelancer payments|freelancer and contractor payments|monthly accounting checklist|month-end accounting close|TDS return filing|accounting and bookkeeping)/gi;
  return text.split(phrasePattern).map((part, index) => {
    const link = INTERNAL_LINKS.find((item) => item.phrase.toLowerCase() === part.toLowerCase());
    if (!link) return <span key={`${keyPrefix}-${index}`}>{part}</span>;
    return (
      <a key={`${keyPrefix}-${index}`} href={link.href} className="font-medium text-blue-700 underline underline-offset-2">
        {part}
      </a>
    );
  });
}

function renderContent(content) {
  return content.split(/\r?\n/).map((line, index) => {
    const value = line.trim();
    if (!value) return null;
    if (value.startsWith("### ")) {
      return <h3 key={index} className="mb-2 mt-6 font-display text-lg font-semibold text-navy">{renderInline(value.slice(4), `h3-${index}`)}</h3>;
    }
    if (value.startsWith("## ")) {
      return <h2 key={index} className="mb-3 mt-9 font-display text-2xl font-semibold text-navy">{renderInline(value.slice(3), `h2-${index}`)}</h2>;
    }
    if (value.startsWith("- ")) {
      return <div key={index} className="ml-5 flex gap-2 text-sm leading-7 text-navy/80"><span aria-hidden="true">•</span><span>{renderInline(value.slice(2), `li-${index}`)}</span></div>;
    }
    const numbered = value.match(/^\d+\.\s+(.*)$/);
    if (numbered) {
      return <div key={index} className="ml-5 flex gap-2 text-sm leading-7 text-navy/80"><span className="font-semibold">{value.match(/^\d+/)[0]}.</span><span>{renderInline(numbered[1], `ol-${index}`)}</span></div>;
    }
    return <p key={index} className="mb-4 text-sm leading-7 text-navy/80">{renderInline(value, `p-${index}`)}</p>;
  });
}
 
export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);

  const postUrl = "https://www.filefastglobal.com/blog/" + post.slug;
  const articleImage = toPublicImageUrl(post.featuredImageUrl);
  const publishedAt = toValidIsoDate(post.createdAt);
  const modifiedAt = toValidIsoDate(post.updatedAt);
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": postUrl + "#article",
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        ...(articleImage ? { image: articleImage } : {}),
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
        ...(publishedAt ? { datePublished: publishedAt } : {}),
        ...(modifiedAt ? { dateModified: modifiedAt } : {}),
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
      <p className="mt-2 text-xs text-navy/55">Prepared by FileFast Global</p>

      <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-8">
        {renderContent(post.content)}
      </div>

      {relatedPosts.length > 0 ? (
        <section className="mt-12 border-t border-silver/70 pt-8" aria-labelledby="related-guides">
          <p className="eyebrow">Continue learning</p>
          <h2 id="related-guides" className="mt-2 font-display text-2xl font-semibold text-navy">Related guides</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-sm border border-silver/70 p-4 transition hover:border-gold hover:shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">{item.category}</p>
                <h3 className="mt-2 font-display text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-navy/65">{item.excerpt}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-gold-dark">Read guide →</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 rounded-lg bg-navy p-6 text-white sm:p-8">
        <p className="eyebrow text-gold">Need help with this?</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Get help from FileFast Global</h2>
        <p className="mt-2 text-sm leading-6 text-white/70">Share your requirement and we will help identify the relevant service, documents and next steps.</p>
        <a href="https://wa.me/919444614182?text=I%20read%20a%20FileFast%20Global%20guide%20and%20need%20help%20with%20my%20tax%20or%20compliance%20requirement" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-sm bg-[#e8c77c] px-5 py-3 text-sm font-semibold text-navy">Discuss your requirement</a>
      </section>
    </article>
  );
}
