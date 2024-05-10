"use server";

import { db } from "./db";

export const getCanvas = async (id: string) => {
  const res = await db.canvas.findUnique({
    where: { id },
  });
  return res;
};

export const createCanvas = async (agencyId: string) => {
  const res = await db.canvas.create({
    data: {
      agencyId,
      snapshot: `/placeholders/${Math.floor(Math.random() * 4) + 1}.png`,
    },
  });

  return res;
};

export const updateCanvas = async (id: string, title: string) => {
  const res = await db.canvas.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  return res;
};

export const deleteCanvas = async (id: string) => {
  const res = await db.canvas.delete({ where: { id } });
  return res;
};
