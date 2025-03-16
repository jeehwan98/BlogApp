"use client"

import navigation from "@/lib/links/navbar.json";
import Link from "next/link";
import UserButton from "./user-button";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { useAuth } from "@/lib/auth/auth-client";

export default function DesktopLink() {
  const path = usePathname();
  const { user } = useAuth();

  const filteredNavigation = navigation.filter((navItem) => {
    if (navItem.name === "Feedback" && user?.role !== "ADMIN") {
      return false;
    }
    return true;
  });

  return (
    <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
      {filteredNavigation.map((navigation) => (
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