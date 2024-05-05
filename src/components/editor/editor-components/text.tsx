"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useUpdateElement } from "@/hooks/use-editor-socket";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface Props {
  element: EditorElement;
}

export const TextComponent = ({ element }: Props) => {
  const { styles, id, content } = element;

  const { state, dispatch } = useEditor();
  const updateElement = useUpdateElement();

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

  const handleOnChange = (e: ContentEditableEvent) => {
    updateElement({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            innerText: e.target.value,
          },
        },
      },
    });
  };

  if (Array.isArray(content)) return;

  return (
    <ContentEditable
      innerRef={ref}
      tagName="p"
      html={content.innerText || ""}
      disabled={state.editor.previewMode || state.editor.liveMode}
      onClick={handleOnClick}
      onChange={handleOnChange}
      className={clsx("relative transition-all whitespace-pre", {
        "outline-dashed outline-slate-400 outline-[1px]":
          !state.editor.previewMode && !state.editor.liveMode,
      })}
      style={styles}
    />
  );
};
