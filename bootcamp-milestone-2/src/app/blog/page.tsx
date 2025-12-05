import blogs from "../blogData";
import BlogPreview from "@/components/blogPreview";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

async function getBlogs() {
  await connectDB(); // function from db.ts before

  try {
    // query for all blogs and sort by date
    const blogs = await Blog.find().sort({ date: -1 }).orFail();
    // send a response as the blogs as the message
    return blogs;
  } catch (err) {
    return null;
  }
}

export default function BlogPage() {
  return (
    <main id="blog-container">
      <h1 className="page-title">blog</h1>
      {blogs.map((b) => (
        <BlogPreview key={b.slug} {...b} />
      ))}
    </main>
  );
}
