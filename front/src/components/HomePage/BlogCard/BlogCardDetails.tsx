import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../../public/images/blog-image.avif";
import { formatRelativeDate } from "@/lib/constants";

export default function BlogCardDetails({ blog }: { blog: Blog }) {

  const parseContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Find the first image
    const firstImage = doc.querySelector("img");
    let coverImageSrc = blankBlogImage.src; // Default image
    let remainingContent = htmlContent;

    if (firstImage) {
      coverImageSrc = firstImage.src;
      // Remove the first image from the content
      firstImage.remove();
      remainingContent = doc.body.innerHTML;
    }

    return { coverImageSrc, remainingContent };
  };

  const { coverImageSrc, remainingContent } = parseContent(blog.content);

  return (
    <Link href={`blogs/${blog.id}`} className="h-full flex flex-col overflow-hidden">
      {/* Blog Image */}
      <Image
        className="w-full h-[180px] object-cover"
        src={coverImageSrc}
        alt={`${blog.title}`}
        width={300}
        height={180}
        onError={(e) => {
          e.currentTarget.src = blankBlogImage.src;
        }}
      />
      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          <h3 className="text-xl font-bold truncate">{blog.title}</h3>
          <p
            className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
            dangerouslySetInnerHTML={{ __html: remainingContent }}
          />
        </div>
        <span className="text-sm text-gray-600 mt-4">{formatRelativeDate(blog.createdAt)}</span>
      </div>
    </Link>
  );
}
