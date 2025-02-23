import Link from "next/link";

export default function BlogDetails() {
  return (
    <>
      <div className="flex flex-wrap gap-2 text-gray-400 lg:text-lg md:text-base text-sm lg:mt-10 md:mt-6 mt-3 lg:mb-5 md:mb-3 mb-1">
        <Link href="John Doe" className="text-blue-800 hover:text-blue-600">
          John Doe
        </Link>
        <span>·</span>
        <span>2 days ago</span>
      </div>
      <Link href="/test" className="text-blue-800 hover:text-blue-600 lg:text-lg md:text-base text-sm">
        Web Design
      </Link>
    </>
  )
}