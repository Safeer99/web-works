"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserForm } from "@/components/forms/user-form";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

import { useModal } from "@/hooks/use-modals";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AssociateWithUser } from "@/lib/types";
import { deleteAssociatedAccount } from "@/lib/agency-service";

interface CellActionsProps {
  rowData: AssociateWithUser;
}

export const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  const modal = useModal();
  const router = useRouter();
  const { role } = useCurrentUser(rowData.agencyId as string);

  const [isLoading, startTransition] = useTransition();
  if (!rowData) return;

  const handleRemove = () => {
    startTransition(() => {
      deleteAssociatedAccount(rowData.id, rowData.agencyId)
        .then(() => {
          toast.success(`Kick ${rowData.name} successfully.`);
          router.refresh();
        })
        .catch(() => toast.error("Could not kick user!!!"));
    });
  };

  return (
    <CustomAlertDialog
      onConfirm={handleRemove}
      description="This action cannot be undone. This will permanently delete the user
    and related data."
    >
      <DropdownMenu>
        <DropdownMenuTrigger disabled={isLoading} asChild>
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
                        <UserForm defaultData={rowData} />
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
    </CustomAlertDialog>
  );
};
