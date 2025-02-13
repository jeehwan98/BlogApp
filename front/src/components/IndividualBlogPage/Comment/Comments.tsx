"use client"

import { Comment } from "@/lib/interfaces";
import ProfileAvatar from "@/components/Avatar";
import Link from "next/link";
import { formatRelativeDate, generateUniqueUserId } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Blog } from "@/lib/interfaces";
import { fetchCommentsAPI } from "@/app/api/comment";

export default function Comments({ blogInfo }: { blogInfo: Blog }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await fetchCommentsAPI(blogInfo.id);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching errors:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="w-full">
      {comments.length === 0 ? (
        <p className="italic">Be the first to write a comment</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="w-full mb-4 border-b pb-4">
            <div className="flex items-center gap-4 mt-4">
              <Link
                href={`/profile/${generateUniqueUserId(comment.userEmail)}/post`}
                className="flex items-center cursor-pointer gap-4"
              >
                <ProfileAvatar
                  image={comment.userImage || undefined} // ✅ Ensure userImage is available in API
                  name={comment.userName}
                  sx={{ width: 50, height: 50 }}
                  fontSize={20}
                />
                <div className="flex flex-col">
                  <span className="font-bold">{comment.userName}</span>
                  <span className="text-gray-400 font-medium">
                    {formatRelativeDate(comment.createdAt)}
                  </span>
                </div>
              </Link>
            </div>
            <p className="mt-4 w-full">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  )
  // <div className="w-full">
  //   {comments.length === 0 ? (
  //     <p className="text-gray-400 italic">No comments yet.</p>
  //   ) : (
  //     comments.map((comment) => (
  //       <div key={comment.id} className="w-full mb-4 border-b pb-4">
  //         <div className="flex items-center gap-4 mt-4">
  //           <Link
  //             href={`/profile/${generateUniqueUserId(comment.user.email)}/post`}
  //             className="flex items-center cursor-pointer gap-4"
  //           >
  //             <ProfileAvatar
  //               image={comment.user.image || undefined}
  //               name={comment.user.name}
  //               sx={{ width: 50, height: 50 }}
  //               fontSize={20}
  //             />
  //             <div className="flex flex-col">
  //               <span className="font-bold">{comment.user.name}</span>
  //               <span className="text-gray-400 font-medium">{formatRelativeDate(comment.createdAt)}</span>
  //             </div>
  //           </Link>
  //         </div>
  //         <p className="mt-4 w-full">{comment.content}</p>
  //       </div>
  //     ))
  //   )}
  // </div>
}