import { BlogPageWrapper } from "@/components/SinglePostPage/BlogComponents";
import BlogPost from "@/components/SinglePostPage/BlogPost";
import CommentSection from "@/components/SinglePostPage/CommentSection";

export default function SinglePostPage() {
  return (
    <BlogPageWrapper>
      <BlogPost />
      <CommentSection />
    </BlogPageWrapper>
  )
}