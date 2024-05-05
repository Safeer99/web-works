"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback } from "react";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import { EditorElement } from "@/components/providers/editor/editor-types";
import { useEditor } from "@/components/providers/editor";

interface Props {
  element: EditorElement;
}

export const ImageComponent = ({ element }: Props) => {
  const { id, content, styles, name } = element;
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

  if (Array.isArray(content)) return;

  return (
    <div
      ref={ref}
      className={clsx("relative transition-all", {
        "outline-dashed outline-slate-400 outline-[1px]":
          !state.editor.previewMode && !state.editor.liveMode,
      })}
      onClick={handleOnClick}
    >
      <Image
        style={styles}
        alt={name}
        width={400}
        height={230}
        src={content.src || "/image-placeholder.png"}
      />
    </div>
  );
};
