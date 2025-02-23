import ProfileSection from "@/components/ProfilePage/ProfileSection";
import TabsSection from "@/components/ProfilePage/TabSection";
import React from "react";

export default async function ProfilePageLayout({
  params,
  children,
}: {
  params: { userId: string },
  children: React.ReactNode,
}) {
  const { userId } = await params;

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[70%]">
        {userId ? (
          <>
            <ProfileSection userId={userId} />
            <TabsSection userId={userId} />
            {children}
          </>
        ) : (
          <p>Loading...</p> // this is done to ensure that the apis are called in order
        )}
      </div>
    </div>
  )
}