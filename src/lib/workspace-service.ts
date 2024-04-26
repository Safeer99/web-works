"use server";

import { v4 } from "uuid";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

export const upsertWorkspace = async (
  workspace: Prisma.WorkspaceUncheckedCreateInput
) => {
  const res = await db.workspace.upsert({
    where: { id: workspace.id || v4() },
    update: workspace,
    create: workspace,
  });

  if (!res.id) throw new Error("Something went wrong!");

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

export const publishWorkspace = async (id: string) => {
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

export const unPublishWorkspace = async (id: string) => {
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

export const deleteWorkspace = async (id: string) => {
  const res = await db.workspace.delete({ where: { id } });
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
