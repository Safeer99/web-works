"use client";

import clsx from "clsx";
import { useEditor } from "@/components/providers/editor";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { TabList } from "./sidebar-tabs";
import { SettingsTab } from "./sidebar-tabs/settings-tab";
import { MediaBucketTab } from "./sidebar-tabs/media-bucket-tab";
import { ComponentsTab } from "./sidebar-tabs/components-tab";
import { LayersTab } from "./sidebar-tabs/layers-tab";

interface Props {
  agencyId: string;
}

export const EditorSidebar = ({ agencyId }: Props) => {
  const { state } = useEditor();

  return (
    <Tabs className="w-full" defaultValue="Settings">
      <div
        className={clsx(
          "fixed inset-y-0 right-0 mt-[65px] flex bg-background transition-all overflow-hidden",
          { "!-right-80": state.editor.previewMode }
        )}
      >
        <div className="w-64 border-l-[1px]">
          <div className="gap-4 h-full pb-24 overflow-scroll scrollbar-hidden">
            <TabsContent value="Settings">
              <div className="text-left px-4 py-1">
                <h5 className="text-sm py-2">Styles</h5>
                <p className="text-xs text-muted-foreground">
                  Show your creativity! You can customize every component as you
                  like.
                </p>
              </div>
              {state.editor.selectedElement.id ? (
                <SettingsTab />
              ) : (
                <div className="w-full p-4 mt-20 grid place-items-center text-center text-sm text-muted-foreground">
                  Select a component on canvas to customize it.
                </div>
              )}
            </TabsContent>

            <TabsContent value="Media">
              <MediaBucketTab agencyId={agencyId} />
            </TabsContent>

            <TabsContent value="Layers">
              <LayersTab elements={state.editor.elements} />
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
        </div>
        <div className="w-16 border-l-[1px]">
          <TabList />
        </div>
      </div>
    </Tabs>
  );
};
