"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { Canvas } from "@prisma/client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CanvasForm } from "@/components/forms/canvas-form";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/use-modals";
import { deleteCanvas } from "@/lib/canvas-service";

interface Props {
  data: Canvas;
  isAdmin: boolean;
}

export const Actions = ({ data, isAdmin }: Props) => {
  const router = useRouter();
  const modal = useModal();
  const [isLoading, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(() => {
      deleteCanvas(data.id, data.agencyId)
        .then(() => {
          toast.success("Canvas deleted successfully.");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <CustomAlertDialog
      onConfirm={onDelete}
      description="This action cannot be undone. This will delete the canvas and all of its contents."
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              modal.onOpen(
                <Modal title="Edit canvas details" description="">
                  <CanvasForm defaultData={data} agencyId={data.agencyId} />
                </Modal>
              );
            }}
            className="p-2 cursor-pointer"
          >
            <Pencil className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
          {isAdmin && (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="p-2 cursor-pointer">
                <Trash className="size-4 mr-2" /> Delete Canvas
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </CustomAlertDialog>
  );
};
