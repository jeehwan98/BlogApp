import React from "react";

export default function Button({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // Allows passing other props like `onClick`
}) {
  return (
    <button
      className={`px-4 py-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
