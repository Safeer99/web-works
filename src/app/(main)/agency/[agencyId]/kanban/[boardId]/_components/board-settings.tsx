"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Board } from "@prisma/client";

import { BoardForm } from "@/components/forms/board-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/lib/board-service";

interface SettingsProps {
  agencyId: string;
  boardId: string;
  boards: Board[];
}

export const BoardSettings = ({ boardId, agencyId, boards }: SettingsProps) => {
  const router = useRouter();

  const handleDelete = () => {
    deleteBoard(boardId)
      .then(() => {
        toast.success("Board deleted successfully.");
        router.push(`/agency/${agencyId}/kanban`);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <AlertDialog>
      <div>
        <BoardForm
          agencyId={agencyId}
          defaultData={boards.find((p) => p.id === boardId)}
        />
        <div className="w-full flex items-center justify-between my-4 border-destructive border-2 p-8 rounded-md">
          <h5 className="text-xl font-semibold">Danger zone</h5>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete Pipeline</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>
      </div>
    </AlertDialog>
  );
};
