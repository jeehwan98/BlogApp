import { Blog } from "@/lib/interfaces";
import BlogCardBottom from "./BlogCardBottom";
import BlogCardDetails from "./BlogCardDetails";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    //<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    <div className="h-[500px] mb-2 shadow-md flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <BlogCardDetails blog={blog} />
      <BlogCardBottom blog={blog} />
    </div>
  );
}