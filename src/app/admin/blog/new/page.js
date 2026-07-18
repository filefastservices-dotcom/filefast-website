import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Write New Blog Post</h1>
      <p className="mt-1 text-sm text-navy/60">Share your expertise with your audience</p>
      <div className="mt-6">
        <BlogForm />
      </div>
    </div>
  );
}
