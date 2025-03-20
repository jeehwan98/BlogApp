import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../../public/images/blog-image.avif";
import { formatRelativeDate } from "@/lib/constants/format";
import { Blog } from "@/interfaces/blog";
import HandleLike from "./handle-like";

export default function BlogCardDetails({ blog }: { blog: Blog }) {
  const parseContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // show the first image as the image
    const firstImage = doc.querySelector("img");
    let coverImageSrc = blankBlogImage.src; // Default image
    let remainingContent = htmlContent;

    if (firstImage) {
      coverImageSrc = firstImage.src;
      // remove the first image from the content
      firstImage.remove();
      remainingContent = doc.body.innerHTML;
    }

    // remove all remaining images from the content
    const remainingImages = doc.querySelectorAll("img");
    remainingImages.forEach(image => image.remove());
    remainingContent = doc.body.innerHTML;

    return { coverImageSrc, remainingContent };
  };

  const { coverImageSrc, remainingContent } = parseContent(blog.content);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* BLOG IMAGE */}
      <Link href={`blogs/${blog.id}`} className="block">
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
      </Link>
      <div className="flex flex-col flex-1 justify-between p-4">
        <Link href={`blogs/${blog.id}`} className="block">
          <h3 className="text-xl font-bold truncate">{blog.title}</h3>
          <p
            className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
            dangerouslySetInnerHTML={{ __html: remainingContent }}
          />
        </Link>
        <div className="flex justify-between align-center items-center">
          <span className="text-sm text-gray-600">{formatRelativeDate(blog.createdAt)}</span>
          <HandleLike
            initialLikes={blog.likes || 0}
            iniitialLiked={blog.isLiked || false}
            id={blog.id}
          />
        </div>
      </div>
    </div >
  );
}
