import Link from "next/link"
import { Search01Icon } from "hugeicons-react";

export default function MainCategories() {
  const classNames = "hover:bg-blue-50 rounded-full px-4 py-2 text-sm md:text-base lg:text-lg";
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-3 shadow-lg items-center justify-center gap-3 mt-5">
      <div className="flex-1 flex items-center justify-between flex-wrap text-black">
        <Link href="/posts" className="bg-blue-800 px-4 py-2 text-white rounded-full">All Posts</Link>
        <Link href="/posts?javascript" className={`hidden sm:inline ${classNames}`}>
          JavaScript
        </Link>
        <Link href="/posts?typescript" className={`hidden md:inline ${classNames}`}>
          TypeScript
        </Link>
        <Link href="/posts?reactjs" className={classNames}>
          React.JS
        </Link>
        <Link href="/posts?nextjs" className={classNames}>
          NextJS
        </Link>
        <Link href="/posts?databases" className={classNames}>
          Databases
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
        <Search01Icon className="text-gray-600 w-5 h-5" />
        <input
          type="text"
          placeholder="search a post..."
          className="bg-gray-100 outline-none text-sm text-gray-600 w-full"
        />
      </div>
    </div>
  );
}