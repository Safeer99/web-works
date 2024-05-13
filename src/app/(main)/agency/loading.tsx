import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="h-full">
      <div className="p-4 fixed inset-y-0 hidden md:flex flex-col gap-6 w-64">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-16" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </div>
      <div className="h-[80px] w-full p-4">
        <div className="w-full h-full flex items-center justify-end gap-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-10" />
        </div>
      </div>
      <div className="space-y-4 mt-4 md:ml-64 p-4">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="w-36 h-8" />
          <Skeleton className="w-36 h-8" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="w-28 h-8" />
          <Skeleton className="w-28 h-8" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
