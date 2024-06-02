import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="w-full pt-2 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
      <Skeleton className="w-full h-52" />
    </div>
  );
};

export default LoadingPage;
