import { ReactNode } from "react";

export function CommentedUserDetailsContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mt-4 justify-between">
      {children}
    </div>
  )
}