"use server";

import { v4 } from "uuid";
import { Prisma, Role } from "@prisma/client";
import { db } from "@/lib/db";
import { getAssociatedAccount, getSelf } from "@/lib/auth-service";
import { AssociateWithUser } from "@/lib/types";

export const upsertAgency = async (
  agency: Prisma.AgencyUncheckedCreateInput
) => {
  const self = await getSelf();

  if (agency.id) {
    const account = await getAssociatedAccount(agency.id);
    if (account.role === Role.AGENCY_USER)
      throw new Error("Unauthorized access!!!");
  }

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

  return res;
};

export const deleteAgency = async (id: string) => {
  const account = await getAssociatedAccount(id);

  if (account.role !== Role.AGENCY_OWNER)
    throw new Error("Unauthorized access!!!");

  return await db.agency.delete({ where: { id } });
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
  const currentAccount = await getAssociatedAccount(account.id);

  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  const res = await db.associate.update({
    where: { id: account.id },
    data: {
      role: account.role,
    },
  });
  return res;
};

export const deleteAssociatedAccount = async (id: string, agencyId: string) => {
  const currentAccount = await getAssociatedAccount(agencyId);

  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  const account = await db.associate.findUnique({ where: { id } });

  if (account && account.role === Role.AGENCY_OWNER) throw new Error("");

  await db.associate.delete({
    where: { id },
  });

  return;
};

export const getStatsCardData = async (id: string) => {
  const data = await db.agency.findUnique({
    where: { id },
    select: {
      _count: {
        select: {
          workspaces: true,
          associates: true,
        },
      },
    },
  });

  const publishedCount = await db.agency.findUnique({
    where: { id },
    select: {
      _count: {
        select: {
          workspaces: {
            where: {
              published: true,
            },
          },
          invitations: {
            where: {
              status: "PENDING",
            },
          },
        },
      },
    },
  });

  return {
    ...data?._count,
    published: publishedCount?._count.workspaces,
    pendingInvitations: publishedCount?._count.invitations,
  };
};
