import Image from "next/image";
import Link from "next/link";
import Comment, { type IComment } from "@/components/Comment";

type Blog = {
  title: string;
  date: Date | string;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
  content: string;
  comments?: IComment[];
};

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
  try {
    // This fetches the blog from an api endpoint that would GET the blog
    const res = await fetch(`http://localhost:3000/api/Blogs/${slug}`, {
      cache: "no-store",
    });

    // This checks that the GET request was successful
    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    return res.json();
  } catch (err: unknown) {
    console.log(`error: ${err}`);
    return null;
    // `` are a special way of allowing JS inside a string
    // Instead of "error: " + err, we can just do the above
    // it is simular to formated strings in python --> f"{err}"
  }
}

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <main className="blog-post">
        <article>
          <h1>Blog not found</h1>
          <p>The blog you're looking for doesn't exist.</p>
          <p>
            <Link href="/blog">← Back to Blog</Link>
          </p>
        </article>
      </main>
    );
  }

  return (
    <main className="blog-post">
      <article>
        <h1>{blog.title}</h1>
        <p>Posted: {new Date(blog.date).toLocaleDateString()}</p>

        <Image src={blog.image} alt={blog.imageAlt} width={700} height={400} />
        <div>
          <p>{blog.content}</p>
        </div>

        {/* Comments Section */}
        {blog.comments && blog.comments.length > 0 && (
          <div className="comments-section">
            <h2>Comments</h2>
            {blog.comments.map((comment: IComment, index: number) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        )}

        <p>
          <Link href="/blog">← Back to Blog</Link>
        </p>
      </article>
    </main>
  );
}
