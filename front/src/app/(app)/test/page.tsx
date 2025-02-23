import { BlogPageWrapper } from "@/components/SinglePostPage/BlogComponents";
import BlogPost from "@/components/SinglePostPage/BlogPost";
import Comments from "@/components/IndividualBlogPage/Comment/Comments";
import CommentSection from "@/components/IndividualBlogPage/CommentSection";

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