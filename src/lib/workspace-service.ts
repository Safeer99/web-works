"use server";

import * as z from "zod";
import { WorkspaceFormSchema } from "./types";
import { db } from "./db";
import { getSelf } from "./auth-service";

interface UpsertWorkspaceProps {
  agencyId: string;
  workspace: z.infer<typeof WorkspaceFormSchema>;
  workspaceId: string;
}

export const upsertWorkspace = async ({
  agencyId,
  workspace,
  workspaceId,
}: UpsertWorkspaceProps) => {
  const res = await db.workspace.upsert({
    where: { id: workspaceId },
    update: workspace,
    create: {
      ...workspace,
      id: workspaceId,
      agencyId,
    },
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

interface UpsertPageProps {
  id: string;
  name: string;
  order: number;
  pathName?: string;
  content?: string | null;
  previewImage?: string | null;
}

export const upsertWorkspacePage = async (
  agencyId: string,
  workspaceId: string,
  workspacePage: UpsertPageProps
) => {
  if (!agencyId || !workspaceId) return;

  const res = await db.workspacePage.upsert({
    where: { id: workspacePage.id },
    update: { ...workspacePage },
    create: {
      ...workspacePage,
      workspaceId,
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
  });

  return res;
};

export const deleteWorkspacePage = async (id: string) => {
  const res = await db.workspacePage.delete({ where: { id } });
  return res;
};
