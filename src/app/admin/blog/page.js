"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/blog?all=true");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function togglePublish(post) {
    await fetch(`/api/blog/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !post.isPublished })
    });
    load();
  }

  async function deletePost(post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await fetch(`/api/blog/${post._id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy">Blog Posts</h1>
        <Link href="/admin/blog/new" className="btn-gold text-xs">
          + Write New Post
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-navy/60">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/70 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-silver/70 bg-silver-light text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id} className="border-b border-silver/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{p.title}</td>
                  <td className="px-4 py-3 text-navy/70">{p.category}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`rounded-sm px-2 py-1 text-xs font-semibold ${
                        p.isPublished ? "bg-green-100 text-green-700" : "bg-silver text-navy/60"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-navy/70">
                    {new Date(p.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/blog/${p._id}/edit`}
                      className="mr-3 text-xs font-semibold text-gold-dark"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(p)}
                      className="text-xs font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-navy/60">
                    No blog posts yet. Click "Write New Post" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
