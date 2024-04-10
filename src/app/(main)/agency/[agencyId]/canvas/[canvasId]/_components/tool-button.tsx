"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  icon: Icon,
  label,
  onClick,
  isActive,
  isDisabled,
}: Props) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        variant={isActive ? "canvasActive" : "canvas"}
        size="icon"
        disabled={isDisabled}
        onClick={onClick}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
