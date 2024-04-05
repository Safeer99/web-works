"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modals";

interface ModalProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  description,
  title,
  children,
}) => {
  const modal = useModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={() => modal.onClose()}>
      <DialogContent className="scrollbar-hidden z-[500] overflow-y-scroll md:max-h-[700px] h-screen bg-card">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
