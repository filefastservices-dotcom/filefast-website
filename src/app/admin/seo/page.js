"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export default function AdminSeoAuditPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/blog-seo-audit", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load the SEO audit.");
      setData(result);
    } catch (err) {
      setError(err.message || "Could not load the SEO audit.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const posts = (data?.posts || []).filter((post) => {
    if (filter === "issues") return post.issueCount > 0;
    if (filter === "published") return post.isPublished;
    if (filter === "drafts") return !post.isPublished;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Content health</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy">Blog SEO Audit</h1>
          <p className="mt-1 text-sm text-navy/60">Editorial checks for existing articles and drafts. Review recommendations before changing content.</p>
        </div>
        <button onClick={load} disabled={loading} className="btn-gold text-xs disabled:opacity-50">
          {loading ? "Refreshing..." : "Refresh audit"}
        </button>
      </div>

      {error && <p role="alert" className="mt-5 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {data && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              ["Total articles", data.summary.total],
              ["Published", data.summary.published],
              ["Drafts", data.summary.drafts],
              ["Need review", data.summary.needsReview],
              ["High-priority issues", data.summary.highPriorityIssues]
            ].map(([label, value]) => (
              <div key={label} className="rounded-sm border border-silver bg-white p-4">
                <p className="text-xs text-navy/60">{label}</p>
                <p className="mt-2 font-display text-2xl font-semibold text-navy">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-navy">Article review queue</h2>
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-sm border border-silver bg-white px-3 py-2 text-sm text-navy">
              <option value="all">All articles</option>
              <option value="issues">Needs review</option>
              <option value="published">Published</option>
              <option value="drafts">Drafts</option>
            </select>
          </div>

          <div className="mt-3 space-y-3">
            {posts.map((post) => (
              <article key={post.id} className="rounded-sm border border-silver bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-navy">{post.title}</h3>
                    <p className="mt-1 break-all text-xs text-navy/55">/blog/{post.slug} · {post.isPublished ? "Published" : "Draft"} · {post.wordCount} words</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-sm bg-silver-light px-2 py-1 text-xs text-navy">{post.issueCount} review items</span>
                    <Link href={`/admin/blog/${post.id}/edit`} className="text-xs font-semibold text-gold-dark">Edit article</Link>
                    {post.isPublished && <a href={post.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-navy/70">View page</a>}
                  </div>
                </div>
                {post.issues.length > 0 ? (
                  <ul className="mt-3 space-y-1 border-t border-silver/70 pt-3">
                    {post.issues.map((issue) => (
                      <li key={issue.code} className="flex flex-wrap gap-2 text-sm text-navy/75">
                        <span className={issue.severity === "high" ? "font-semibold text-red-700" : "font-semibold text-gold-dark"}>{issue.severity.toUpperCase()}</span>
                        <span>{issue.message}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="mt-3 border-t border-silver/70 pt-3 text-sm text-green-700">No checks flagged. This is not a guarantee of search performance.</p>}
              </article>
            ))}
            {posts.length === 0 && <p className="rounded-sm border border-silver bg-white p-6 text-center text-sm text-navy/60">No articles match this filter.</p>}
          </div>
        </>
      )}
      {!data && loading && <p className="mt-6 text-sm text-navy/60">Auditing blog content...</p>}
      <p className="mt-5 text-xs text-navy/50">These are editorial prompts, not Google ranking rules. Review each suggestion for usefulness and accuracy.</p>
    </div>
  );
}
