"use client";

import { Modal } from "@/components/modal";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modals";
import { Link2, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { RenameModal } from "@/components/rename-modal";
import { deleteCanvas } from "@/lib/canvas-service";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
}

export const Actions = ({ id, title }: Props) => {
  const router = useRouter();
  const modal = useModal();
  const [isLoading, startTransition] = useTransition();

  const onCopyLink = () => {
    // navigator.clipboard
    //   .writeText(`${window.location.origin}/board/${id}`)
    //   .then(() => toast.success("Link copied"))
    //   .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = () => {
    startTransition(() => {
      deleteCanvas(id)
        .then((res) => {
          toast.success("Canvas deleted successfully.");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()} side="right">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
            <Link2 className="h-4 w-4 mr-2" />
            Copy board link
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={() => {
              modal.onOpen(<RenameModal id={id} title={title} />);
            }}
            className="p-3 cursor-pointer"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <Trash className="h-4 w-4 mr-2" /> Delete Canvas
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Canvas</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the canvas and all of its contents.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
            className="mr-2"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onDelete}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
