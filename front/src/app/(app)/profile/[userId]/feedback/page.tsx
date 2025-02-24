"use client";

import { postFeedbackAPI } from "@/app/api/feedback";
import { Button } from "@/components/UI/Button";
import { convertIdToEmail } from "@/lib/constants";
import { useSession } from "@/lib/SessionProvider";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface FeedbackPageProps {
  userId?: string; // Added userId prop from layout params
}

export default function FeedbackPage() {
  const { user } = useSession();
  const params = useParams();
  const userId = params?.userId as string;
  const [feedback, setFeedback] = useState<string>("");
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [posting, setPosting] = useState<boolean>(false);

  const visitedUserEmail = convertIdToEmail(userId as string);
  const isOwnProfile = user && user.email === visitedUserEmail;

  console.log("visited user email?: ", visitedUserEmail);
  console.log("isOwnProfile?: ", isOwnProfile);
  useEffect(() => {
    if (!user || !isOwnProfile) {
      router.push("/");
    }
  }, [user, isOwnProfile, router, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleFeedback = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert("값을 입력하셔야 합니다");
      return;
    }
    setPosting(true);
    try {
      const response = await postFeedbackAPI(user?.email ?? "", feedback);
      console.log("Response:", response);

      if (response.success) {
        setFeedback("");
        alert("Feedback posted successfully");
        window.location.reload();
      } else {
        alert("Failed to post feedback");
      }
    } catch (error) {
      console.error("Error occurred while posting feedback", error);
    } finally {
      setPosting(false);
    }
  };

  if (!isOwnProfile) {
    return null;
  }

  // If user is not logged in, show return to login button
  if (!user) {
    return (
      <div className="text-center">
        <h1 className="mb-5 text-2xl font-bold">
          Please log in to leave feedback
        </h1>
        <Link href="/login">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Return to Login
          </Button>
        </Link>
      </div>
    );
  }

  // If logged in but not on own profile, hide feedback form
  if (!user.email) {
    return (
      <div className="text-center">
        <h1 className="mb-5 text-2xl font-bold">
          Feedback can only be posted on your own profile
        </h1>
      </div>
    );
  }

  // Show feedback form if logged in and on own profile
  return (
    <div className="">
      <h1 className="mb-5 text-2xl flex text-center font-bold justify-center">
        Feedback left would be greatly appreciated!
      </h1>
      <div className="flex items-center justify-between gap-8 mb-5">
        <textarea
          ref={textAreaRef}
          className="w-full min-h-[40px] max-h-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Write a feedback..."
          value={feedback}
          onChange={handleChange}
          rows={3}
          style={{ overflowY: "hidden", resize: "none" }}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleFeedback} disabled={posting}>
          {posting ? "Posting" : "Post"}
        </Button>
      </div>
    </div>
  );
}