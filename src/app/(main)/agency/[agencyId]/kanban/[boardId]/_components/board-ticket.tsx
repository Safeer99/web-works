import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  CalendarDays,
  Edit,
  MoreHorizontalIcon,
  Trash,
  User2,
} from "lucide-react";
import { format } from "date-fns";
import { Draggable } from "@hello-pangea/dnd";

import { useModal } from "@/hooks/use-modals";
import { TicketAndTags } from "@/lib/types";
import { deleteTicket } from "@/lib/board-service";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { Modal } from "@/components/modal";
import { TagComponent } from "@/components/tag";

interface TicketProps {
  ticket: TicketAndTags;
  agencyId: string;
  index: number;
}

export const BoardTicket = ({ ticket, index, agencyId }: TicketProps) => {
  const router = useRouter();
  const onOpen = useModal((state) => state.onOpen);

  const date = new Date();

  const today = ticket.due ? date.getDate() === ticket.due.getDate() : false;
  const tomorrow = ticket.due
    ? date.getDate() + 1 === ticket.due.getDate()
    : false;
  const overdue =
    !tomorrow && !today && ticket.due
      ? date.getDate() > ticket.due.getDate() ||
        date.getMonth() >= ticket.due.getMonth()
      : false;

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
            <CustomAlertDialog
              onConfirm={handleDeleteTicket}
              description="This action cannot be undone. This will permanently delete
                      the ticket and remove it from our servers."
            >
              <DropdownMenu>
                <Card className="overflow-hidden my-4 dark:bg-slate-950 bg-card shadow-md transition-all">
                  {(today || tomorrow || overdue) && (
                    <div className="py-2 px-3 bg-[#ffeccf] text-orange-500 text-sm flex items-center gap-2">
                      <CalendarClock className="size-4" />
                      {today && "Due today"}
                      {tomorrow && "Due tomorrow"}
                      {overdue && "Overdue"}
                    </div>
                  )}
                  <CardHeader className="p-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg w-full">{ticket.name}</span>
                      <DropdownMenuTrigger>
                        <MoreHorizontalIcon className="text-muted-foreground" />
                      </DropdownMenuTrigger>
                    </CardTitle>
                    <span className="text-muted-foreground text-xs">
                      {format(ticket.createdAt, "dd MMM yyyy")}
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
                    {ticket.due && (
                      <span className="text-orange-400 text-xs flex items-center gap-1">
                        <CalendarDays size={15} />
                        {format(ticket.due, "PP")}
                      </span>
                    )}
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
              </DropdownMenu>
            </CustomAlertDialog>
          </div>
        );
      }}
    </Draggable>
  );
};
