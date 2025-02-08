import Image from "next/image";
import blogImage from "../../../public/images/blog-image.avif";
import Link from "next/link";

export default function BlogDetails() {
  return (
    <div className="lg:h-1/3 flex justify-between gap-4">
      <div className="w-1/3 aspect-video">
        <Image
          className="rounded-3xl object-cover w-full h-full"
          src={blogImage}
          alt="post image"
        />
      </div>
      {/* details and title */}
      <div className="w-2/3">
        {/* details */}
        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
          <h1 className="font-semibold">02.</h1>
          <Link href="Web Design">Web Design</Link>
          <span className="text-gray-500 text-sm">2 days ago</span>
        </div>
        <div className="">
          {/* title */}
          <Link href="test" className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
            Random Text that describes the blog post in a concise manner. Random Text that describes the blog post in a concise manner. Random Text that describes the blog post in a concise manner.
          </Link>
        </div>
      </div>
    </div>
  )
}