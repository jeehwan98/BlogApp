import blogPicture from "../../../public/images/blog-image.avif";
import { Blog } from "@/lib/interfaces";
import Image from "next/image";

export default function ProfileBlogCard({ blog }: { blog: Blog }) {

  return (
    <div className="flex overflow-hidden">
      <Image
        src={blogPicture}
        alt="Playlist Cover"
        className="w-1/3 h-48 object-cover"
      />
      <div className="w-2/3 px-4 flex flex-col justify-between">
        <h3 className="font-semibold text-xl font-bold">{blog.title}</h3>
        <p className="text-sm text-gray-500 mt-3">{blog?.tags}</p>
        {/* <p className="text-sm text-gray-500 mt-2 h-full truncate">{blog.content}</p> */}
        <p
          className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  )
}