"use client"

import { fetchBlogById } from "@/app/api/blog";
import { useCallback, useEffect, useState } from "react";
import BlogContent from "./content";
import BlogInfo from "./blog-info";
import CommentSection from "./comment-section";
import Comments from "@/components/blogs/comments";
import SeparateLine from "@/components/ui/separate-line";
import { Blog, Comment } from "@/interfaces/blog";
import { BlogDetailsContainer, BlogTitle } from "./components";
import { fetchCommentsAPI } from "@/app/api/comment";
import HandleLike from "../home/blog-card/handle-like";

export default function BlogDetails({ id }: { id: string }) {
  const [blogDetail, setBlogDetail] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogId = parseInt(id, 10);
        const fetchedBlog = await fetchBlogById(blogId);
        setBlogDetail(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const userId = parseInt(id, 10);
      const fetchedComments = await fetchCommentsAPI(userId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (!blogDetail) {
    return <div>Failed to load blog details.</div>
  }

  return (
    <BlogDetailsContainer>
      <BlogTitle title={blogDetail.title} />
      <HandleLike
        initialLikes={typeof blogDetail.likesCount === 'number' ? blogDetail.likesCount : 0}
        initialLiked={blogDetail.liked || false}
        id={blogDetail.id}
      />
      <BlogInfo blogInfo={blogDetail} />
      <BlogContent content={blogDetail.content} />
      <SeparateLine />
      <CommentSection
        blogInfo={blogDetail}
        comments={comments}
        setComments={fetchComments}
      />
      <Comments
        blogInfo={blogDetail}
        comments={comments}
        setComments={setComments}
      />
    </BlogDetailsContainer>
  )
}