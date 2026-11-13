export const dynamic = "force-dynamic";

import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import BlogExplorer from "@/components/BlogExplorer";

export const metadata = {
  openGraph: {
    url: "https://www.filefastglobal.com/blog",
    title: "Blog | FileFast Global",
    description: "Latest articles on GST, Income Tax, MSME, FSSAI, Compliance and Accounting from FileFast.",
  },
  alternates: { canonical: "/blog" },
  title: "Blog",
  description: "Latest articles on GST, Income Tax, MSME, FSSAI, Compliance and Accounting from FileFast."
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
        Practical checklists and step-by-step explainers for GST registration, GST returns, input tax credit, income-tax return preparation, food-business compliance and cross-border expansion. Use each guide to organise your records and identify questions to verify against current official requirements.
      </p>

      <BlogExplorer posts={posts} />
    </section>
  );
}
