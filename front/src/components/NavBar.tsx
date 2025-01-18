"use client";

import Image from "next/image";
import blogLogo from "../../public/images/blog-logo.png";
import { useState } from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 text-2xl font-bold"
    >
      <Image
        alt="logo"
        src={blogLogo}
        width="50"
        height="50"
        className="cursor-pointer"
      />
      <span className="cursor-pointer">Blog Logo</span>
    </Link>
  )
}

export default function NavBar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Logo />
      {/* MOBILE MENU */}
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
          <a href="/">Home</a>
          <a href="/">Trending</a>
          <a href="/">Most Popular</a>
          <a href="/">About</a>
          <a href="/">Home</a>
          <a href="">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 🤔</button>
          </a>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8  xl:gap-12 font-medium">
        <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="/">Home</a>
        <a href="">
          <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 🤔</button>
        </a>
      </div>
    </div>
  )
}