import { headers } from "next/headers";
import DesktopLink from "./desktop-link";
import Logo from "./logo";
import MobileLink from "./mobile-link";

export default function NavBar() {

  const headersList = headers();
  const currentPath = headersList.get("x-invoke-path") || "/";

  return (
    <div className=" w-full h-16 md:h-20 flex items-center justify-between">
      <Logo />
      <MobileLink />
      <DesktopLink currentPath={currentPath} />
    </div>
  )
}