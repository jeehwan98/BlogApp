import { ReactNode } from "react";

export function PostSectionContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 mb-10">
      {children}
    </div>
  )
}