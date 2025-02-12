import blogPicture from "../../../public/images/blog-image.avif";
import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import TagList from "../UI/TagList";

export default function ProfileBlogCard({ blog }: { blog: Blog }) {

  return (
    <Link
      className="flex overflow-hidden hover:bg-slate-50 rounded-md"
      href={`/blogs/${blog.id}`}
    >
      <Image
        src={blogPicture}
        alt="Playlist Cover"
        className="w-1/3 h-48 object-cover"
      />
      <div className="w-2/3 px-4 flex flex-col justify-between">
        <h3 className="font-semibold text-xl">{blog.title}</h3>
        <TagList tags={blog.tags} />
        <p
          className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </Link>
  )
}