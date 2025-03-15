"use client"

import navigation from "@/lib/links/settings-navbar.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

export default function SettingsHeader() {
  const path = usePathname();
  return (
    <header>
      <nav>
        <ul className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
          {navigation.map((link) => (
            <li key={link.path}>
              <Link
                href={`setting/${link.path}`}
                className={`${buttonVariants({ variant: "link" })} 
                            ${path === `setting/${link.path}` ? 'underline' : ''} 
                            hover:underline dark:hover:underline`}
              >{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header >
  );
}