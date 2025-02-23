import PostSection from "@/components/ProfilePage/PostSection";

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