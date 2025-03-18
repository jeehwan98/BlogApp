import { ReactNode } from "react";

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