"use client"

import Image from "next/image";
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button";

export default function GithubSignInButton() {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/images/githubDarkLogo.png" : "/images/githubLightLogo.png";

  const handleLoginGithub = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "http://localhost:8080/api/v1/auth/login/github";
  };

  return (
    <Button
      onClick={handleLoginGithub}
      className="w-full mt-5"
    >
      <Image src={logo} alt="Github Logo" width={20} height={20} />
      <span>Continue with Github</span>
    </Button>
  )
}