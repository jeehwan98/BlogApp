"use client";

import Link from "next/link";
import { useState } from "react";
import navigation from "@/lib/links/navbar.json";

export default function MobileLink() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="md:hidden">
      {/* MOBILE BUTTON */}
      <div
        className="text-4xl cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? "X" : "="}
      </div>
      {/* MOBILE LINK LIST */}
      <div className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 transition-all ease-in-out gap-8 font-medium text-lg
          ${open ? "-right-0" : "-right-[100%]"}`}
      >
        {navigation.map((link) => (
          <Link
            key={link.path}
            href={link.path}
          >
            {link.name}
          </Link>
        ))}
        <Link href="/login" className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
          Login 🥲
        </Link>
      </div>
    </div >
  )
}