"use client"

import ProfileBlogCard from "../ProfileBlogCard";
import { fetchBlogByUserAPI } from "@/app/api/blog";
import { Blog } from "@/interfaces/blog";
import { convertIdToEmail } from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";
import { PostSectionContainer } from "./components";

export default function PostSection({ userId }: { userId: string }) {
  const [blogs, setBlogs] = useState<Blog[]>();

  const fetchBlog = useCallback(async () => {
    try {
      const email = convertIdToEmail(userId);
      const fetchedBlog = await fetchBlogByUserAPI(email);
      setBlogs(fetchedBlog);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return (
    <PostSectionContainer>
      {blogs?.map((blog) => (
        <ProfileBlogCard key={blog.id} blog={blog} />
      ))}
    </PostSectionContainer>
  )
}