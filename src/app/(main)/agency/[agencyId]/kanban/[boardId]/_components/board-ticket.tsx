import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Draggable } from "@hello-pangea/dnd";
import { Edit, MoreHorizontalIcon, Trash, User2 } from "lucide-react";

import { useModal } from "@/hooks/use-modals";
import { TicketAndTags } from "@/lib/types";
import { deleteTicket } from "@/lib/board-service";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TicketForm } from "@/components/forms/ticket-form";
import { Modal } from "@/components/modal";
import { TagComponent } from "@/components/tag";
import { format } from "date-fns";

interface TicketProps {
  ticket: TicketAndTags;
  agencyId: string;
  index: number;
}

export const BoardTicket = ({ ticket, index, agencyId }: TicketProps) => {
  const router = useRouter();
  const onOpen = useModal((state) => state.onOpen);

  const handleClickEdit = async () => {
    onOpen(
      <Modal title="Update Ticket Details" description="">
        <TicketForm
          laneId={ticket.laneId}
          agencyId={agencyId}
          defaultData={ticket}
        />
      </Modal>
    );
  };

  const handleDeleteTicket = async () => {
    try {
      const response = await deleteTicket(ticket.id);
      toast.success("Ticket deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Could not delete the ticket!");
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={ticket.id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <AlertDialog>
              <DropdownMenu>
                <Card className="my-4 dark:bg-slate-900 bg-slate-100 shadow-none transition-all">
                  <CardHeader className="p-[12px]">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg w-full">{ticket.name}</span>
                      <DropdownMenuTrigger>
                        <MoreHorizontalIcon className="text-muted-foreground" />
                      </DropdownMenuTrigger>
                    </CardTitle>
                    <span className="text-muted-foreground text-xs">
                      {format(ticket.updatedAt, "dd MMM yyyy")}
                    </span>
                    <div className="flex items-center flex-wrap gap-2">
                      {ticket.tags.map((tag) => (
                        <TagComponent
                          key={tag.id}
                          title={tag.name}
                          colorName={tag.color}
                        />
                      ))}
                    </div>
                    <CardDescription className="w-full">
                      {ticket.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="m-0 p-2 border-t-[1px] border-muted-foreground/20 flex items-center justify-between">
                    <div className="flex item-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          alt="contact"
                          src={ticket.assigned?.imageUrl}
                        />
                        <AvatarFallback className="bg-primary text-sm text-white">
                          {ticket.assigned?.name}
                          {!ticket.assignedUserId && <User2 size={14} />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm text-muted-foreground">
                          {ticket.assignedUserId
                            ? "Assigned to"
                            : "Not Assigned"}
                        </span>
                        {ticket.assignedUserId && (
                          <span className="text-xs w-28  overflow-ellipsis overflow-hidden whitespace-nowrap text-muted-foreground">
                            {ticket.assigned?.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardFooter>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Trash size={15} />
                        Delete Ticket
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={handleClickEdit}
                    >
                      <Edit size={15} />
                      Edit Ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </Card>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the ticket and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={handleDeleteTicket}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </DropdownMenu>
            </AlertDialog>
          </div>
        );
      }}
    </Draggable>
  );
};