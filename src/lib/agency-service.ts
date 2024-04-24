"use server";

import * as z from "zod";
import { Role } from "@prisma/client";

import { db } from "@/lib/db";
import { AgencyFormSchema } from "@/lib/types";
import { getSelf } from "@/lib/auth-service";

interface UpsertAgencyProps {
  agencyId: string;
  values: z.infer<typeof AgencyFormSchema>;
}

export const upsertAgency = async ({ agencyId, values }: UpsertAgencyProps) => {
  const self = await getSelf();

  const agency = await db.agency.upsert({
    where: {
      id: agencyId,
    },
    update: values,
    create: {
      id: agencyId,
      ownerId: self.id,
      ...values,
      associates: {
        create: [{ userId: self.id, role: Role.AGENCY_OWNER }],
      },
    },
  });

  if (!agency.id) throw new Error("Something went wrong!");

  return agency;
};

export const deleteAgency = async (id: string) => {};

export const getAllTeamMembers = async (id: string) => {
  const members = await db.associate.findMany({
    where: {
      agencyId: id,
    },
    include: { user: true },
  });

  return members;
};

export const deleteAssociatedAccount = async (id: string) => {
  const res = await db.associate.delete({
    where: { id },
  });
  return res;
};
