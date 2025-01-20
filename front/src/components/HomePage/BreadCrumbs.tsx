import Link from "next/link";

export default function BreadCrumbs() {
  return (
    <div className="flex gap-2">
      <Link href="/">Home</Link>
      <span>·</span>
      <span className="text-blue-300">Blogs and Articles</span>
    </div>
  )
}