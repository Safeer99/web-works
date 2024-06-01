import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="h-full">
      <div className="p-4 fixed inset-y-0 hidden md:flex flex-col gap-6 w-64">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-16" />
        <div className="flex flex-col gap-3 px-2">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
      <div className="h-16 w-full p-4">
        <div className="w-full h-full flex items-center justify-end gap-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-10" />
        </div>
      </div>
      <div className="flex flex-col gap-6 md:ml-64 p-6">
        <div className="w-full pt-2 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
        <Skeleton className="w-full h-52" />
      </div>
    </div>
  );
};

export default LoadingPage;
