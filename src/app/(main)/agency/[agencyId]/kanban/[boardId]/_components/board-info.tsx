"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Board } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modals";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Modal } from "@/components/modal";
import { BoardForm } from "@/components/forms/board-form";

interface Props {
  agencyId: string;
  boardId: string;
  boards: Board[];
}

export const BoardInfo = ({ agencyId, boardId, boards }: Props) => {
  const router = useRouter();
  const modal = useModal();
  const [open, setOpen] = useState(false);

  const currentBoard = boards.find((board) => board.id === boardId);
  if (!currentBoard) return;

  const onBoardSelect = (id: string) => {
    if (currentBoard.id === id) return;
    setOpen(false);
    router.push(`/agency/${agencyId}/kanban/${id}`);
  };

  const handleClickCreateboard = () => {
    setOpen(false);
    modal.onOpen(
      <Modal
        title="Create A board"
        description="boards allows you to group tickets into lanes and track your business processes all in one place."
      >
        <BoardForm agencyId={agencyId} />
      </Modal>
    );
  };

  return (
    <div>
      <div className="flex items-end gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a board"
              className="w-[200px] justify-between"
            >
              {currentBoard.name}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search boards..." />
                <CommandEmpty>No boards found.</CommandEmpty>
                <CommandGroup heading="Boards">
                  {boards.map((board) => (
                    <CommandItem
                      key={board.id}
                      value={board.id}
                      onSelect={() => {
                        setOpen(false);
                        onBoardSelect(board.id);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentBoard.id === board.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {board.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <CommandSeparator />
              <Button
                className="flex gap-2 w-full mt-2"
                onClick={handleClickCreateboard}
              >
                <Plus size={15} />
                Create board
              </Button>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
