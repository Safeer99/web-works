"use server";

import { Canvas, Role } from "@prisma/client";
import { db } from "@/lib/db";
import { getAssociatedAccount } from "@/lib/auth-service";

export const getCanvas = async (id: string) => {
  const res = await db.canvas.findUnique({
    where: { id },
  });
  return res;
};

export const createCanvas = async (agencyId: string) => {
  const currentAccount = await getAssociatedAccount(agencyId);

  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  const res = await db.canvas.create({
    data: {
      agencyId,
      snapshot: `/placeholders/${Math.floor(Math.random() * 4) + 1}.png`,
    },
  });

  return res;
};

export const updateCanvas = async (data: Canvas) => {
  const res = await db.canvas.update({
    where: {
      id: data.id,
    },
    data: data,
  });

  return res;
};

export const deleteCanvas = async (id: string, agencyId: string) => {
  const currentAccount = await getAssociatedAccount(agencyId);

  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  await db.canvas.delete({ where: { id } });
  return;
};
