"use client"

import BreadCrumbs from "@/components/HomePage/BreadCrumbs";
import FeaturedPosts from "@/components/HomePage/FeaturedPosts";
import Introduction from "@/components/HomePage/Introduction";
import MainCategories from "@/components/HomePage/MainCategories";
import PostList from "@/components/HomePage/PostList";
import Title from "@/components/HomePage/Title";
import { Blog } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { fetchBlogAPI } from "../api/blog";
import BlogCard from "@/components/HomePage/BlogCard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 justify-center items-center">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}