"use client"

import { fetchBlogByUserAPI } from "@/app/api/blog";
import { PostSectionContainer } from "@/components/profile/post/components";
import ProfileBlogCard from "@/components/profile/ProfileBlogCard";
import { Blog } from "@/interfaces/blog";
import { convertIdToEmail } from "@/lib/constants";
import React, { useCallback, useEffect, useState } from "react";

export default function PostPage({
  params,
}: {
  params: Promise<{ userId: string }>,
  children: React.ReactNode,
}) {
  const resolvedParams = React.use(params);
  const userId = resolvedParams.userId;

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