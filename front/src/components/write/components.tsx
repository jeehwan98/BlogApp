import React from "react";

export function WriteContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex min-h-screen overflow-y-hidden">
      {children}
    </div>
  )
}

export function EditContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 flex flex-col h-full pb-2">
      {children}
    </div>
  )
}
export function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 flex flex-col gap-8 bg-gray-100 h-screen px-10 pb-10 pt-10 overflow-y-auto">
      {/* <div className="w-1/2 p-10 flex flex-col gap-8 bg-gray-100 h-full"> */}
      {children}
    </div>
  )
}