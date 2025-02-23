"use client"

import navigation from "@/lib/links/navbar.json";
import Link from "next/link";
import UserButton from "./UserButton";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../UI/Button";

export default function DesktopLink() {
  const path = usePathname();
  return (
    <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
      {navigation.map((navigation) => (
        <Link
          key={navigation.path}
          href={navigation.path}
          className={`${buttonVariants({ variant: "link" })} 
              ${path === navigation.path ? 'underline' : ''} 
              hover:underline dark:hover:underline`}
        >
          {navigation.name}
        </Link>
      ))}
      <UserButton />
    </div>
  )
}