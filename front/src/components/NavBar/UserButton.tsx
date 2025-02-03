"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProfileAvatar from "../Avatar";
import { buttonVariants } from "../UI/Button";
import { DropdownMenu, LogoutNavLink, NavLink } from "./Components";
import { getUserId } from "@/lib/constants";
import { logoutAPI } from "@/app/api/auth/auth";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
  role: string;
  exp: number;
}

export default function UserButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);

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

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/auth/me", { credentials: "include" });
        if (!response.ok) throw new Error("Unauthorized");

        const data = await response.json();
        const decodedToken = jwtDecode(data.token);
        // const decodedToken: DecodedToken = jwtDecode(data.token);

        console.log("decoded token:", decodedToken);

        setToken(decodedToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }

    fetchToken();
  }, []);

  const toggleDown = () => { setIsOpen((prev) => !prev); }
  const closeDropdown = () => { setIsOpen(false); }

  return (
    <>
      {token ? (
        <div className="relative">
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDown} className="flex items-center space-x-2 hover:text-black transition-colors duration-300 ease-in-out group">
              <ProfileAvatar
                image={"image" || undefined}
                name={"김지환" as string}
                sx={{ width: 35, height: 35, marginRight: 2 }}
                fontSize={20}
              />
            </button>
            {isOpen && (
              <DropdownMenu>
                <NavLink href={getUserId("jihun@naver.com" as string)} onClick={closeDropdown}>내 프로필</NavLink>
                <NavLink href="/setting" onClick={closeDropdown}>설정</NavLink>
                <LogoutNavLink onClick={() => logoutAPI()}>로그아웃</LogoutNavLink>
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