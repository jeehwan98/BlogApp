import Link from "next/link"

export function LoginBottomNav() {
  const className = 'text-blue-400 hover:text-blue-600'
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <Link href="#" className={className}>
        Forgot password?
      </Link>
      <Link href="/register" className={className}>
        Register
      </Link>
    </div>
  )
}

export function RegisterBottomNav() {
  const className = 'text-blue-400 hover:text-blue-600'
  return (
    <div className="flex items-center justify-center mt-4 text-sm">
      <span className="mr-2">Already have an account?</span>
      <Link href="/login" className={className}>
        Login
      </Link>
    </div>
  )
}

export function Line() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="w-1/5 border-b border-gray-400"></span>
      <span className="text-sm text-gray-400">or continue with</span>
      <span className="w-1/5 border-b border-gray-400"></span>
    </div>
  )
}

import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange
}: InputFieldProps) {
  return (
    <input
      className="w-full px-2 py-2 border rounded focus:outline-none text-base"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}