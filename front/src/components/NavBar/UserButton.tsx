"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProfileAvatar from "../Avatar";
import { buttonVariants } from "../UI/Button";
import { DropdownMenu, LogoutNavLink, NavLink } from "./Components";
import { getUserId } from "@/lib/constants";
import { logoutAPI } from "@/app/api/auth/auth";
import { useSession } from "@/lib/SessionProvider";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = useSession();

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

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await logoutAPI();

      if (success) {
        window.location.reload();
      } else {
        console.error("Logout failed, please try again");
      }
    } catch (error) {
      console.error("error occurred while logging in: ", error);
    }
  }

  console.log("token details?: ", token.user);

  return (
    <>
      {token.user ? (
        <div className="relative">
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDown} className="flex items-center space-x-2 hover:text-black transition-colors duration-300 ease-in-out group">
              <ProfileAvatar
                image={token.user?.image || undefined}
                name={token.user.name as string}
                sx={{ width: 35, height: 35, marginRight: 2 }}
                fontSize={20}
              />
            </button>
            {isOpen && (
              <DropdownMenu>
                <NavLink href={getUserId(token.user.email as string)} onClick={closeDropdown}>내 프로필</NavLink>
                <NavLink href="/setting" onClick={closeDropdown}>설정</NavLink>
                <LogoutNavLink onClick={handleLogout}>로그아웃</LogoutNavLink>
              </DropdownMenu>
            )}
          </div>
        </div>
      ) : (
        <li className="buttons px-4 space-x-2 flex">
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>Login</Link >
        </li>
      )}
    </>
  )
}