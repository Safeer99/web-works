"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Board } from "@prisma/client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BoardForm } from "@/components/forms/board-form";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { deleteBoard } from "@/lib/board-service";

interface SettingsProps {
  agencyId: string;
  boardId: string;
  boards: Board[];
  isAdmin: boolean;
}

export const BoardSettings = ({
  boardId,
  agencyId,
  boards,
  isAdmin,
}: SettingsProps) => {
  const router = useRouter();

  const handleDelete = () => {
    deleteBoard(boardId, agencyId)
      .then(() => {
        toast.success("Board deleted successfully.");
        router.push(`/agency/${agencyId}/kanban`);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <CustomAlertDialog
      onConfirm={handleDelete}
      description="This action cannot be undone. This will permanently delete your
    data and remove it from our servers."
    >
      <div>
        <BoardForm
          agencyId={agencyId}
          defaultData={boards.find((p) => p.id === boardId)}
        />
        {isAdmin && (
          <div className="w-full flex items-center justify-between my-4 border-destructive border-2 p-8 rounded-md">
            <h5 className="text-xl font-semibold">Danger zone</h5>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete Pipeline</Button>
            </AlertDialogTrigger>
          </div>
        )}
      </div>
    </CustomAlertDialog>
  );
};
