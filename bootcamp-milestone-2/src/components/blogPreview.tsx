import React from "react";
import Image from "next/image";
import style from "./blogPreview.module.css";
import type { Blog } from "@/app/blogData";
import Link from "next/link";

export default function BlogPreview({ title, date, description, image, imageAlt, slug }: Blog) {
    return (
      <div className={style.preview}>
        <h3>{title}</h3>
        <div className={style.content}>
          <Image src={image} alt={imageAlt} width={600} height={340} />
          <p>{description}</p>
          <p>{date}</p>
  
          <Link className={style.readMore} href={`/blog/${slug}`}>
            Read more
          </Link>
        </div>
      </div>
    );
  }