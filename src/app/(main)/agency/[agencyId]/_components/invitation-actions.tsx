"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { Invitation } from "@prisma/client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { deleteInvitation } from "@/lib/invitation";

interface Props {
  data: Invitation;
  isAdmin: boolean;
}

export const Actions = ({ data, isAdmin }: Props) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(() => {
      deleteInvitation(data.id, data.agencyId)
        .then(() => {
          toast.success("Invitation deleted successfully.");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <CustomAlertDialog
      onConfirm={onDelete}
      description="This action cannot be undone. This will delete the invitation and all of its contents."
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="p-2 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(data.email);
              toast.success("Email copied successfully.");
            }}
          >
            <Copy className="size-4 mr-2" /> Copy Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAdmin && (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="p-2 cursor-pointer">
                <Trash className="size-4 mr-2" /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </CustomAlertDialog>
  );
};
