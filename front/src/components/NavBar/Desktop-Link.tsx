import navigation from "@/lib/links/navbar.json";
import Link from "next/link";
import UserButton from "./UserButton";

export default function DesktopLink() {
  return (
    <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
      {navigation.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className=""
        >
          {link.name}
        </Link>
      ))}
      <UserButton />
    </div>
  )
}