import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full space-y-4">
      <Skeleton className="w-40 h-6" />
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="w-28 h-10" />
        <div className="flex gap-2 items-center justify-center">
          <Skeleton className="w-16 h-8" />
          <Skeleton className="w-12 h-8" />
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-48 h-8" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="flex-1 h-96" />
        <Skeleton className="flex-2 h-96" />
      </div>
    </div>
  );
};

export default Loading;
