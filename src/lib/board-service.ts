"use server";

import { v4 } from "uuid";
import { Lane, Prisma, Role, Tag, Ticket } from "@prisma/client";
import { db } from "@/lib/db";
import { getAssociatedAccount } from "./auth-service";

export const getBoardDetails = async (boardId: string) => {
  const res = await db.board.findUnique({
    where: { id: boardId },
  });

  return res;
};

export const getLanesWithTicketAndTags = async (boardId: string) => {
  const res = await db.lane.findMany({
    where: {
      boardId,
    },
    orderBy: { order: "asc" },
    include: {
      tickets: {
        orderBy: {
          order: "asc",
        },
        include: {
          tags: true,
          assigned: true,
        },
      },
    },
  });

  return res;
};

export const upsertBoard = async (board: Prisma.BoardUncheckedCreateInput) => {
  const currentAccount = await getAssociatedAccount(board.agencyId);
  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  const res = await db.board.upsert({
    where: { id: board.id || v4() },
    update: board,
    create: board,
  });

  return res;
};

export const deleteBoard = async (id: string, agencyId: string) => {
  const currentAccount = await getAssociatedAccount(agencyId);
  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  const res = await db.board.delete({
    where: { id },
  });
  return res;
};

export const updateLanesOrder = async (lanes: Lane[]) => {
  try {
    const updateTrans = lanes.map((lane) =>
      db.lane.update({
        where: { id: lane.id },
        data: {
          order: lane.order,
        },
      })
    );

    await db.$transaction(updateTrans);
  } catch (error) {
    console.log("ERROR UPDATE LANES ORDER", error);
  }
};

export const updateTicketsOrder = async (tickets: Ticket[]) => {
  try {
    const updateTrans = tickets.map((ticket) =>
      db.ticket.update({
        where: { id: ticket.id },
        data: {
          order: ticket.order,
          laneId: ticket.laneId,
        },
      })
    );

    await db.$transaction(updateTrans);
  } catch (error) {
    console.log("ERROR UPDATE TICKETS ORDER", error);
  }
};

export const upsertLane = async (lane: Prisma.LaneUncheckedCreateInput) => {
  let order: number;

  if (!lane.order) {
    const lanes = await db.lane.findMany({
      where: {
        boardId: lane.boardId,
      },
    });

    order = lanes.length;
  } else {
    order = lane.order;
  }

  const response = await db.lane.upsert({
    where: { id: lane.id || v4() },
    update: lane,
    create: { ...lane, order },
  });

  return response;
};

export const deleteLane = async (laneId: string) => {
  const res = await db.lane.delete({ where: { id: laneId } });
  return res;
};

export const upsertTicket = async (
  ticket: Prisma.TicketUncheckedCreateInput,
  tags: Tag[]
) => {
  let order: number;
  if (!ticket.order) {
    const tickets = await db.ticket.findMany({
      where: {
        laneId: ticket.laneId,
      },
    });
    order = tickets.length;
  } else {
    order = ticket.order;
  }

  const res = await db.ticket.upsert({
    where: {
      id: ticket.id || v4(),
    },
    update: { ...ticket, tags: { set: tags } },
    create: { ...ticket, tags: { connect: tags }, order },
    include: {
      assigned: true,
      tags: true,
      lane: true,
    },
  });

  return res;
};

export const deleteTicket = async (ticketId: string) => {
  const response = await db.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  return response;
};

export const upsertTag = async (
  agencyId: string,
  tag: Prisma.TagUncheckedCreateInput
) => {
  const response = await db.tag.upsert({
    where: { id: tag.id || v4(), agencyId },
    update: tag,
    create: { ...tag, agencyId },
  });

  return response;
};

export const getTagsForAgency = async (agencyId: string) => {
  const response = await db.tag.findMany({
    where: { agencyId },
  });
  return response;
};

export const deleteTag = async (tagId: string) => {
  const response = await db.tag.delete({ where: { id: tagId } });
  return response;
};
