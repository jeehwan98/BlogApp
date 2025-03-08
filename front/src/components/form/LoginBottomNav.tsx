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