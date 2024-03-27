import { Draggable } from "react-beautiful-dnd";
import { ArrowDown, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WorkspacePage } from "@prisma/client";

interface Props {
  workspacePage: WorkspacePage;
  index: number;
  activePage: boolean;
}

export const WorkspaceStepCard = ({
  activePage,
  index,
  workspacePage,
}: Props) => {
  return (
    <Draggable draggableId={workspacePage.id.toString()} index={index}>
      {(provided) => (
        <Card
          className="p-0 relative cursor-grab my-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent className="p-0 flex items-center gap-4 flex-row">
            <div className="h-14 w-14 bg-muted rounded-l flex items-center justify-center">
              <Mail />
              <ArrowDown
                size={18}
                className="absolute -bottom-2 text-primary"
              />
            </div>
            {workspacePage.name}
          </CardContent>
          {activePage && (
            <div className="w-2 top-2 right-2 h-2 absolute bg-emerald-500 rounded-full" />
          )}
        </Card>
      )}
    </Draggable>
  );
};
