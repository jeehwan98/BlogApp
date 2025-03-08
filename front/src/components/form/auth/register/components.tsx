import Link from "next/link"

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