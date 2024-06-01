import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full space-y-4 mt-2">
      <div className="flex items-center justify-between">
        <Skeleton className="w-48 h-10" />
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-24 h-8" />
        </div>
      </div>
      <Skeleton className="w-full h-1" />
      <Skeleton className="w-full h-96" />
    </div>
  );
};

export default Loading;
