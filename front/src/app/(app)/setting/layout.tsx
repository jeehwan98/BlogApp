import SettingsHeader from "@/components/setting/header";
import React from "react";

// export default function SettingsLayout() {
export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SettingsHeader />
      {children}
    </>
  )
}