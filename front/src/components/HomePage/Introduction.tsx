import Link from "next/link";

export default function Introduction() {
  return (
    <div className="flex items-center justify-between gap-16">
      <div className=" items-center">
        <h1 className="text-gray-800 text-2xl md:text-3xl lg:text-5xl">Welcome to BlogApp</h1>
        <p className="mt-4 text-xs md:text-base lg:text-2xl">This is a personal project that I have made for uploading blog posts</p>
      </div>
      <Link

        className="hidden text-center lg:block text-sm lg:text-2xl relative px-4 py-2 rounded-md hover:bg-gray-100 z-100"
        href="/write"
      >
        Write...
      </Link>
      {/* className="hidden text-center lg:block text-sm lg:text-2xl relative px-4 py-2" */}
    </div>
  )
}