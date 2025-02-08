import ProfileAvatar from "@/components/Avatar";
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
        <div className="flex items-center mb-10">
          <ProfileAvatar
            image={undefined}
            name="김지환"
            sx={{ width: 80, height: 80, marginRight: 2 }}
            fontSize={40}
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">김지환</h1>
            <p className="text-gray-500">@jeehwankim5249</p>
          </div>
        </div>
        <TabsSection userId={params.userId} />
        {children}
      </div>
    </div>
  )
}