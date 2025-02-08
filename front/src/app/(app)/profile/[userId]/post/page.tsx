import Image from "next/image";
import blogPicture from "../../../../../../public/images/blog-image.avif";

export default function PostPage() {
  return (
    <div>
      <div className="grid gap-6">
        {/* Blog Card */}
        <div className="flex overflow-hidden">
          <Image
            src={blogPicture}
            alt="Playlist Cover"
            className="w-1/3 h-48 object-cover"
          />
          <div className="w-2/3 px-4 flex flex-col justify-between">
            <h3 className="font-semibold text-xl font-bold">블로그 타이틀</h3>
            <p className="text-sm text-gray-500 mt-3">태그</p>
            <p className="text-sm text-gray-500 mt-2 h-full truncate">content</p>
          </div>
        </div>
      </div>
    </div>
  )
}