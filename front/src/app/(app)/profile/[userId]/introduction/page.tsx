"use client"

import { fetchUserAPI, updateIntroductionAPI } from "@/app/api/user";
import { convertIdToEmail } from "@/lib/constants";
import { User } from "@/lib/interfaces";
import { useSession } from "@/lib/SessionProvider";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/UI/Button";

export default function IntroductionPage() {
  // const { userId } = params;
  const params = useParams();
  const userId = params?.userId as string;
  const { user } = useSession();
  const [userDetails, setUserDetails] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [introduction, setIntroduction] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // expand dynamically
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = convertIdToEmail(userId);
        const fetchedUser = await fetchUserAPI(email);
        setUserDetails(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  console.log("fetched user details:", userDetails);
  const isOwnProfile = user?.email === userDetails?.email;

  const handleSaveIntroduction = async () => {
    try {
      await updateIntroductionAPI(userDetails?.email as string, introduction as string); // Send to backend
      setEditing(false);
    } catch (error) {
      console.error("Error updating introduction:", error);
    }
  };

  return (
    <>
      {/* LOADING */}
      {loading ? (
        <p>Loading introduction...</p>
      ) : (
        <>
          {/* EDITING */}
          {editing ? (
            <>
              <textarea
                ref={textAreaRef}
                placeholder="Write your introduction..."
                className="w-full p-2 border rounded mt-2 focus:outline-none"
                onChange={handleChange}
                rows={4}
                style={{ overflowY: "hidden", resize: "none" }}
              />
              <Button
                onClick={handleSaveIntroduction}
              >
                Save Introduction
              </Button>
            </>
          ) : (
            <>
              {/* SHOW INTRODUCTION IF AVAILABLE */}
              {userDetails?.introduction ? (
                <p className="mt-2">{userDetails.introduction}</p>
              ) : (
                <p className="text-center mt-2 text-gray-500 italic mb-5">
                  {isOwnProfile ? "No introduction... Do you want to write an introduction?" : "No introduction."}
                </p>
              )}
              {isOwnProfile && (
                <Button
                  className="flex align-middle justify-center text-center"
                  onClick={() => setEditing(true)}
                >
                  {userDetails?.introduction ? "Edit Introduction" : "Add Introduction"}
                </Button>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}