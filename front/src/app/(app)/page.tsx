"use client"

import BreadCrumbs from "@/components/HomePage/BreadCrumbs";
import Title from "@/components/HomePage/Components";
import { Blog } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { fetchBlogAPI } from "../api/blog";
import BlogCard from "@/components/HomePage/BlogCard/index";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchedBlogs = async () => {
      const fetchedBlogs = await fetchBlogAPI();
      setBlogs(fetchedBlogs);
    }
    fetchedBlogs();
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <BreadCrumbs />
      <Title />
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}