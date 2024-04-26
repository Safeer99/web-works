import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full space-y-4 ">
      <div className="flex items-center justify-between">
        <Skeleton className="w-36 h-12" />
        <Skeleton className="w-24 h-12" />
      </div>
      <Skeleton className="w-full h-4" />
      <div className="flex items-center flex-wrap gap-2 pt-4">
        <Skeleton className="w-full max-w-[300px] h-48" />
        <Skeleton className="w-full max-w-[300px] h-48" />
        <Skeleton className="w-full max-w-[300px] h-48" />
      </div>
    </div>
  );
};

export default Loading;
