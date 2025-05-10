import { ProfileLayoutContainer } from "@/components/profile/components";
import ProfileSection from "@/components/profile/ProfileSection";
import TabsSection from "@/components/profile/TabSection";
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
    <ProfileLayoutContainer>
      {userId ? (
        <>
          <ProfileSection userId={userId} />
          <TabsSection userId={userId} />
          {children}
        </>
      ) : (
        <p>Loading...</p> // this is done to ensure that the apis are called in order
      )}
    </ProfileLayoutContainer>
  )
}