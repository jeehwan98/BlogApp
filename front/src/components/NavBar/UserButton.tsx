"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProfileAvatar from "../Avatar";
import { buttonVariants } from "../UI/Button";
import { DropdownMenu, LogoutNavLink, NavLink } from "./Components";
import { getUserId } from "@/lib/constants";

export default function UserButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDown = () => { setIsOpen((prev) => !prev); }
  const closeDropdown = () => { setIsOpen(false); }

  console.log("session?.user?.name:", session?.user?.name);
  console.log("session?.user?.email", session?.user?.email);

  return (
    <>
      {session ? (
        <div className="relative">
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDown} className="flex items-center space-x-2 hover:text-black transition-colors duration-300 ease-in-out group">
              <ProfileAvatar
                image={session?.user?.image || undefined}
                name={session?.user?.name as string}
                sx={{ width: 35, height: 35, marginRight: 2 }}
                fontSize={20}
              />
            </button>
            {isOpen && (
              <DropdownMenu>
                <NavLink href={getUserId(session?.user?.email as string)} onClick={closeDropdown}>내 프로필</NavLink>
                <NavLink href="/setting" onClick={closeDropdown}>설정</NavLink>
                <LogoutNavLink onClick={() => signOut()}>로그아웃</LogoutNavLink>
              </DropdownMenu>
            )}
          </div>
        </div>
      ) : (
        <li className="buttons px-4 space-x-2 flex">
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>Login</Link >
          {/* <Link href="/register" className={buttonVariants({ variant: "outline" })}>Register</Link> */}
        </li>
      )}
    </>
  )
}