"use client"

import ProfileAvatar from "@/components/avatar";
import Link from "next/link";
import { ALERT, ERROR, formatRelativeDate, generateUniqueUserId } from "@/lib/constants";
import { deleteCommentAPI } from "@/app/api/comment";
import { Blog, Comment } from "@/interfaces/blog";
import { useAuth } from "@/lib/auth-client";
import { CommentedUserDetailsContainer } from "./components";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function Comments({
  blogInfo,
  comments,
  setComments,
}: {
  blogInfo: Blog,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const { user } = useAuth();

  const handleDeleteComment = async (commentId: number) => {
    if (!user || !confirm(ALERT.DELETE_COMMENT)) return;

    const commentToDelete = comments.find((comment) => comment.id === commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));

    try {
      const response = await deleteCommentAPI(blogInfo.id, commentId, user.email);
      if (response.error) {
        if (commentToDelete) {
          setComments([...comments, commentToDelete].sort((a, b) => a.id - b.id));
        }
        toast.error(ERROR.SOMETHING_WENT_WRONG, {
          description: response.error,
        });
        return;
      };

      toast.success(response.success);
    } catch (error) {
      console.error("Error deleting comment:", error);
      if (commentToDelete) {
        setComments([...comments, commentToDelete].sort((a, b) => a.id - b.id));
      }
      toast.error(ERROR.SOMETHING_WENT_WRONG, {
        description: "Failed to delete comment.",
      });
    }
  };

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
              {/* IF THE USER WAS THE ONE WHO COMMENTED, ALLOW THE USER TO DELETE THE COMMENT */}
              {(comment.userEmail == user?.email) && (
                <X
                  className="cursor-pointer w-4 font-normal hover:text-gray-600"
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