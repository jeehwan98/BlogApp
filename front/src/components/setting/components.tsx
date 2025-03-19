import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SettingsProfileButtonProps } from "@/interfaces/setting";

export function SettingsProfileContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-10">
      <div className="w-full align-middle justify-center items-center">
        {children}
      </div>
    </div>
  )
}

export function SettingsProfileTitle() {
  return (
    <h1 className="text-3xl font-bold mt-7 mb-5">프로핀 수정</h1>
  )
}

export function SettingsProfileButton({
  isPending,
  isChanged
}: SettingsProfileButtonProps
) {
  return (
    <div className="flex align-middle items-center justify-center mt-5">
      <>
        <Link
          href="../"
          className="text-black px-4 py-2 rounded-md flex items-center hover:bg-gray-100"
        >
          나가기
        </Link>
        <Button
          className="ml-2"
          type="submit"
          disabled={!isChanged || isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Update"}
        </Button>
      </>
    </div>
  )
}