import React from "react";

export default function BlogContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[70%]">
        {children}
      </div>
    </div>
  )
}