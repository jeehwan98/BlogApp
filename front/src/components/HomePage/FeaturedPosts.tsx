// import Image from "next/image";
// import Link from "next/link";
// import blogImage from "../../../public/images/blog-image.avif";
// import BlogDetails from "./BlogDetails";

// interface Blog {
//   blogPostId: number;
//   context: string;
//   likesCount: number;
//   viewCount: number;
//   publishedAt: Date;
//   updatedAt: Date;
//   title: string;
//   visibilityStatus: string;
// }

// interface BlogProps {
//   blog: Blog;
// }

// export default function FeaturedPosts({ blog }: BlogProps) {
//   const { blogPostId, title, context, publishedAt } = blog;
//   return (
//     <div className="flex justify-center align-middle shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-2">
//       <div className="max-w-full h-auto mb-2 cursor-pointer">
//         <div className="max-w-full">
//           <Link href={`${blogPostId}`}>
//             <Image
//               className="max-w-full h-auto mb-2"
//               src={blogImage}
//               alt="Music Blog Image"
//               width={400}
//               height={400}
//             />
//           </Link>
//           <BlogDetails title={title} context={context} />
//           <CardBottom>
//             <BlogUser />
//             <ReadMoreButton />
//           </CardBottom>
//         </div>
//       </div>
//     </div>
//   )
// }

// function CardBottom({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex items-center justify-between p-2">
//       {children}
//     </div>
//   )
// }

// function BlogDetails({ title, context }: { title: string, context: string }) {
//   const sanitizedContext = DOMPurify.sanitize(context);
//   return (
//     <>
//       <div className="text-xl font-bold p-2">{title}</div>
//       <div
//         className="p-2"
//         dangerouslySetInnerHTML={{ __html: sanitizedContext }}
//       />
//     </>
//   )
// }

// function BlogUser() {
//   return (
//     <div className="flex items-center">
//       <Image
//         className="rounded-full"
//         src={blogCard}
//         alt='profile picture'
//         height={40}
//       />
//       <div className="ml-3">by <span className='font-bold'>김지환</span></div>
//     </div>
//   )
// }

// function ReadMoreButton() {
//   return (
//     <button className="px-2 py-2 text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
//       <Link href="/blogs/blog-id" className='button-text'>더 보기</Link>
//     </button>
//   )
// }

// export default function FeaturedPosts() {
//   return (
    
//     // <div className="mt-8 flex flex-col lg:flex-row gap-8">
//     //   {/* POPULAR POST */}
//     //   <div className="w-full lg:w-1/2 flex flex-col gap-4">
//     //     {/* image */}
//     //     <Image
//     //       className="rounded-3xl object-cover"
//     //       src={blogImage}
//     //       alt="post image"
//     //     />
//     //     {/* details */}
//     //     <div className="flex items-center gap-4">
//     //       <h1 className="font-semibold lg:text-lg">01.</h1>
//     //       <Link className="text-blue-800 lg:text-lg" href="web-design">Web Design</Link>
//     //       <span className="text-gray-500">2 days ago</span>
//     //     </div>
//     //     {/* title */}
//     //     <Link href="/test" className="text-lg lg:text-3xl font-semibold lg:font-bold">Some Random Texts for this blog link href</Link>
//     //   </div>
//     //   {/* OTHER POSTS */}
//     //   <div className="w-full lg:w-1/2 flex flex-col gap-8">
//     //     {/* second */}
//     //     <BlogDetails />
//     //     <BlogDetails />
//     //     <BlogDetails />
//     //   </div>
//     // </div>
//   )
// }