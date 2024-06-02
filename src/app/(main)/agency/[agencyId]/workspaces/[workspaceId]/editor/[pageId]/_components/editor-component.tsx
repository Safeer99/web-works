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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const { state, dispatch } = useEditor();
  const deleteElement = useDeleteElement();

  const position = useMemo(() => {
    if (!ref.current) return state.editor.selectedElement.position;

    return {
      ...state.editor.selectedElement.position,
      x: state.editor.selectedElement.position.x - ref.current.offsetLeft,
      y:
        state.editor.selectedElement.position.y -
        ref.current.offsetTop +
        scrollOffset,
    };
  }, [state.editor.selectedElement]);

  const onScroll = (event: Event) => {
    setScrollOffset((event.target as any).scrollTop || 0);
  };

  useEventListener("scroll", onScroll, scrollRef);

  useEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.editor.previewMode) {
      handlePreview();
    }
  });

  const handlePreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  return (
    <div
      className={clsx(
        "bg-[url(/graph-paper.svg)] dark:bg-muted/40 bg-muted/60 relative flex justify-center h-full pr-[320px] pt-16 use-automation-zoom-in",
        {
          "!p-0 !m-0 !w-full":
            state.editor.previewMode || state.editor.liveMode,
        }
      )}
      onClick={handleClick}
    >
      <div
        ref={ref}
        className={clsx("relative w-full h-auto my-5 mx-4", {
          "!p-0 !m-0 !w-full":
            state.editor.previewMode || state.editor.liveMode,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[420px]": state.editor.device === "Mobile",
          "!w-full": state.editor.device === "Desktop",
        })}
      >
        {!state.editor.previewMode &&
          !state.editor.liveMode &&
          !!state.editor.selectedElement.id && (
            <HelperComponent
              hideTrash={state.editor.selectedElement.type === "__body"}
              label={state.editor.selectedElement.name}
              onDelete={deleteElement}
              position={position}
              scrollOffset={scrollOffset}
            />
          )}
        {state.editor.previewMode && state.editor.liveMode && (
          <Button
            onClick={handlePreview}
            variant="ghost"
            size="icon"
            className="w-6 h-6 bg-muted p-[2px] fixed top-0 left-0 z-[300]"
          >
            <EyeOff />
          </Button>
        )}
        <div ref={scrollRef} className="relative h-full w-full overflow-auto">
          <Editor pageDetails={pageDetails} />
        </div>
      </div>
    </div>
  );
};
