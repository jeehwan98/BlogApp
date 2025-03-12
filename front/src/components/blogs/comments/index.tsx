"use client"

import ProfileAvatar from "@/components/avatar";
import Link from "next/link";
import { ALERT, ERROR, formatRelativeDate, generateUniqueUserId } from "@/lib/constants";
import { useEffect, useState } from "react";
import { deleteCommentAPI, fetchCommentsAPI } from "@/app/api/comment";
import { Blog, Comment } from "@/interfaces/blog";
import { useAuth } from "@/lib/auth-client";
import { CommentedUserDetailsContainer } from "./components";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function Comments({ blogInfo }: { blogInfo: Blog }) {
  const { user } = useAuth();
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

  const handleDeleteComment = async (commentId: number) => {
    console.log(commentId);
    if (!user || !confirm(ALERT.DELETE_COMMENT)) return;

    try {
      await deleteCommentAPI(commentId, user.email);
      toast(ERROR.SOMETHING_WENT_WRONG, {
        description: ERROR.REQUEST_DESCRIPTION,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  return (
    <div className="w-full ">
      {comments.length === 0 ? (
        <p className="italic">Be the first to write a comment</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="w-full mb-4 border-b pb-4">
            <CommentedUserDetailsContainer>
              <Link
                href={`/profile/${generateUniqueUserId(comment.userEmail)}/post`}
                className="flex items-center cursor-pointer gap-4"
              >
                <ProfileAvatar
                  image={comment.userImage || undefined}
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
              {(comment.userEmail == user?.email) && (
                <X
                  className="cursor-pointer w-4 font-normal"
                  onClick={() => { handleDeleteComment(comment.id) }}
                />
              )}
            </CommentedUserDetailsContainer>
            <p className="mt-4 w-full">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  )
}