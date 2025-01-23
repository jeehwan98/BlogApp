import Button from "../UI/button";

export default function CommentSection() {
  return (
    <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full mt-5">
      <h1 className="lg:text-xl md:text-lg text-base">Comments</h1>
      <div className="flex items-center justify-between gap-8">
        <textarea className="w-full px-3 py-2 rounded-sm" placeholder="Write a comment..." />
      </div>
      <div className="flex justify-end">
        <Button>Post</Button>
      </div>

    </div>
  )
}