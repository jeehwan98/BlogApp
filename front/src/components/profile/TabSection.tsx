"use client"

import { useAuth } from "@/lib/auth-client";
import { convertIdToEmail } from "@/lib/constants";
import navlinks from "@/lib/links/profile_navbar.json";

import Link from "next/link"
import { usePathname } from "next/navigation";

export default function TabsSection({ userId }: { userId: string }) {
  const { user } = useAuth();
  const pathname = usePathname();

  const visitedUserEmail = convertIdToEmail(userId);
  const isOwnProfile = user && user.email === visitedUserEmail;

  const visibleLinks = isOwnProfile
    ? navlinks // Show all links if own profile
    : navlinks.filter((link) => link.name !== "Feedback");

  return (
    <div className="flex space-x-6 border-b pb-2 mb-6">
      {visibleLinks.map((link) => (
        <Link
          key={link.path}
          href={`/profile/${userId}${link.path}`}
          className={`text-lg ${pathname === `/profile/${userId}${link.path}`
            ? "font-semibold text-gray-800 border-b-2 border-black"
            : "text-gray-500 hover:text-gray-800"
            }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}