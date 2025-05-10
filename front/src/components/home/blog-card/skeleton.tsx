import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BlogCardBottomContainer, BlogCardBottomUserContainer, BlogCardContainer } from "./components";

export function BlogCardDetailsSkeleton() {
  return (
    <div className="h-full flex flex-col overflow-hidden" >
      {/* BLOG IMAGE */}
      <Skeleton
        className="w-full h-[180px] object-cover"
        width="100%"
        height={175}
      />
      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          <h3 className="text-xl font-bold truncate">
            {/* BLOG TITLE */}
            <Skeleton height={32} width="100%" className="mb-2" />
          </h3>
          <div>
            {/* BLOG CONTEXT */}
            <Skeleton height={14} width="100%" count={4} className="mb-2" />
          </div>
        </div>
        <div>
          <Skeleton width="35%" height={18} className="mt-12" />
        </div>
      </div>
    </div >
  )
}

export function BlogCardBottomSkeleton() {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <BlogCardBottomContainer>
        <BlogCardBottomUserContainer>
          <div className="flex items-center">
            {/* Skeleton for ProfileAvatar */}
            <Skeleton
              circle
              width={35}
              height={35}
              containerClassName="mr-2"
            />
            <div className="text-sm">
              {/* Skeleton for "by <username>" */}
              <Skeleton width={60} height={15} />
            </div>
          </div>
        </BlogCardBottomUserContainer>
        {/* Skeleton for "더 보기" (Read More) link */}
        <Skeleton width={50} height={30} />
      </BlogCardBottomContainer>
    </SkeletonTheme>
  );
}

export function BlogCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <BlogCardContainer>
        <BlogCardDetailsSkeleton />
        <BlogCardBottomSkeleton />
      </BlogCardContainer>
    </SkeletonTheme>
  );
}

export function BlogCardSkeletonArray({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </>
  )
}