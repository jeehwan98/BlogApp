import { Button } from "../UI/Button";

export default function CommentSection() {
  return (
    <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full mt-5">
      <div className="flex gap-1">
        <span className="font-semibold">0</span>
        <h1 className="lg:text-xl md:text-lg text-base font-semibold">Comments</h1>
      </div>
      <div className="flex items-center justify-between gap-8">
        <textarea
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Write a comment..."
        />
      </div>
      <div className="flex justify-end">
        <Button>Post</Button>
      </div>
    </div>
  )
}