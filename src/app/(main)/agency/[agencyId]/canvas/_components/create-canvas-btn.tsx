"use client";

import { Button } from "@/components/ui/button";
import { createCanvas } from "@/lib/canvas-service";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  agencyId: string;
}

export const CreateCanvasButton = ({ agencyId }: Props) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      createCanvas(agencyId)
        .then((res) => {
          toast.success("Canvas created successfully.");
          router.refresh();
          router.push(`/agency/${agencyId}/canvas/${res.id}`);
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Button
      disabled={isLoading}
      className="flex items-center gap-2 ml-2"
      onClick={handleClick}
    >
      <Plus size={18} />
      Create Canvas
    </Button>
  );
};
