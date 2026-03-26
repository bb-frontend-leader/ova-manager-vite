import { Skeleton } from '@ui';

interface Props {
  viewMode?: 'grid' | 'list';
}

export const OvaCardSkeleton: React.FC<Props> = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <Skeleton className="flex items-center gap-3 border-2 border-border px-4 py-3 rounded-sm">
        <Skeleton className="h-16 w-24 shrink-0 rounded-sm" />
        <div className="flex flex-1 items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      </Skeleton>
    );
  }

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
