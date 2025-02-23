import React from "react";

export function WriteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {children}
    </div>
  )
}

export function EditWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 p-10 flex flex-col gap-8">
      {children}
    </div>
  )
}
export function PreviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 p-10 flex flex-col gap-8 bg-gray-100">
      {children}
    </div>
  )
}