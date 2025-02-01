"use client";

import Link from "next/link";
import { useState } from "react";
import navigation from "@/lib/links/navbar.json";
import { Button, buttonVariants } from "../UI/Button";
import { signOut, useSession } from "next-auth/react";

export default function MobileLink() {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  return (
    <div className="md:hidden">
      {/* MOBILE BUTTON */}
      <div
        className="text-4xl cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? "x" : "="}
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
        {session ?
          <Button onClick={() => signOut()}>로그아웃</Button> :
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>Login</Link>
        }
      </div>
    </div >
  )
}