import { ReactNode } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ProfileLayoutContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[70%]">
        {children}
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="flex items-center mb-10">
        <Skeleton
          circle
          width={60}
          height={60}
          containerClassName="mr-2 p-2"
        />
        <div className="ml-6 w-full max-w-md">
          <Skeleton height={32} width="50%" className="mb-2" />
          <Skeleton height={16} width="50%" />
        </div>
      </div>
    </SkeletonTheme >
  );
}

export function TagSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-2 border-none overflow-x">
      <TagSkeletonArray count={3} />
    </div>
  )
}

export function TagSkeletonArray({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex items-center mb-2"
        >
          <Skeleton width={35} height={25} />
        </div>
      ))}
    </>
  )
}

export function ProfileBlogCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="flex rounded-md">
        <Skeleton
          width={300}
          height={180}
          containerClassName="w-1/3 h-48 object-cover"
        />
        <div className="w-2/3 px-4 flex flex-col">
          {/* BLOG TITLE */}
          <Skeleton height={30} width="40%" containerClassName="mb-2" />
          {/* BLOG TAGS */}
          <TagSkeleton />
          <Skeleton height={15} width="80%" count={4} />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function ProfileBlogCardSkeletonArray({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ProfileBlogCardSkeleton key={index} />
      ))}
    </>
  )
}