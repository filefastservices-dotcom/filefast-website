"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function BlogExplorer({ posts }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");

  const categories = useMemo(
    () => ["All topics", ...new Set(posts.map((post) => post.category).filter(Boolean).sort())],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All topics" || post.category === category;
      const searchable = [post.title, post.excerpt, post.category, post.content]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [posts, query, category]);

  return (
    <div className="mt-10">
      <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search GST, income tax, VAT, TDS..."
            className="w-full rounded-sm border border-silver bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </label>
        <label className="block">
          <span className="sr-only">Filter articles by topic</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-sm border border-silver bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20 sm:min-w-52"
          >
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <p className="mt-5 text-center text-sm text-navy/60" aria-live="polite">
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? "guide" : "guides"}
      </p>

      {filteredPosts.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="flex h-full flex-col rounded-sm border border-silver/70 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
              <p className="eyebrow">{post.category}</p>
              <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-navy">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700 underline underline-offset-4">
                Read guide <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-sm border border-silver/70 bg-white px-6 py-12 text-center">
          <h2 className="font-display text-xl font-semibold text-navy">No matching guides found</h2>
          <p className="mt-2 text-sm text-navy/70">Try another keyword or choose a different topic.</p>
          <button
            type="button"
            onClick={() => { setQuery(""); setCategory("All topics"); }}
            className="mt-5 text-sm font-semibold text-blue-700 underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
