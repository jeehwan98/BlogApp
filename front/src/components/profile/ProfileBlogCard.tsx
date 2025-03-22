import Image from "next/image";
import Link from "next/link";
import TagList from "../ui/tag-list";
import { Blog } from "@/interfaces/blog";
import { parseContent } from "@/lib/constants/parseContent";

export default function ProfileBlogCard({ blog }: { blog: Blog }) {
  const { coverImageSrc, remainingContent } = parseContent(blog.content);

  return (
    <Link
      className="flex overflow-hidden hover:bg-slate-50 rounded-md"
      href={`/blogs/${blog.id}`}
    >
      <div className="relative w-4/12">
        <Image
          src={coverImageSrc}
          alt="Blog Cover"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="w-2/3 px-4 flex flex-col justify-between">
        <h3 className="font-semibold text-xl">{blog.title}</h3>
        <TagList tags={blog.tags} />
        <p
          className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
          dangerouslySetInnerHTML={{ __html: remainingContent }}
        />
      </div>
    </Link>
  )
}