import Link from "next/link";

export default function SinglePostPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="mt-20 max-w-4xl w-full">
        {/* title */}
        <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold">
          2025년 합격하는 개발자 포트폴리오
        </h1>
        {/* author details */}
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
      </div>
      {/* Content */}
      <div className="max-w-4xl w-full mt-10">
        {/* Add your content here */}
        <p className="">
          Content
        </p>
      </div>
    </div>
  )
}