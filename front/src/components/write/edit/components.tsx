import { ReactNode } from "react"

export function Divider() {
  return (
    <div className="pb-10">
      <div className="mt-5 ml-2 h-[4px] bg-gray-300 w-1/6" />
    </div>
  )
}

export function EditTitleContainer({ children }: { children: ReactNode }) {
  return (
    <div className="pt-10 pl-10 pr-10">
      {children}
    </div>
  )
}

export function EditTagContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-none overflow-x pl-10 pr-10">
      {children}
    </div>
  )
}

export function EditContentContainer({ children }: { children: ReactNode }) {
  return (
    <div className="px-10 flex items-center justify-between gap-8 h-[calc(100vh-200px)] overflow-y-auto">
      {children}
    </div>
  )
}