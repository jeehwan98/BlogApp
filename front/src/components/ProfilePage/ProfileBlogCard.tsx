import blogPicture from "../../../public/images/blog-image.avif";
import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileBlogCard({ blog }: { blog: Blog }) {
  const router = useRouter();

  const handleBlogClick = (blogId: number) => {
    router.push(`/blogs/${blogId}`);
  }
  return (
    <div
      className="flex overflow-hidden hover:bg-slate-50 rounded-md"
      onClick={() => handleBlogClick(blog.id)}
    >
      <Image
        src={blogPicture}
        alt="Playlist Cover"
        className="w-1/3 h-48 object-cover"
      />
      <div className="w-2/3 px-4 flex flex-col justify-between">
        <h3 className="font-semibold text-xl">{blog.title}</h3>
        <div className="flex flex-wrap items-center gap-2 border-none overflow-x">
          {blog.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="flex items-center bg-gray-50 text-gray-800 rounded-lg px-3 py-1 text-base cursor-pointer hover:bg-gray-200"
            >
              <Link href={`/tags/${tag}`}>
                {tag}
              </Link>
            </span>
          ))}
        </div>
        <p
          className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  )

}