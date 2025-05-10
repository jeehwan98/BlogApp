import SettingsHeader from "@/components/setting/header";
import { getServerSession } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";
import React from "react";

// export default function SettingsLayout() {
export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getServerSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <SettingsHeader />
      {children}
    </>
  )
}