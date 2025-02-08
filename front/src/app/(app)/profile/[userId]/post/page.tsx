import PostSection from "@/components/ProfilePage/PostSection";
import ProfileBlogCard from "@/components/ProfilePage/ProfileBlogCard";

export default function PostPage({
  params,
}: {
  params: { userId: string },
  children: React.ReactNode,
}) {
  const { userId } = params;
  return (
    <>
      <PostSection userId={userId} />
    </>
  )
}