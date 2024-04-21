import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BoxSelect, ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  label: string;
  level: number;
  expanded: boolean;
  active: boolean;
  hasChildren: boolean;
  handleExpand: () => void;
  onClick: () => void;
}

export const LayerItem = ({
  label,
  level,
  handleExpand,
  expanded,
  active,
  hasChildren,
  onClick,
}: Props) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "text-sm py-2 w-full cursor-default flex items-center gap-2 text-muted-foreground border-[1px] border-transparent hover:border-primary hover:bg-muted",
        active && "bg-primary text-white hover:bg-primary"
      )}
      onClick={onClick}
    >
      <Button
        size="icon"
        variant="ghost"
        className="h-full w-auto hover:bg-transparent"
        disabled={!hasChildren}
        onClick={handleExpand}
      >
        <ChevronIcon
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground/50",
            !hasChildren && "opacity-0"
          )}
        />
      </Button>
      <BoxSelect className="h-4 w-4" />
      <span>{label}</span>
    </div>
  );
};
