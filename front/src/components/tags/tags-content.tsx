"use client"

import { fetchBlogsByTagNameAPI } from "@/app/api/blog";
import { PostSectionContainer } from "@/components/profile/post/components"
import { Blog } from "@/interfaces/blog";
import { useCallback, useEffect, useState } from "react"
import { ProfileBlogCardSkeletonArray } from "../profile/components";
import ProfileBlogCard from "@/components/profile/ProfileBlogCard";

export default function TagsContent({
  tagName
}: {
  tagName: string
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [blogs, setBlogs] = useState<Blog[]>();
  const [count, setCount] = useState<number>(0);

  const fetchBlog = useCallback(async () => {
    try {
      const response = await fetchBlogsByTagNameAPI(tagName);
      if (!response.success) {
        setError("No likes");
      } else {
        setBlogs(response.data);
        setCount(response.count);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, [tagName]);

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
    <>
      <PostSectionContainer>
        <span className="mb-5 text-gray-500 text-sm font-light">
          {count} {count === 1 ? "Post" : "Posts"}
        </span>
        {blogs?.map((blog) => (
          <ProfileBlogCard key={blog.id} blog={blog} />
        ))}
      </PostSectionContainer>
    </>
  )
}