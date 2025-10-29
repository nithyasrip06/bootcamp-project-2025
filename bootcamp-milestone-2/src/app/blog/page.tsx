import blogs from "../blogData";
import BlogPreview from "@/components/blogPreview";

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
