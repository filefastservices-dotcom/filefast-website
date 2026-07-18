import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogForm from "@/components/admin/BlogForm";

async function getBlog(id) {
  try {
    await connectDB();
    const blog = await Blog.findById(id).lean();
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch {
    return null;
  }
}

export default async function EditBlogPage({ params }) {
  const blog = await getBlog(params.id);
  if (!blog) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Edit Blog Post</h1>
      <p className="mt-1 text-sm text-navy/60">{blog.title}</p>
      <div className="mt-6">
        <BlogForm initialBlog={blog} blogId={blog._id} />
      </div>
    </div>
  );
}
