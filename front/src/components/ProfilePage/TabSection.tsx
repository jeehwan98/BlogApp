"use client"
import navlinks from "@/lib/links/profile_navbar.json";

import Link from "next/link"
import { usePathname } from "next/navigation";

export default function TabsSection({ userId }: { userId: string }) {
  const pathname = usePathname();
  return (
    <div className="flex space-x-6 border-b pb-2 mb-6">
      {navlinks.map((link) => (
        <Link
          key={link.path}
          href={`/profile/${userId}${link.path}`}
          className={`text-lg ${pathname === `/profile/${userId}${link.path}` ? 'font-semibold text-gray-800 border-b-2 border-black' : 'text-gray-500 hover:text-gray-800'}`}
        >
          {link.name}
        </Link>
      ))}
    </div >
  )
}