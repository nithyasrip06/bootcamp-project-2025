import blogs, { type Blog } from "./blogData";

export default function Home() {
  return (
		<div>
      {blogs.map((b) => (
        <article key={b.slug}>
          <h2>{b.title}</h2>
          <p>{b.date}</p>
          <p>{b.description}</p>
        </article>
      ))}
    </div>
		) 
}