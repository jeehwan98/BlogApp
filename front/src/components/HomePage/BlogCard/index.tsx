import { Blog } from "@/lib/interfaces";
import BlogCardBottom from "./BlogCardBottom";
import BlogCardDetails from "./BlogCardDetails";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="w-full h-[450px] mb-2 shadow-md flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <BlogCardDetails blog={blog} />
      <BlogCardBottom blog={blog} />
    </div>
  );
}