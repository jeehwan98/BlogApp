import blogPicture from "../../../public/images/blog-image.avif";
import Image from "next/image";
import Link from "next/link";
import TagList from "../ui/tag-list";
import { Blog } from "@/interfaces/blog";

export default function ProfileBlogCard({ blog }: { blog: Blog }) {

  const parseContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // extract the first image and the remaining content
    const firstImage = doc.querySelector("img");
    let coverImageSrc = blogPicture.src; // Default image
    let remainingContent = htmlContent;

    if (firstImage) {
      coverImageSrc = firstImage.src;
      // remove the first image from the content
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
        width={100}
        height={180}
        className="w-4/12 h-44 object-cover rounded-md"
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