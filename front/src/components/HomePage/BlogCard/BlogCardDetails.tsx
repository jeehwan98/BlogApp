// import { Blog } from "@/lib/interfaces";
// import Image from "next/image";
// import Link from "next/link";
// import blankBlogImage from "../../../../public/images/blog-image.avif";
// import { formatRelativeDate } from "@/lib/constants";

// export default function BlogCardDetails({ blog }: { blog: Blog }) {

//   return (
//     <Link href={`blogs/${blog.id}`} className="h-full flex flex-col">
//       <Image
//         className="w-full h-[180px] object-cover"
//         src={blankBlogImage}
//         alt={`${blog.title}`}
//         width={300}
//         height={180}
//       />
//       <div className="flex-1 p-4 max-h-full">
//         <h3 className="text-xl font-bold truncate">{blog.title}</h3>
//         <p
//           className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//         />
//         <span className="text-sm text-gray-600 truncate">{formatRelativeDate(blog.createdAt)}</span>
//       </div>
//     </Link>
//   )
// }

import { Blog } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import blankBlogImage from "../../../../public/images/blog-image.avif";
import { formatRelativeDate } from "@/lib/constants";

export default function BlogCardDetails({ blog }: { blog: Blog }) {
  return (
    <Link href={`blogs/${blog.id}`} className="h-full flex flex-col overflow-hidden">
      {/* Blog Image */}
      <Image
        className="w-full h-[180px] object-cover"
        src={blankBlogImage}
        alt={`${blog.title}`}
        width={300}
        height={180}
      />

      {/* Blog Content */}
      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          <h3 className="text-xl font-bold truncate">{blog.title}</h3>
          <p
            className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Timestamp at the Bottom */}
        <span className="text-sm text-gray-600 mt-4">{formatRelativeDate(blog.createdAt)}</span>
      </div>
    </Link>
  );
}
