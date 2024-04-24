"use client";

import { Flag, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { Board, Lane, Ticket } from "@prisma/client";

import { LaneDetailsType, TicketAndTags } from "@/lib/types";
import { useModal } from "@/hooks/use-modals";

import { Button } from "@/components/ui/button";
import { LaneForm } from "@/components/forms/lane-form";
import { Modal } from "@/components/modal";
import { BoardLane } from "./board-lane";

interface ViewProps {
  lanes: LaneDetailsType[];
  agencyId: string;
  boardId: string;
  boardDetails: Board;
  updateLanesOrder: (lane: Lane[]) => Promise<void>;
  updateTicketsOrder: (tickets: Ticket[]) => Promise<void>;
}

export const BoardView = ({
  lanes,
  agencyId,
  boardId,
  boardDetails,
  updateLanesOrder,
  updateTicketsOrder,
}: ViewProps) => {
  const router = useRouter();
  const onOpen = useModal((state) => state.onOpen);
  const [allLanes, setAllLanes] = useState<LaneDetailsType[]>([]);

  useEffect(() => {
    setAllLanes(lanes);
  }, [lanes]);

  const ticketsFromAllLanes: TicketAndTags[] = [];
  lanes.forEach((lane) => {
    lane.tickets.forEach((ticket) => {
      ticketsFromAllLanes.push(ticket);
    });
  });

  const handleAddLane = () => {
    onOpen(
      <Modal
        title="Create a Lane"
        description="Lanes allow you to group tickets"
      >
        <LaneForm boardId={boardId} />
      </Modal>
    );
  };

  const onDragEnd = (dropResult: DropResult) => {
    console.log(dropResult);
    const { destination, source, type } = dropResult;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    switch (type) {
      case "lane": {
        const newLanes = [...allLanes]
          .toSpliced(source.index, 1)
          .toSpliced(destination.index, 0, allLanes[source.index])
          .map((lane, idx) => {
            return { ...lane, order: idx };
          });

        setAllLanes(newLanes);
        updateLanesOrder(newLanes);
      }

      case "ticket": {
        let newLanes = [...allLanes];
        const originLane = newLanes.find(
          (lane) => lane.id === source.droppableId
        );
        const destinationLane = newLanes.find(
          (lane) => lane.id === destination.droppableId
        );

        if (!originLane || !destinationLane) {
          return;
        }

        if (source.droppableId === destination.droppableId) {
          const newOrderedTickets = [...originLane.tickets]
            .toSpliced(source.index, 1)
            .toSpliced(destination.index, 0, originLane.tickets[source.index])
            .map((item, idx) => {
              return { ...item, order: idx };
            });
          originLane.tickets = newOrderedTickets;
          setAllLanes(newLanes);
          updateTicketsOrder(newOrderedTickets);
          router.refresh();
        } else {
          const [currentTicket] = originLane.tickets.splice(source.index, 1);

          originLane.tickets.forEach((ticket, idx) => {
            ticket.order = idx;
          });

          destinationLane.tickets.splice(destination.index, 0, {
            ...currentTicket,
            laneId: destination.droppableId,
          });

          destinationLane.tickets.forEach((ticket, idx) => {
            ticket.order = idx;
          });
          setAllLanes(newLanes);
          updateTicketsOrder([
            ...destinationLane.tickets,
            ...originLane.tickets,
          ]);
          router.refresh();
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="dark:bg-muted/20 bg-slate-300/30 rounded-xl p-4 use-automation-zoom-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{boardDetails.name}</h1>
          <Button className="flex items-center gap-2" onClick={handleAddLane}>
            <Plus size={18} />
            Create Lane
          </Button>
        </div>
        <Droppable
          key="lanes"
          droppableId="lanes"
          type="lane"
          direction="horizontal"
        >
          {(provided) => (
            <div
              className="flex items-center gap-x-2 overflow-x-scroll custom-scrollbar"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="flex mt-4">
                {allLanes.map((lane, index) => (
                  <BoardLane
                    key={lane.id}
                    agencyId={agencyId}
                    boardId={boardId}
                    index={index}
                    laneDetails={lane}
                    tickets={lane.tickets}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
        {allLanes.length == 0 && (
          <div className="flex items-center justify-center w-full flex-col">
            <div className="opacity-100">
              <Flag
                width="100%"
                height="100%"
                className="text-muted-foreground"
              />
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};
