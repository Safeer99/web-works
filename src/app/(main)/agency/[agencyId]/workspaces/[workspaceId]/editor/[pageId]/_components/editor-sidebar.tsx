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
            "mt-[97px] w-16 z-[100] shadow-none p-0 focus:border-none transition-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[97px] w-80 z-[100] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll scrollbar-hidden">
            <TabsContent className="focus-visible:ring-0" value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent className="focus-visible:ring-0" value="Media">
              <MediaBucketTab agencyId={agencyId} />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};
