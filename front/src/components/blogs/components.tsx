import React from "react";

export function BlogContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[50%]">
        {children}
      </div>
    </div>
  )
}

export function BlogTitle({ title }: { title: string }) {
  return (
    <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold">
      {title}
    </h1>
  )
}