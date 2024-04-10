"use client";

import { Canvas } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Actions } from "./actions";

interface Props {
  data: Canvas;
}

export const CanvasCard = ({ data }: Props) => {
  const updatedAtLabel = formatDistanceToNow(data.updatedAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/agency/${data.agencyId}/canvas/${data.id}`}>
      <div className="h-40 group aspect-video border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-purple-500">
          <Image
            src={data.snapshot || "/canvas-placeholder.png"}
            alt={data.title}
            fill
            className="object-contain"
          />
          <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black" />
          <Actions id={data.id} title={data.title} />
        </div>
        <div className="relative py-2 px-3 flex justify-between">
          <p className="text-[13px] truncate max-w-[calc(100% - 20px)]">
            {data.title}
          </p>
          <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
            {updatedAtLabel}
          </p>
        </div>
      </div>
    </Link>
  );
};
