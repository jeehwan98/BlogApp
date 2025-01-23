import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-4 py-2 rounded-lg border-none bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
      type="button"
    >
      {children}
    </button>
  )
}