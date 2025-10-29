import blogs from "../../blogData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return notFound();

  return (
    <main className="blog-post">
      <article>
        <h1>{post.title}</h1>
        <p>Posted: {post.date}</p>

        <Image src={post.image} alt={post.imageAlt} width={700} height={400} />
        <div>
          <p>{post.content}</p>
        </div>

        <p>
          <Link href="/blog">← Back to Blog</Link>
        </p>
      </article>
    </main>
  );
}
