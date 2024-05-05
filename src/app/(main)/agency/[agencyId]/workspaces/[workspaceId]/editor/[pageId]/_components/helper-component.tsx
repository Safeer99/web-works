"use client";

import clsx from "clsx";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SelectedElementType } from "@/components/providers/editor/editor-types";

interface Props {
  label: string;
  onDelete: () => void;
  hideTrash?: boolean;
  position: SelectedElementType["position"];
}

export const HelperComponent = ({
  label,
  onDelete,
  position,
  hideTrash,
}: Props) => {
  return (
    <div className="pointer-events-none absolute z-[180] inset-0">
      <div
        className={clsx(
          "pointer-events-none transition-none border-2 border-purple-600",
          {
            "border-yellow-400": hideTrash,
          }
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: `${position.w}px`,
          height: `${position.h}px`,
        }}
      />

      <div
        className="flex justify-between min-w-fit transition-none"
        style={{
          width: `${position.w}px`,
          transform: `translate(${position.x}px, ${
            position.y - position.h - 24
          }px)`,
        }}
      >
        <Badge className="pointer-events-auto h-[24px] rounded-none rounded-t-lg">
          {label}
        </Badge>
        {!hideTrash && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-red-600 px-2.5 py-1 text-xs font-bold rounded-none rounded-t-lg !text-white pointer-events-auto"
          >
            <Trash className="cursor-pointer" size={16} />
          </div>
        )}
      </div>
    </div>
  );
};
