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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEditor } from "@/components/providers/editor";
import { DeviceTypes } from "@/components/providers/editor/editor-types";
import { upsertWorkspacePage } from "@/lib/workspace-service";
import { Hint } from "@/components/hint";

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
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 bg-background z-[200] border-b-[1px] flex items-center justify-between py-2 px-4 gap-2 transition-all",
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
          className="w-fit"
          value={state.editor.device}
          onValueChange={(value) => {
            dispatch({
              type: "CHANGE_DEVICE",
              payload: { device: value as DeviceTypes },
            });
          }}
        >
          <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
            <TabsTrigger
              value="Desktop"
              className="w-10 h-10 p-2 data-[state=active]:bg-muted"
            >
              <Hint label="Desktop" sideOffset={15}>
                <Laptop />
              </Hint>
            </TabsTrigger>
            <TabsTrigger
              value="Tablet"
              className="w-10 h-10 p-2 data-[state=active]:bg-muted"
            >
              <Hint label="Tablet" sideOffset={15}>
                <Tablet />
              </Hint>
            </TabsTrigger>
            <TabsTrigger
              value="Mobile"
              className="w-10 h-10 p-2 data-[state=active]:bg-muted"
            >
              <Hint label="Mobile" sideOffset={15}>
                <Smartphone />
              </Hint>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>
      <aside className="flex items-center gap-2">
        <Hint label="Preview">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800"
            onClick={handlePreviewClick}
          >
            <EyeIcon />
          </Button>
        </Hint>
        <Hint label="Undo">
          <Button
            disabled={!(state.history.currentIndex > 0)}
            onClick={handleUndo}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-800"
          >
            <Undo2 />
          </Button>
        </Hint>
        <Hint label="Redo">
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
        </Hint>
        {/* //TODO: ADD participants */}
        {/* <Button onClick={handleOnSave} size="sm">
            Save
          </Button> */}
      </aside>
    </nav>
  );
};
