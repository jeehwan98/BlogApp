import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../public/images/empty blog image.jpg";
import ProfileAvatar from "../Avatar";
import { Button } from "../UI/Button";

export default function BlogCard({
  blog
}: {
  blog: Blog
}) {

  return (
    <div className="max-w-full">
      <Link href={`${blog.id}`}>
        <Image
          className="max-w-full h-auto mb-2"
          src={blankBlogImage}
          alt={`${blog.title}`}
          width={400}
          height={400}
        />
      </Link>
      <div>
        <div className="flex text-xl font-bold py-2 px-1">{blog.title}</div>
        <div
          className="py-2 px-1"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center">
          <ProfileAvatar
            image={blog.user.image}
            name={blog.user.name}
            sx={{ width: 35, height: 35, marginRight: 1 }}
            fontSize={20}
          />
          <span>by <span className="font-bold">{blog.user.name}</span></span>
        </div>
        <Button>
          <Link href={`/blogs/${blog.id}`}>더 보기</Link>
        </Button>
      </div>
    </div>
  )
}