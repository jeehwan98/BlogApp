import ProfileAvatar from "@/components/avatar";
import { generateUniqueUserId } from "@/lib/constants/format";
import Link from "next/link";
import { BlogCardBottomContainer, BlogCardBottomUserContainer } from "./components";
import { Blog } from "@/interfaces/blog";

export default function BlogCardBottom({ blog }: { blog: Blog }) {
  return (
    <BlogCardBottomContainer>
      <BlogCardBottomUserContainer>
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
      </BlogCardBottomUserContainer>
      <Link
        href={`/blogs/${blog.id}`}
        className="text-sm text-blue-500 hover:underline"
      >
        더 보기
      </Link>
    </BlogCardBottomContainer >
  )
}