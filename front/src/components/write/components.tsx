import React from "react";

export function WriteContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      {children}
    </div>
  )
}

export function EditWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 flex flex-col">
      {children}
    </div>
  )
}
export function PreviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 p-10 flex flex-col gap-8 bg-gray-100 h-full">
      {/* <div className="p-10 flex flex-col w-full"> */}
      {children}
    </div>
  )
}