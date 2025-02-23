import React from "react";

export function BlogPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
      {children}
    </div>
  )
}

export function BlogHeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-20 max-w-4xl w-full">
      {children}
    </div>
  )
}