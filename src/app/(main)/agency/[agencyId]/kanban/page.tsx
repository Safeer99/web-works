import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    agencyId: string;
  };
}

const KanbanPage = async ({ params }: Props) => {
  const boardExists = await db.board.findFirst({
    where: { agencyId: params.agencyId },
  });

  if (boardExists) {
    return redirect(`/agency/${params.agencyId}/kanban/${boardExists.id}`);
  }

  try {
    const res = await db.board.create({
      data: {
        name: "Project Progress",
        agencyId: params.agencyId,
      },
    });

    return redirect(`/agency/${params.agencyId}/kanban/${res.id}`);
  } catch (error) {
    throw new Error();
  }
};

export default KanbanPage;
