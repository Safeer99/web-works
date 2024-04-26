"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Edit, MoreVertical, PlusCircleIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { LaneDetailsType, TicketAndTags } from "@/lib/types";
import { deleteLane } from "@/lib/board-service";
import { useModal } from "@/hooks/use-modals";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LaneForm } from "@/components/forms/lane-form";
import { TicketForm } from "@/components/forms/ticket-form";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { Modal } from "@/components/modal";
import { BoardTicket } from "./board-ticket";

interface BoardLaneProps {
  tickets: TicketAndTags[];
  laneDetails: LaneDetailsType;
  boardId: string;
  agencyId: string;
  index: number;
}

export const BoardLane = ({
  tickets,
  laneDetails,
  index,
  boardId,
  agencyId,
}: BoardLaneProps) => {
  const onOpen = useModal((state) => state.onOpen);
  const router = useRouter();

  const randomColor = `#${Math.random().toString(16).slice(2, 8)}`;

  const handleCreateTicket = () => {
    onOpen(
      <Modal
        title="Create A Ticket"
        description="Tickets are a great way to keep track of tasks"
      >
        <TicketForm laneId={laneDetails.id} agencyId={agencyId} />
      </Modal>
    );
  };

  const handleEditLane = () => {
    onOpen(
      <Modal title="Edit Lane Details" description="">
        <LaneForm boardId={boardId} defaultData={laneDetails} />
      </Modal>
    );
  };

  const handleDeleteLane = async () => {
    try {
      const response = await deleteLane(laneDetails.id);
      toast.success("Lane deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Could not delete lane!");
      console.log(error);
    }
  };

  return (
    <Draggable
      draggableId={laneDetails.id.toString()}
      index={index}
      key={laneDetails.id}
    >
      {(provided) => {
        return (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <CustomAlertDialog
              onConfirm={handleDeleteLane}
              description="This action cannot be undone. This will permanently delete
                      the lane and remove it from our servers."
            >
              <DropdownMenu>
                <div className="dark:bg-background/20 bg-slate-300/20 min-h-[600px] h-full w-[300px] px-4 pb-4 relative rounded-lg overflow-visible flex-shrink-0">
                  <div
                    {...provided.dragHandleProps}
                    className="h-14 backdrop-blur-lg dark:bg-background/40 bg-slate-300/40 absolute top-0 left-0 right-0 z-10"
                  >
                    <div className="h-full flex items-center p-4 justify-between cursor-grab border-b-[1px]">
                      <div className="flex items-center w-full gap-2">
                        <div
                          className={cn("w-4 h-4 rounded-full")}
                          style={{ background: randomColor }}
                        />
                        <span className="font-bold text-sm">
                          {laneDetails.name}
                        </span>
                      </div>
                      <div className="flex items-center flex-row">
                        <DropdownMenuTrigger>
                          <MoreVertical className="text-muted-foreground cursor-pointer" />
                        </DropdownMenuTrigger>
                      </div>
                    </div>
                  </div>

                  <Droppable
                    droppableId={laneDetails.id.toString()}
                    key={laneDetails.id}
                    type="ticket"
                  >
                    {(provided) => (
                      <div className="pt-12">
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="mt-2"
                        >
                          {tickets.map((ticket, index) => (
                            <BoardTicket
                              agencyId={agencyId}
                              ticket={ticket}
                              key={ticket.id.toString()}
                              index={index}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Trash size={15} />
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={handleEditLane}
                    >
                      <Edit size={15} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={handleCreateTicket}
                    >
                      <PlusCircleIcon size={15} />
                      Create Ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            </CustomAlertDialog>
          </div>
        );
      }}
    </Draggable>
  );
};
