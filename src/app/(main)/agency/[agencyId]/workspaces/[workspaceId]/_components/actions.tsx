"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import {
  deleteWorkspace,
  publishWorkspace,
  unPublishWorkspace,
} from "@/lib/workspace-service";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  isPublished: boolean;
  agencyId: string;
  workspaceId: string;
  disabled: boolean;
}

export const Actions = ({
  disabled,
  agencyId,
  workspaceId,
  isPublished,
}: Props) => {
  const confetti = useConfettiStore();
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      if (isPublished) {
        unPublishWorkspace(workspaceId)
          .then((res) => {
            toast.success("Workspace unpublished");
            router.refresh();
          })
          .catch(() => toast.error("Something went wrong"));
      } else {
        publishWorkspace(workspaceId)
          .then((res) => {
            toast.success("Workspace published");
            confetti.onOpen();
            router.refresh();
          })
          .catch(() => toast.error("Something went wrong"));
      }
    });
  };

  const onDelete = async () => {
    startTransition(() => {
      deleteWorkspace(workspaceId)
        .then((res) => {
          toast.success("Workspace deleted");
          router.replace(`/agency/${agencyId}/workspaces`);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onClick} disabled={disabled || isLoading} size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmDialog onConfirm={onDelete}>
        <Button
          variant="outline"
          className="hover:bg-red-500"
          size="sm"
          disabled={isLoading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmDialog>
    </div>
  );
};
