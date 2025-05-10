import BlogCardBottom from "./bottom";
import BlogCardDetails from "./details";
import { BlogCardContainer } from "./components";
import { Blog } from "@/interfaces/blog";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <BlogCardContainer>
      <BlogCardDetails blog={blog} />
      <BlogCardBottom blog={blog} />
    </BlogCardContainer>
  );
}