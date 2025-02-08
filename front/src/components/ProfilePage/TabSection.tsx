"use client"

import Link from "next/link"

export default function TabsSection({ userId }: { userId: string }) {
  return (
    <div className="flex space-x-6 border-b pb-2 mb-6">
      <Link
        href={`${userId}/posts`}
        className="text-lg font-semibold text-gray-800 border-b-2 border-black">
        Posts
      </Link>
      <Link
        href={`${userId}/introduction`}
        className="text-lg text-gray-500 hover:text-gray-800"
      >
        Introduction
      </Link>
    </div>
  )
}