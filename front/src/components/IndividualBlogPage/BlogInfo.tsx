import { Blog } from "@/lib/interfaces";
import { formatRelativeDate, generateUniqueUserId } from "@/lib/constants";
import TagList from "../UI/TagList";
import ProfileAvatar from "../Avatar";
import Link from "next/link";

export default function BlogInfo({ blogInfo }: { blogInfo: Blog }) {
  return (
    <>
      <div className="flex gap-2 items-center justify-between mt-10 mb-5">
        <div className="flex gap-4">
          <Link
            href={`/profile/${generateUniqueUserId(blogInfo.user.email)}/post`}
            className="flex items-center cursor-pointer gap-4"
          >
            <ProfileAvatar
              image={blogInfo.user.image || undefined}
              name={blogInfo.user?.name as string}
              sx={{ width: 50, height: 50 }}
              fontSize={20}
            />
            <span className="flex items-center justify-center text-xl font-semibold">{blogInfo.user.name}</span>
            <span className="flex items-center justify-center">·</span>
          </Link>
          <span className="flex items-center justify-center text-gray-500">{formatRelativeDate(blogInfo.createdAt)}</span>
        </div>
      </div>
      <TagList tags={blogInfo.tags} />
    </>
  )
}