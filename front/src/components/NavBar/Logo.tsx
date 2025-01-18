import Image from "next/image";
import blogLogo from "../../../public/images/blog-logo.png";
import { useState } from "react";
import Link from "next/link";

export default function Logo() {
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

