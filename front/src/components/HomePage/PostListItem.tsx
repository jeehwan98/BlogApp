import Image from "next/image";
import blogImage from "../../../public/images/blog-image.avif";
import Link from "next/link";

export default function PostListItem() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          alt="Post Item"
          src={blogImage}
          className="rounded-2xl object-cover"
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link href="/test" className="text-4xl font-semibold">
          Some Link blah blah blah blah blah blah blah blah blah
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link href="John Doe" className="text-blue-800 hover:text-blue-600">John Doe</Link>
          <span>on</span>
          <Link href="/test" className="text-blue-800 hover:text-blue-600">Web Design</Link>
          <span>2 days ago</span>
        </div>
        <p>
          Some Link blah blah blah blah blah blah blah blah blah.
          Some Link blah blah blah blah blah blah blah blah blah.
          Some Link blah blah blah blah blah blah blah blah blah.
        </p>
        <Link href="/test" className="underline text-blue-800 hover:text-blue-600">Read More</Link>
      </div>
    </div>
  )
}