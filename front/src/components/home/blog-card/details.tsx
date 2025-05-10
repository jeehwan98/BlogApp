import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../../public/images/blog-image.avif";
import { formatRelativeDate } from "@/lib/constants/format";
import { Blog } from "@/interfaces/blog";
import HandleLike from "./handle-like";
import { parseContent } from "@/lib/constants/parseContent";

export default function BlogCardDetails({ blog }: { blog: Blog }) {
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
            initialLikes={typeof blog.likesCount === 'number' ? blog.likesCount : 0}
            initialLiked={blog.liked || false}
            id={blog.id}
          />
        </div>
      </div>
    </div >
  );
}
