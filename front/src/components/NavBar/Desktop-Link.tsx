import navigation from "@/lib/links/navbar.json";
import Link from "next/link";
import UserButton from "./user-button";
import { buttonVariants } from "../ui/button";
import { getServerSession } from "@/lib/auth/auth-server";

export default async function DesktopLink({
  currentPath
}: {
  currentPath: string;
}) {
  const user = await getServerSession();

  const filteredNavigation = navigation.filter((navItem) => {
    if (navItem.name === "Feedback" && user?.role !== "ADMIN" ||
      navItem.name === "Users" && user?.role !== "ADMIN"
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
      {filteredNavigation.map((navigation) => (
        <Link
          key={navigation.path}
          href={navigation.path}
          className={`${buttonVariants({ variant: "link" })} 
              ${currentPath === navigation.path ? 'underline' : ''} 
              hover:underline dark:hover:underline`}
        >
          {navigation.name}
        </Link>
      ))}
      <UserButton />
    </div>
  )
}