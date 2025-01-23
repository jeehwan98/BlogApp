import BlogDetails from "@/components/SinglePostPage/AuthorDetails";
import { BlogHeaderWrapper, BlogPageWrapper, BlogWrapper } from "@/components/SinglePostPage/BlogComponents";
import BlogContent from "@/components/SinglePostPage/BlogContent";
import BlogTitle from "@/components/SinglePostPage/BlogTitle";

export default function SinglePostPage() {
  return (
    <BlogPageWrapper>
      <BlogHeaderWrapper>
        <BlogTitle />
        <BlogDetails />
      </BlogHeaderWrapper>
      <BlogContent />
    </BlogPageWrapper>
  )
}