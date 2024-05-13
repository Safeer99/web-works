"use client";

import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import {
  deleteWorkspace,
  publishWorkspace,
  unPublishWorkspace,
} from "@/lib/workspace-service";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
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
        unPublishWorkspace(workspaceId, agencyId)
          .then((res) => {
            toast.success("Workspace unpublished");
            router.refresh();
          })
          .catch(() => toast.error("Something went wrong"));
      } else {
        publishWorkspace(workspaceId, agencyId)
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
      deleteWorkspace(workspaceId, agencyId)
        .then(() => {
          toast.success("Workspace deleted");
          router.replace(`/agency/${agencyId}/workspaces`);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClick} disabled={disabled || isLoading} size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <CustomAlertDialog onConfirm={onDelete}>
        <AlertDialogTrigger className="hover:bg-red-600 hover:text-white text-red-600 p-[7px] px-3 rounded-md border-[1px] border-red-600">
          <Trash className="h-5 w-5" />
        </AlertDialogTrigger>
      </CustomAlertDialog>
    </div>
  );
};
