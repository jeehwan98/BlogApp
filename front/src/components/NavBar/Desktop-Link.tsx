"use client"

import navigation from "@/lib/links/navbar.json";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UserButton from "./UserButton";

export default function DesktopLink() {
  const path = usePathname();
  return (
    <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
      {navigation.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className=""
        >
          {link.name}
        </Link>
      ))}
      <UserButton />
    </div>
  )
}