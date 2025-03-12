import React from "react";

export function BlogContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center my-10">
      {/* <div className="w-[70%]"> */}
      <div className="xl:w-[50%] lg:w-[70%] md:w-[80%] sm:w-[100%] w-[100%]">
        {children}
      </div>
    </div>
  )
}

export function BlogTitle({ title }: { title: string }) {
  return (
    <h1 className="xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold">
      {title}
    </h1>
  )
}