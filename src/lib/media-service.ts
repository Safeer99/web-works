"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { mediaFormSchema } from "@/lib/types";

export const createMedia = async (
  agencyId: string,
  values: z.infer<typeof mediaFormSchema>
) => {
  const res = await db.media.create({
    data: {
      agencyId,
      ...values,
    },
  });

  return res;
};

export const getMedia = async (agencyId: string) => {
  const files = await db.agency.findUnique({
    where: { id: agencyId },
    include: { media: true },
  });

  return files;
};

export const deleteMedia = async (id: string) => {
  const res = await db.media.delete({ where: { id } });
  return res;
};
