"use client";

import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import { EyeOff } from "lucide-react";
import { useEventListener } from "usehooks-ts";
import { WorkspacePage } from "@prisma/client";

import { useDeleteElement } from "@/hooks/use-editor-socket";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/editor";
import { useEditor } from "@/components/providers/editor";
import { HelperComponent } from "./helper-component";

interface Props {
  pageDetails: WorkspacePage;
}

export const EditorComponent = ({ pageDetails }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const { state, dispatch } = useEditor();
  const deleteElement = useDeleteElement();

  const position = useMemo(() => {
    return {
      ...state.editor.selectedElement.position,
      y: state.editor.selectedElement.position.y + scrollOffset,
    };
  }, [state.editor.selectedElement]);

  const onScroll = (event: Event) => {
    setScrollOffset((event.target as any).scrollTop || 0);
  };

  useEventListener("scroll", onScroll, ref);

  const handlePreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  useEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.editor.previewMode) {
      handlePreview();
    }
  });

  return (
    <div
      ref={ref}
      className={clsx(
        "bg-[url(/graph-paper.svg)] relative flex justify-center h-full overflow-y-scroll scrollbar-hidden"
      )}
    >
      {!state.editor.previewMode &&
        !state.editor.liveMode &&
        !!state.editor.selectedElement.id && (
          <HelperComponent
            hideTrash={state.editor.selectedElement.type === "__body"}
            label={state.editor.selectedElement.name}
            onDelete={deleteElement}
            position={position}
          />
        )}
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          onClick={handlePreview}
          variant="ghost"
          size="icon"
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[300]"
        >
          <EyeOff />
        </Button>
      )}
      <Editor pageDetails={pageDetails} />
    </div>
  );
};
