"use client";

import { FormEventHandler, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modals";
import { updateCanvas } from "@/lib/canvas-service";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
}

export const RenameModal = ({ id, title: name }: Props) => {
  const router = useRouter();
  const modal = useModal();
  const [title, setTitle] = useState(name);
  const [isLoading, startTransition] = useTransition();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    startTransition(() => {
      updateCanvas(id, title)
        .then((res) => {
          toast.success("Name updated successfully.");
          modal.onClose();
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={() => modal.onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit canvas title</DialogTitle>
          <DialogDescription>
            Enter a new title for this canvas
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={isLoading}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Canvas title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => modal.onClose()}
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
