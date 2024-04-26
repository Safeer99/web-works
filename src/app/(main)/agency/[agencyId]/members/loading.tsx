import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full space-y-4 mt-4">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="w-36 h-8" />
        <Skeleton className="w-36 h-8" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Skeleton className="w-28 h-8" />
        <Skeleton className="w-28 h-8" />
      </div>
    </div>
  );
};

export default Loading;
