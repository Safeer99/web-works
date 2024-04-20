import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComponentBadgeProps {
  visible: boolean;
  label: string;
}

export const ComponentBadge = ({ label, visible }: ComponentBadgeProps) => {
  if (!visible) return;
  return (
    <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
      {label}
    </Badge>
  );
};

interface ComponentDeleteBadgeProps {
  visible: boolean;
  onClick: () => void;
}

export const ComponentDeleteBadge = ({
  visible,
  onClick,
}: ComponentDeleteBadgeProps) => {
  if (!visible) return;
  return (
    <div className="absolute bg-red-600 px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
      <Trash className="cursor-pointer" size={16} onClick={onClick} />
    </div>
  );
};
