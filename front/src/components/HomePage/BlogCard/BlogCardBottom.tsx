import ProfileAvatar from "@/components/Avatar";
import { generateUniqueUserId } from "@/lib/constants";
import { Blog } from "@/lib/interfaces";
import Link from "next/link";

export default function BlogCardBottom({ blog }: { blog: Blog }) {
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center align-middle gap-3">
        <Link
          href={`profile/${generateUniqueUserId(blog.user.email)}/post`}
          className="flex items-center cursor-pointer">
          <ProfileAvatar
            image={blog.user.image}
            name={blog.user.name}
            sx={{ width: 35, height: 35, marginRight: 1 }}
            fontSize={20}
          />
          <div className="text-sm">
            <span className="text-gray-600">
              by <span className="font-bold text-black">{blog.user.name}</span>
            </span>
          </div>
        </Link>
      </div>
      <Link
        href={`/blogs/${blog.id}`}
        className="text-sm text-blue-500 hover:underline"
      >
        더 보기
      </Link>
    </div>
  )
}