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