"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Check, ExternalLink, LucideEdit } from "lucide-react";
import { Workspace, WorkspacePage } from "@prisma/client";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { WorkspacePageForm } from "@/components/forms/workspace-page-form";
import { PagePlaceholder } from "@/components/page-placeholder";
import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/use-modals";
import { upsertWorkspacePage } from "@/lib/workspace-service";
import { WorkspaceStepCard } from "./workspace-step-card";

interface Props {
  workspace: Workspace;
  agencyId: string;
  pages: WorkspacePage[];
  workspaceId: string;
}

export const WorkspaceSteps = ({
  agencyId,
  pages,
  workspace,
  workspaceId,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, []);

  const modal = useModal();
  const [pagesState, setPagesState] = useState(pages);
  const [clickedPage, setClickedPage] = useState<WorkspacePage | undefined>(
    pages[0]
  );

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    const newPageOrder = [...pagesState]
      .toSpliced(source.index, 1)
      .toSpliced(destination.index, 0, pagesState[source.index])
      .map((page, i) => {
        return { ...page, order: i };
      });

    setPagesState(newPageOrder);

    newPageOrder.forEach(async (page, index) => {
      try {
        await upsertWorkspacePage(agencyId, workspaceId, {
          pathName: page.pathName,
          id: page.id,
          order: index,
          name: page.name,
        });
      } catch (error) {
        toast.error("Could not save page order");
        return;
      }
    });

    toast.success("Saved page order.");
  };

  if (!mounted) return null;

  return (
    <div className="flex border-[1px] lg:!flex-row flex-col">
      <aside className="flex-[0.3] bg-background p-6  flex flex-col justify-between ">
        <ScrollArea className="h-full ">
          <div className="flex gap-4 pb-3 items-center">
            <Check />
            Workspace Steps
          </div>
          {pagesState.length ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="workspaces"
                direction="vertical"
                key="workspaces"
              >
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {pagesState.map((page, idx) => (
                      <div
                        className="relative"
                        key={page.id}
                        onClick={() => setClickedPage(page)}
                      >
                        <WorkspaceStepCard
                          workspacePage={page}
                          index={idx}
                          key={page.id}
                          activePage={page.id === clickedPage?.id}
                        />
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="text-center text-muted-foreground py-6">
              No Pages
            </div>
          )}
        </ScrollArea>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            modal.onOpen(
              <Modal
                title=" Create or Update a Page"
                description="Workspace Pages allow you to create step by step processes for users to follow"
              >
                <WorkspacePageForm
                  agencyId={agencyId}
                  workspaceId={workspaceId}
                  order={pagesState.length}
                />
              </Modal>
            );
          }}
        >
          Create New Steps
        </Button>
      </aside>
      <aside className="flex-[0.7] bg-muted p-4 ">
        {!!pages.length ? (
          <Card className="h-full flex justify-between flex-col">
            <CardHeader>
              <p className="text-sm text-muted-foreground">Page name</p>
              <CardTitle>{clickedPage?.name}</CardTitle>
              <CardDescription className="flex flex-col gap-4">
                <div className="border-2 rounded-lg sm:w-80 w-full  overflow-clip">
                  <Link
                    href={`/agency/${agencyId}/workspaces/${workspaceId}/editor/${clickedPage?.id}`}
                    className="relative group"
                  >
                    <div className="cursor-pointer group-hover:opacity-30 w-full">
                      <PagePlaceholder />
                    </div>
                    <LucideEdit
                      size={50}
                      className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                    />
                  </Link>

                  <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_SCHEME}${workspace.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${clickedPage?.pathName}`}
                    className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                  >
                    <ExternalLink size={15} />
                    <div className="w-64 overflow-hidden overflow-ellipsis ">
                      {process.env.NEXT_PUBLIC_SCHEME}
                      {workspace.subDomainName}.{process.env.NEXT_PUBLIC_DOMAIN}
                      /{clickedPage?.pathName}
                    </div>
                  </Link>
                </div>
                <WorkspacePageForm
                  defaultData={clickedPage}
                  agencyId={agencyId}
                  workspaceId={workspaceId}
                  order={pagesState.length}
                />
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="h-[600px] flex items-center justify-center text-muted-foreground">
            Create a page to view page settings.
          </div>
        )}
      </aside>
    </div>
  );
};
