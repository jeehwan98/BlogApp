import { ReactNode } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { BlogCardBottomContainer, BlogCardBottomUserContainer, BlogCardContainer } from "./blog-card/components"
import "react-loading-skeleton/dist/skeleton.css";

export function Title() {
  return (
    <div className="text-center text-4xl font-semibold">
      Blog Posts
    </div>
  )
}

export function HomeContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {children}
    </div>
  )
}

export function BlogsCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  )
}