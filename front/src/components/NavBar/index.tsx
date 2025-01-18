import DesktopLink from "./Desktop-Link";
import Logo from "./Logo";
import MobileLink from "./Mobile-Link";

export default function NavBar() {

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Logo />
      <MobileLink />
      <DesktopLink />
    </div>
  )
}