import { BlogPageWrapper } from "@/components/SinglePostPage/BlogComponents";
import BlogPost from "@/components/SinglePostPage/BlogPost";
import Comments from "@/components/SinglePostPage/Comments";
import CommentSection from "@/components/SinglePostPage/CommentSection";

export default function SinglePostPage() {
  return (
    <BlogPageWrapper>
      <BlogPost />
      <CommentSection />
      <Comments />
      <Comments />
      <Comments />
      <Comments />
    </BlogPageWrapper>
  )
}