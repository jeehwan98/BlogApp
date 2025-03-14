"use client"

import { useCallback, useEffect, useState } from "react";
import { fetchBlogAPI } from "../api/blog";
import BlogCard from "@/components/home/blog-card/index";
import { Blog } from "@/interfaces/blog";
import { BlogsCardContainer, HomeContainer, Title } from "@/components/home/components";
import { BlogCardSkeletonArray } from "@/components/home/blog-card/skeleton";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const fetchedBlogs = await fetchBlogAPI();
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) return (
    <HomeContainer>
      <Title />
      <BlogsCardContainer>
        <BlogCardSkeletonArray count={15} />
      </BlogsCardContainer>
    </HomeContainer>
  )

  return (
    <HomeContainer>
      <Title />
      <BlogsCardContainer>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </BlogsCardContainer>
    </HomeContainer>
  );
}