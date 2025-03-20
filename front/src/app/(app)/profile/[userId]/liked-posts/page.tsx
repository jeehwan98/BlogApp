"use client";

import { fetchLikedBlogsByUserAPI } from "@/app/api/blog";
import { ProfileBlogCardSkeletonArray } from "@/components/profile/components";
import { PostSectionContainer } from "@/components/profile/post/components";
import ProfileBlogCard from "@/components/profile/ProfileBlogCard";
import { Blog } from "@/interfaces/blog";
import { useAuth } from "@/lib/auth/auth-client";
import { convertIdToEmail } from "@/lib/constants/format";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function LikedPostsPage() {
  const params = useParams();
  const [blogs, setBlogs] = useState<Blog[]>();
  const userId = params?.userId as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBlog = useCallback(async () => {
    try {
      const email = convertIdToEmail(userId);
      const response = await fetchLikedBlogsByUserAPI(email);
      if (!response.success) {
        setError("No likes");
      } else {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (loading) return (
    <PostSectionContainer>
      <ProfileBlogCardSkeletonArray count={3} />
    </PostSectionContainer>
  )

  if (error) {
    return <span>{error}</span>
  }

  return (
    <PostSectionContainer>
      {blogs?.map((blog) => (
        <ProfileBlogCard key={blog.id} blog={blog.blogsDTO} />
      ))}
    </PostSectionContainer>
  )
}