import type { Metadata } from "next";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App",
};

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
      <NavBar />
      <div>{children}</div>
    </div>
  );
}