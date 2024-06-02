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
  scrollOffset: number;
}

export const HelperComponent = ({
  label,
  onDelete,
  position,
  hideTrash,
  scrollOffset = 0,
}: Props) => {
  const isOnTop = position.y - scrollOffset + 12 < 0;

  const translateY = isOnTop
    ? position.y + position.h - scrollOffset
    : position.y - scrollOffset - 24;

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
          transform: `translate(${position.x}px, ${
            position.y - scrollOffset
          }px)`,
          width: `${position.w}px`,
          height: `${position.h}px`,
        }}
      />

      <div
        className="absolute left-0 top-0 flex justify-between min-w-fit transition-none"
        style={{
          width: `${position.w}px`,
          transform: `translate(${position.x}px, ${translateY}px)`,
        }}
      >
        <Badge
          className={clsx("pointer-events-auto h-[24px] rounded-none", {
            "rounded-b-lg": isOnTop,
            "rounded-t-lg": !isOnTop,
          })}
        >
          {label}
        </Badge>
        {!hideTrash && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className={clsx(
              "bg-red-600 px-2.5 py-1 text-xs font-bold rounded-none !text-white pointer-events-auto",
              {
                "rounded-b-lg": isOnTop,
                "rounded-t-lg": !isOnTop,
              }
            )}
          >
            <Trash className="cursor-pointer" size={16} />
          </div>
        )}
      </div>
    </div>
  );
};
