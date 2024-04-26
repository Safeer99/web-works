import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getBoardDetails,
  getLanesWithTicketAndTags,
  updateLanesOrder,
  updateTicketsOrder,
} from "@/lib/board-service";
import { db } from "@/lib/db";
import { LaneDetailsType } from "@/lib/types";
import { BoardInfo } from "./_components/board-info";
import { BoardSettings } from "./_components/board-settings";
import { BoardView } from "./_components/board-view";

interface Props {
  params: {
    agencyId: string;
    boardId: string;
  };
}

const KanbanIdPage = async ({ params }: Props) => {
  const boardDetails = await getBoardDetails(params.boardId);

  if (!boardDetails) {
    return redirect(`/agency/${params.agencyId}/kanban`);
  }

  const boards = await db.board.findMany({
    where: { agencyId: params.agencyId },
  });

  const lanes = (await getLanesWithTicketAndTags(
    params.boardId
  )) as LaneDetailsType[];

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="bg-transparent rounded-none border-b-2 h-16 w-full justify-between mb-4">
        <BoardInfo
          agencyId={params.agencyId}
          boardId={params.boardId}
          boards={boards}
        />
        <div>
          <TabsTrigger value="view">Board View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="view">
        <BoardView
          agencyId={params.agencyId}
          boardId={params.boardId}
          boardDetails={boardDetails}
          lanes={lanes}
          updateLanesOrder={updateLanesOrder}
          updateTicketsOrder={updateTicketsOrder}
        />
      </TabsContent>
      <TabsContent value="settings">
        <BoardSettings
          agencyId={params.agencyId}
          boardId={params.boardId}
          boards={boards}
        />
      </TabsContent>
    </Tabs>
  );
};

export default KanbanIdPage;
