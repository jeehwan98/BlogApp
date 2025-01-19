import navigation from "@/lib/links/navbar.json";
import Link from "next/link";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";

export default function DesktopLink() {
  return (
    <div className="hidden md:flex items-center gap-8  xl:gap-12 font-medium">
      {navigation.map((link) => (
        <Link
          key={link.path}
          href={link.path}
        >
          {link.name}
        </Link>
      ))}

      <SignedOut>
        {/* <SignIn /> */}
        <Link href="/login" className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
          Login 🥲
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}