import { useTheme } from "next-themes";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    // <div className="absolute right-0 mt-2 w-48 shadow-xl rounded-lg py-2 z-60">
    <div
      className={`absolute right-0 mt-2 w-48 shadow-xl rounded-lg py-2 z-60 ${theme === "dark"
        ? "shadow-black"
        : ""
        }`}
    >
      {children}
    </div>
  )
}

export function NavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <Link
      href={`/profile/${href}`}
      onClick={onClick}
      className={twMerge(
        "block px-4 py-2 text-base",
        theme === "dark"
          ? "hover:bg-gray-700"
          : "hover:bg-gray-200"
      )}
    >
      {children}
    </Link>
  )
}

export function LogoutNavLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { theme } = useTheme();
  return (
    <a className={twMerge(
      "block px-4 py-2 text-base cursor-pointer",
      theme === "dark"
        ? "hover:bg-gray-700"
        : "hover:bg-gray-200"
    )} onClick={onClick}>
      {children}
    </a>
  )
}