import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../public/images/empty blog image.jpg";
import ProfileAvatar from "../Avatar";
import { genearteUniqueUserId } from "@/lib/constants";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="w-full h-[450px] mb-2 shadow-md flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2">
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
      <div className="flex items-center justify-between p-4 border-t">
        <Link
          href={genearteUniqueUserId(blog.user.email)}
          className="flex items-center cursor-pointer">
          <ProfileAvatar
            image={blog.user.image}
            name={blog.user.name}
            sx={{ width: 35, height: 35, marginRight: 1 }}
            fontSize={20}
          />
          <span className="text-sm text-gray-600">
            by <span className="font-bold text-black">{blog.user.name}</span>
          </span>
        </Link>
        <Link
          href={`/blogs/${blog.id}`}
          className="text-sm text-blue-500 hover:underline"
        >
          더 보기
        </Link>
      </div>
    </div>
  );
}
