import ProfileSection from "@/components/ProfilePage/ProfileSection";
import TabsSection from "@/components/ProfilePage/TabSection";
import React from "react";

export default function ProfilePageLayout({
  params,
  children,
}: {
  params: { userId: string },
  children: React.ReactNode,
}) {
  console.log()
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[70%]">
        <ProfileSection userId={params.userId} />
        <TabsSection userId={params.userId} />
        {children}
      </div>
    </div>
  )
}