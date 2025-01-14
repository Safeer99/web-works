"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import { EditorElement } from "@/components/providers/editor/editor-types";
import { useEditor } from "@/components/providers/editor";

interface Props {
  element: EditorElement;
}

export const VideoComponent = ({ element }: Props) => {
  const { id, content, styles } = element;

  const { state, dispatch } = useEditor();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (state.editor.selectedElement.id === id) return;

    const position = targetToXYWH(e.target as HTMLElement);
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: { ...element, position },
      },
    });
  };

  const handleOnResizeBody = useCallback(
    (target: HTMLElement) => {
      if (state.editor.selectedElement.id !== id) return;
      const position = targetToXYWH(target);

      if (compareValues(state.editor.selectedElement.position, position))
        return;

      dispatch({
        type: "CHANGE_CLICKED_ELEMENT",
        payload: {
          elementDetails: { ...element, position },
        },
      });
    },
    [state.editor.selectedElement]
  );

  const ref = useResizeObserver<HTMLDivElement>(handleOnResizeBody);

  return (
    <div
      ref={ref}
      style={styles}
      className={clsx("relative transition-all", {
        "outline-dashed outline-slate-400 outline-[1px]":
          !state.editor.previewMode && !state.editor.liveMode,
      })}
      onClick={handleOnClick}
    >
      {!Array.isArray(content) && (
        <iframe
          aria-disabled={!state.editor.previewMode && !state.editor.liveMode}
          width={"100%"}
          height={"100%"}
          src={content.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
    </div>
  );
};
