"use server";

import { v4 } from "uuid";
import { Prisma, Role } from "@prisma/client";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { AssociateWithUser } from "./types";

export const upsertAgency = async (
  agency: Prisma.AgencyUncheckedCreateInput
) => {
  const self = await getSelf();

  const res = await db.agency.upsert({
    where: {
      id: agency.id || v4(),
    },
    update: agency,
    create: {
      ...agency,
      ownerId: self.id,
      associates: {
        create: [{ userId: self.id, role: Role.AGENCY_OWNER }],
      },
    },
  });

  if (!res.id) throw new Error("Something went wrong!");

  return res;
};

export const deleteAgency = async (id: string) => {
  const res = await db.agency.delete({ where: { id } });
  return res;
};

export const getAllTeamMembers = async (id: string) => {
  const members = await db.associate.findMany({
    where: {
      agencyId: id,
    },
    include: { user: true },
  });

  return members;
};

export const updateAssociatedAccount = async (account: AssociateWithUser) => {
  const res = await db.associate.update({
    where: { id: account.id },
    data: {
      role: account.role,
    },
  });
  return res;
};

export const deleteAssociatedAccount = async (id: string) => {
  const res = await db.associate.delete({
    where: { id },
  });
  return res;
};
