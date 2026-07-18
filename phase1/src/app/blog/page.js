import Link from "next/link";
import { getBlogPosts } from "@/lib/data";

export const metadata = {
  title: "Blog",
  description: "Latest articles on GST, Income Tax, MSME, FSSAI, Compliance and Accounting from FileFast."
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow text-center">Blog</p>
      <h1 className="mt-2 text-center font-display text-4xl font-semibold text-navy">
        Insights &amp; Updates
      </h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block rounded-sm border border-silver/70 bg-white p-6 transition hover:border-gold"
            >
              <p className="eyebrow">{post.category}</p>
              <h2 className="mt-2 font-display text-lg font-semibold text-navy">{post.title}</h2>
              <p className="mt-2 text-sm text-navy/70">{post.excerpt}</p>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-navy/60">
            No articles published yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
