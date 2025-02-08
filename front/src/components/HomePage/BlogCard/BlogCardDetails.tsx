import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../../public/images/blog-image.avif";

export default function BlogCardDetails({ blog }: { blog: Blog }) {

  return (
    <Link href={`blogs/${blog.id}`}>
      <Image
        className="w-full h-[180px] object-cover"
        src={blankBlogImage}
        alt={`${blog.title}`}
        width={300}
        height={180}
      />
      <div className="flex-1 p-4">
        <h3 className="text-xl font-bold truncate">{blog.title}</h3>
        <p
          className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </Link>
  )
}