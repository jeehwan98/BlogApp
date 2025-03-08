import blogPicture from "../../../public/images/blog-image.avif";
import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import TagList from "../ui/TagList";

export default function ProfileBlogCard({ blog }: { blog: Blog }) {

  const parseContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Find the first image
    const firstImage = doc.querySelector("img");
    let coverImageSrc = blogPicture.src; // Default image
    let remainingContent = htmlContent;

    if (firstImage) {
      coverImageSrc = firstImage.src;
      // Remove the first image from the content
      firstImage.remove();
      remainingContent = doc.body.innerHTML;
    }

    return { coverImageSrc, remainingContent };
  };

  const { coverImageSrc, remainingContent } = parseContent(blog.content);

  return (
    <Link
      className="flex overflow-hidden hover:bg-slate-50 rounded-md"
      href={`/blogs/${blog.id}`}
    >
      <Image
        src={coverImageSrc}
        alt="Playlist Cover"
        width={300}
        height={180}
        className="w-1/3 h-48 object-cover"
      />
      <div className="w-2/3 px-4 flex flex-col justify-between">
        <h3 className="font-semibold text-xl">{blog.title}</h3>
        <TagList tags={blog.tags} />
        <p
          className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
          dangerouslySetInnerHTML={{ __html: remainingContent }}
        />
      </div>
    </Link>
  )
}