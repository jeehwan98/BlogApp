"use client"

import { fetchBlogById } from "@/app/api/blog";
import { Blog } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import BlogTitle from "./Title";
import BlogContent from "./BlogContent";
import BlogInfo from "./BlogInfo";
import SeparateLine from "../UI/SeparateLine";
import CommentSection from "./CommentSection";
import Comments from "./Comment/Comments";

export default function BlogDetails({ id }: { id: string }) {
  const [blogDetail, setBlogDetail] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await fetchBlogById(id);
        setBlogDetail(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (!blogDetail) {
    return <div>Failed to load blog details.</div>
  }

  return (
    <div className="flex-1 p-4">
      <BlogTitle title={blogDetail.title} />
      <BlogInfo blogInfo={blogDetail} />
      <BlogContent content={blogDetail.content} />
      <SeparateLine />
      <CommentSection blogInfo={blogDetail} />
      <Comments blogInfo={blogDetail} />
    </div>
  )
}