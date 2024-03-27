"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Role } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Modal } from "@/components/modal";

import { useModal } from "@/hooks/use-modals";
import { MembersTable } from "@/lib/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { deleteAssociatedAccount } from "@/lib/agency-service";

interface CellActionsProps {
  rowData: MembersTable;
}

export const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  const modal = useModal();
  const router = useRouter();
  const params = useParams();
  const { role } = useCurrentUser(params.agencyId as string);

  const [isLoading, startTransition] = useTransition();
  if (!rowData) return;

  const handleRemove = () => {
    startTransition(() => {
      deleteAssociatedAccount(rowData.id)
        .then(() => {
          toast.success(`Kick ${rowData.name} successfully.`);
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              navigator.clipboard.writeText(rowData.email);
              toast.success("Email copied successfully.");
            }}
          >
            <Copy size={15} /> Copy Email
          </DropdownMenuItem>
          {rowData.role !== Role.AGENCY_OWNER &&
            (role === Role.AGENCY_OWNER || role === Role.AGENCY_ADMIN) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => {
                    modal.onOpen(
                      <Modal
                        description="You can change user permissions from here."
                        title="Edit User Details"
                      >
                        // TODO: create a permissions form
                      </Modal>
                    );
                  }}
                >
                  <Edit size={15} />
                  Edit Permissions
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    <p className="flex items-center gap-2 font-bold text-red-600 hover:text-red-600">
                      <Trash size={15} /> Remove User
                    </p>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the user
            and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel disabled={isLoading} className="mr-2">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive"
            onClick={handleRemove}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
