import BlogDetails from "./AuthorDetails";
import { BlogHeaderWrapper } from "./BlogComponents";
import BlogContent from "./BlogContent";
import BlogTitle from "./BlogTitle";

export default function BlogPost() {
  return (
    <>
      <BlogHeaderWrapper>
        <BlogTitle />
        <BlogDetails />
      </BlogHeaderWrapper>
      <BlogContent />
    </>
  )
}