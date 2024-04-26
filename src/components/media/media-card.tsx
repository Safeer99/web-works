"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { Media } from "@prisma/client";

import { deleteMedia } from "@/lib/media-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CustomAlertDialog } from "../custom-alert-dialog";

type Props = { file: Media };

export const MediaCard = ({ file }: Props) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteMedia(file.id)
        .then(() => {
          toast.success("Successfully deleted the file.");
          router.refresh();
        })
        .catch(() => toast.error("Could not delete the file!!!"));
    });
  };

  return (
    <CustomAlertDialog
      onConfirm={handleDelete}
      description="Are you sure you want to delete this file? All accounts using this
    file will no longer have access to it!"
    >
      <DropdownMenu>
        <article className="border w-full rounded-lg bg-slate-900">
          <div className="relative w-full h-40">
            <Image
              src={file.link}
              alt="preview image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="p-4 relative">
            <p className="text-xs text-muted-foreground">
              {file.createdAt.toDateString()}
            </p>
            <p>{file.name}</p>
            <div className="absolute top-4 right-4 p-[1px] cursor-pointer ">
              <DropdownMenuTrigger disabled={isLoading}>
                <MoreHorizontal />
              </DropdownMenuTrigger>
            </div>
          </div>

          <DropdownMenuContent className="z-[500]">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                navigator.clipboard.writeText(file.link);
                toast.success("Copied To Clipboard");
              }}
            >
              <Copy size={15} /> Copy Image Link
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
                <Trash size={15} /> Delete File
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </article>
      </DropdownMenu>
    </CustomAlertDialog>
  );
};
