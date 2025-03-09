import { ReactNode } from "react";

export function BlogCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="h-[500px] mb-2 shadow-md flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2">
      {children}
    </div>
  )
}

export function BlogCardBottomContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between p-4 border-t">
      {children}
    </div>
  )
}

export function BlogCardBottomUserContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center align-middle gap-3">
      {children}
    </div>
  )
}