import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../public/images/empty blog image.jpg";
import ProfileAvatar from "../Avatar";

export default function BlogCard({
  blog
}: {
  blog: Blog
}) {

  return (
    <div className="flex">
      <div className="max-w-full h-auto mb-2 shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-2 justify-center">
        <Link href={`blogs/${blog.id}`}>
          <Image
            className="mb-2 h-auto"
            src={blankBlogImage}
            alt={`${blog.title}`}
          />
        </Link>
        <div>
          <div className="flex text-xl font-bold p-2">{blog.title}</div>
          <div
            className="p-2 text-black"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <ProfileAvatar
              image={blog.user.image}
              name={blog.user.name}
              sx={{ width: 35, height: 35, marginRight: 1 }}
              fontSize={20}
            />
            <span>by <span className="font-bold">{blog.user.name}</span></span>
          </div>
          <Link
            href={`/blogs/${blog.id}`}
            className="text-black px-4 py-2 rounded-md flex items-center hover:bg-gray-100"
          >
            더 보기
          </Link>
        </div>
      </div>
    </div>
  )
}