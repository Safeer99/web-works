"use server";

import { v4 } from "uuid";
import { Prisma, Role } from "@prisma/client";
import { db } from "@/lib/db";
import { getAssociatedAccount } from "@/lib/auth-service";

export const upsertWorkspace = async (
  workspace: Prisma.WorkspaceUncheckedCreateInput
) => {
  if (!workspace.id) {
    const currentAccount = await getAssociatedAccount(workspace.agencyId);
    if (currentAccount.role === Role.AGENCY_USER)
      throw new Error("Unauthorized access!!!");
  }

  const res = await db.workspace.upsert({
    where: { id: workspace.id || v4() },
    update: workspace,
    create: workspace,
  });

  return res;
};

export const getWorkspace = async (workspaceId: string) => {
  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    include: {
      workspacePages: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return workspace;
};

export const publishWorkspace = async (id: string, agencyId: string) => {
  const currentAccount = await getAssociatedAccount(agencyId);

  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  const res = await db.workspace.update({
    where: {
      id,
    },
    data: {
      published: true,
    },
  });
  return res;
};

export const unPublishWorkspace = async (id: string, agencyId: string) => {
  const currentAccount = await getAssociatedAccount(agencyId);

  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  const res = await db.workspace.update({
    where: {
      id,
    },
    data: {
      published: false,
    },
  });
  return res;
};

export const deleteWorkspace = async (id: string, agencyId: string) => {
  const currentAccount = await getAssociatedAccount(agencyId);

  if (currentAccount.role === Role.AGENCY_USER)
    throw new Error("Unauthorized access!!!");

  await db.workspace.delete({ where: { id } });
  return;
};

export const getWorkspaceByDomain = async (subDomainName: string) => {
  const res = await db.workspace.findUnique({
    where: {
      subDomainName,
      published: true,
    },
    include: {
      workspacePages: true,
    },
  });

  return res;
};

//! Workspace Pages actions

export const upsertWorkspacePage = async (
  agencyId: string,
  workspacePage: Prisma.WorkspacePageUncheckedCreateInput
) => {
  if (!agencyId || !workspacePage.workspaceId) return;

  const res = await db.workspacePage.upsert({
    where: { id: workspacePage.id || v4() },
    update: workspacePage,
    create: {
      ...workspacePage,
      content: workspacePage.content
        ? workspacePage.content
        : JSON.stringify([
            {
              content: [],
              id: "__body",
              name: "Body",
              styles: { backgroundColor: "white" },
              type: "__body",
            },
          ]),
    },
  });

  return res;
};

export const getWorkspacePageDetails = async (pageId: string) => {
  const res = await db.workspacePage.findUnique({
    where: {
      id: pageId,
    },
    include: {
      workspace: true,
    },
  });

  return res;
};

export const deleteWorkspacePage = async (id: string) => {
  const res = await db.workspacePage.delete({ where: { id } });
  return res;
};
