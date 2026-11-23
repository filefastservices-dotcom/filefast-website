import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import BlogExplorer from "@/components/BlogExplorer";

export const metadata = {
  openGraph: {
    url: "https://www.filefastglobal.com/blog",
    title: "GST, IMS, ITC, ITR & Business Tax Guides | FileFast Global",
    description: "Practical guides on GST registration and returns, IMS, ITC reconciliation, exporter refunds, marketplace TCS, ITR, TDS, accounting and international VAT compliance.",
  },
  alternates: { canonical: "/blog" },
  title: "GST, ITR, TDS & Business Tax Guides",
  description: "Practical India tax guides covering GST registration, GSTR-1, GSTR-3B, ITC reconciliation, income tax return filing, TDS, TCS, accounting and international VAT compliance."
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Blog</p>
      <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">
        Tax, GST &amp; Business Compliance Guides
      </h1>
      <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-navy/70">
        Practical checklists and explainers for GST returns, IMS and ITC reconciliation, exporter refunds, marketplace settlements, income-tax return preparation, TDS/TCS and cross-border expansion. Use each guide to organise your records and identify questions to verify against current official requirements.
      </p>

      <BlogExplorer posts={posts} />
    </section>
  );
}
