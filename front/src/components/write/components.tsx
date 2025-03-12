import React from "react";

export function WriteContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex min-h-screen">
      {children}
    </div>
  )
}

export function EditContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 flex flex-col h-full">
      {children}
    </div>
  )
}
export function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 flex flex-col gap-8 bg-gray-100 h-full px-10 pb-10 pt-0">
      {/* <div className="w-1/2 p-10 flex flex-col gap-8 bg-gray-100 h-full"> */}
      {children}
    </div>
  )
}