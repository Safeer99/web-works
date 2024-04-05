"use client";

import clsx from "clsx";
import Link from "next/link";
import {
  ArrowLeftCircle,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FocusEventHandler, useEffect } from "react";
import { WorkspacePage } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEditor } from "@/components/providers/editor";
import { DeviceTypes } from "@/components/providers/editor/editor-types";
import { upsertWorkspacePage } from "@/lib/workspace-service";

interface Props {
  agencyId: string;
  workspaceId: string;
  pageDetails: WorkspacePage;
}

export const EditorNavigation = ({
  agencyId,
  pageDetails,
  workspaceId,
}: Props) => {
  const router = useRouter();
  const { state, dispatch } = useEditor();

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_ID",
      payload: {
        pageId: pageDetails.id,
      },
    });
  }, [pageDetails]);

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.value === pageDetails.name) return;
    if (event.target.value) {
      await upsertWorkspacePage(agencyId, workspaceId, {
        id: pageDetails.id,
        name: event.target.value,
        order: pageDetails.order,
      });
      toast.success("Saved Page title");
      router.refresh();
    } else {
      toast.error("You need to have a title!");
      event.target.value = pageDetails.name;
    }
  };

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements);
    try {
      await upsertWorkspacePage(agencyId, workspaceId, {
        ...pageDetails,
        content,
      });
      toast.success("Saved");
    } catch (error) {
      toast.error("Could not save!");
    }
  };

  return (
    <TooltipProvider>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 bg-background z-[999] border-b-[1px] flex items-center justify-between py-2 px-4 gap-2 transition-all",
          { "!h-0 !p-0 !overflow-hidden": state.editor.previewMode }
        )}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <Link href={`/agency/${agencyId}/workspaces/${workspaceId}`}>
            <ArrowLeftCircle />
          </Link>
          <div className="flex flex-col gap-1 w-full ">
            <Input
              defaultValue={pageDetails.name}
              className="border-none h-5 m-0 p-0 text-base rounded-none focus-visible:ring-0"
              onBlur={handleOnBlurTitleChange}
            />
            <span className="text-xs text-muted-foreground">
              Path: /{pageDetails.pathName}
            </span>
          </div>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit "
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: "CHANGE_DEVICE",
                payload: { device: value as DeviceTypes },
              });
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    asChild
                    value="Desktop"
                    className="data-[state=active]:bg-muted w-10 h-10 p-2"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>Desktop</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    asChild
                    value="Tablet"
                    className="w-10 h-10 p-2 data-[state=active]:bg-muted"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>Tablet</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    asChild
                    value="Mobile"
                    className="w-10 h-10 p-2 data-[state=active]:bg-muted"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>Mobile</TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800"
            onClick={handlePreviewClick}
          >
            <EyeIcon />
          </Button>
          <Button
            disabled={!(state.history.currentIndex > 0)}
            onClick={handleUndo}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800"
          >
            <Undo2 />
          </Button>
          <Button
            disabled={
              !(state.history.currentIndex < state.history.history.length - 1)
            }
            onClick={handleRedo}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800 mr-4"
          >
            <Redo2 />
          </Button>

          {/* <div className="flex flex-col gap-1 item-center mr-4">
            <div className="flex flex-row items-center gap-2 text-sm">
              Draft
              <Switch disabled defaultChecked={true} className="scale-90" />
              Publish
            </div>
            <span className="text-muted-foreground text-xs">
              Last updated: {pageDetails.updatedAt.toLocaleDateString()}
            </span>
          </div> */}

          <Button onClick={handleOnSave} size="sm">
            Save
          </Button>
        </aside>
      </nav>
    </TooltipProvider>
  );
};
