import PostListItem from "./PostListItem";

export default function PostList() {
  return (
    <div className="">
      <div className="my-8 text-2xl text-gray-600">Recent Posts</div>
      <div className="flex flex-col gap-12 mb-8">
        <PostListItem />
        <PostListItem />
        <PostListItem />
        <PostListItem />
      </div>
    </div>
  )
}