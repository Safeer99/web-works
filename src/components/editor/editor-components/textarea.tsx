"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import { Textarea } from "@/components/ui/textarea";
import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";

interface Props {
  element: EditorElement;
}

export const TextAreaComponent = ({ element }: Props) => {
  const { styles, id, content } = element;

  const { state, dispatch } = useEditor();
  const handleOnClick = (e: React.MouseEvent) => {
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

  const ref = useResizeObserver<HTMLTextAreaElement>(handleOnResizeBody);

  if (Array.isArray(content)) return;

  return (
    <Textarea
      ref={ref}
      id={content.id}
      style={styles}
      onClick={handleOnClick}
      placeholder={content.placeholder}
      className={clsx(
        "relative focus:border-2 focus:border-primary bg-transparent outline-none focus-visible:ring-offset-0 focus-visible:ring-0 text-black",
        {
          "outline-dashed outline-slate-400 outline-[1px]":
            !state.editor.previewMode && !state.editor.liveMode,
        }
      )}
    />
  );
};
