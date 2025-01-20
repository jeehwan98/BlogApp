import Image from "next/image";
import Link from "next/link";
import blogImage from "../../../public/images/blog-image.avif";

export default function FeaturedPosts() {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* POPULAR POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        <Image
          className="rounded-3xl object-cover"
          src={blogImage}
          alt="post image"
        />
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg" href="web-design">Web Design</Link>
          <span className="text-gray-500">2 days ago</span>
        </div>
        {/* title */}
        <Link href="/test" className="text-lg lg:text-3xl font-semibold lg:font-bold">Some Random Texts for this blog link href</Link>
      </div>
      {/* OTHER POSTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        {/* second */}
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
        {/* third */}
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
        {/* fourth */}
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
      </div>
    </div>
  )
}