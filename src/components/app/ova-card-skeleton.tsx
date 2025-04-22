import { Skeleton } from "@ui";

export const OvaCardSkeleton = () => {
  return (
    <Skeleton className="space-y-4 border-2 border-border px-5 py-8 rounded-sm">
      <div className="flex gap-2">
        <Skeleton className="h-5  w-24 rounded"></Skeleton>
        <Skeleton className="h-5  w-16 rounded ml-auto"></Skeleton>
      </div>
      <Skeleton className="h-36 rounded"></Skeleton>
      <div className="flex gap-2 mt-4">
        <Skeleton className="flex-1 h-10  rounded"></Skeleton>
        <Skeleton className="flex-1 h-10  rounded"></Skeleton>
      </div>
    </Skeleton>
  );
};
