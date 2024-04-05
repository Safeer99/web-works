"use client";

import clsx from "clsx";
import { useEditor } from "@/components/providers/editor";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabList } from "./sidebar-tabs";
import { SettingsTab } from "./sidebar-tabs/settings-tab";
import { MediaBucketTab } from "./sidebar-tabs/media-bucket-tab";
import { ComponentsTab } from "./sidebar-tabs/components-tab";

interface Props {
  agencyId: string;
}

export const EditorSidebar = ({ agencyId }: Props) => {
  const { state } = useEditor();

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Settings">
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[65px] w-16 z-[150] shadow-none p-0 focus:border-none transition-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[65px] w-64 z-[140] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="gap-4 h-full pb-24 overflow-scroll scrollbar-hidden">
            <TabsContent className="focus-visible:ring-0" value="Settings">
              <SheetHeader className="text-left px-4 py-1">
                <SheetTitle className="text-sm">Styles</SheetTitle>
                <SheetDescription className="text-xs">
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>

            <TabsContent className="focus-visible:ring-0" value="Media">
              <MediaBucketTab agencyId={agencyId} />
            </TabsContent>

            <TabsContent className="focus-visible:ring-0" value="Components">
              <SheetHeader className="text-left px-4 py-1">
                <SheetTitle className="text-sm">Components</SheetTitle>
                <SheetDescription className="text-xs">
                  You can drag and drop components on the canvas.
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};
