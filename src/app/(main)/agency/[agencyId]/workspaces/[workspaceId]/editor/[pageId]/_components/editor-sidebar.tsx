"use client";

import clsx from "clsx";
import { EyeIcon, Redo2, Undo2 } from "lucide-react";

import { useRedo, useUndo } from "@/hooks/use-editor-socket";
import { useEditor } from "@/components/providers/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

import { TabList } from "./sidebar-tabs";
import { StylesTab } from "./sidebar-tabs/styles-tab";
import { SettingsTab } from "./sidebar-tabs/settings-tab";
import { MediaBucketTab } from "./sidebar-tabs/media-bucket-tab";
import { ComponentsTab } from "./sidebar-tabs/components-tab";
import { LayersTab } from "./sidebar-tabs/layers-tab";

interface Props {
  agencyId: string;
}

export const EditorSidebar = ({ agencyId }: Props) => {
  const { state, dispatch } = useEditor();
  const redo = useRedo();
  const undo = useUndo();

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  return (
    <Tabs className="w-full" defaultValue="Components">
      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-[190] mt-[65px] flex bg-background transition-all overflow-hidden",
          { "!-right-80": state.editor.previewMode }
        )}
      >
        <aside className="w-64 border-l-[1px]">
          <div className="gap-4 h-full pb-24 overflow-scroll scrollbar-hidden">
            <TabsContent className="m-0" value="Settings">
              <Tabs defaultValue="style">
                <TabsList className="sticky inset-x-0 top-0 z-[250] w-full justify-start bg-background space-x-6 p-4 h-12 border-b-[1px] border-muted">
                  <TabsTrigger
                    className="data-[state=active]:border-primary border-transparent border-b-2 rounded-none px-0  transition-all"
                    value="style"
                  >
                    Style
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:border-primary border-transparent border-b-2 rounded-none px-0  transition-all"
                    value="settings"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
                {state.editor.selectedElement.id ? (
                  <>
                    <TabsContent value="style">
                      <StylesTab />
                    </TabsContent>
                    <TabsContent value="settings">
                      <SettingsTab />
                    </TabsContent>
                  </>
                ) : (
                  <div className="p-6 mt-40 text-center text-sm text-muted-foreground">
                    Select a component to customize it.
                  </div>
                )}
              </Tabs>
            </TabsContent>

            <TabsContent value="Media">
              <MediaBucketTab agencyId={agencyId} />
            </TabsContent>

            <TabsContent value="Layers">
              {Array.isArray(state.editor.elements[0].content) &&
              state.editor.elements[0].content.length > 0 ? (
                <LayersTab elements={state.editor.elements[0].content} />
              ) : (
                <div className="text-muted-foreground text-sm text-center mt-40 p-4">
                  No components to show.
                </div>
              )}
            </TabsContent>

            <TabsContent value="Components">
              <div className="text-left px-4 py-1">
                <h5 className="text-sm py-2">Components</h5>
                <p className="text-xs text-muted-foreground">
                  You can drag and drop components on the canvas.
                </p>
              </div>
              <ComponentsTab />
            </TabsContent>
          </div>
        </aside>
        <aside className="w-16 border-l-[1px] flex flex-col justify-between items-center pb-4">
          <TabList />
          <div className="flex flex-col items-center gap-2">
            <Hint label="Preview" side="left" sideOffset={8}>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-slate-800"
                onClick={handlePreviewClick}
              >
                <EyeIcon />
              </Button>
            </Hint>
            <Hint label="Undo" side="left" sideOffset={8}>
              <Button
                disabled={!(state.history.currentIndex > 0)}
                onClick={undo}
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-slate-800"
              >
                <Undo2 />
              </Button>
            </Hint>
            <Hint label="Redo" side="left" sideOffset={8}>
              <Button
                disabled={
                  !(
                    state.history.currentIndex <
                    state.history.history.length - 1
                  )
                }
                onClick={redo}
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-slate-800"
              >
                <Redo2 />
              </Button>
            </Hint>
          </div>
        </aside>
      </div>
    </Tabs>
  );
};
