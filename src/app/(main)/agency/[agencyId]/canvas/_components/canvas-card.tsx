"use client";

import Image from "next/image";
import Link from "next/link";
import { LucideEdit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Canvas } from "@prisma/client";
import { Actions } from "./actions";

interface Props {
  data: Canvas;
  isAdmin: boolean;
}

export const CanvasCard = ({ data, isAdmin }: Props) => {
  const updatedAtLabel = formatDistanceToNow(data.updatedAt, {
    addSuffix: true,
  });

  return (
    <div className="w-full h-full group aspect-video border rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="relative flex-1 bg-violet-300">
        <Link href={`/agency/${data.agencyId}/canvas/${data.id}`}>
          <Image
            src={data.snapshot || "/placeholders/1.png"}
            alt={data.title}
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all bg-black/50 grid place-items-center">
            <LucideEdit className="size-12 text-white opacity-75 hover:opacity-100" />
          </div>
        </Link>
      </div>
      <Actions data={data} isAdmin={isAdmin} />
      <div className="relative py-2 px-3 flex justify-between">
        <p className="text-[13px] truncate max-w-[calc(100% - 20px)]">
          {data.title}
        </p>
        <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
          {updatedAtLabel}
        </p>
      </div>
    </div>
  );
};
