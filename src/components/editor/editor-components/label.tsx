"use client";

import clsx from "clsx";
import { useCallback } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useUpdateElement } from "@/hooks/use-editor-socket";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import { Label } from "@/components/ui/label";
import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";

interface Props {
  element: EditorElement;
}

export const LabelComponent = ({ element }: Props) => {
  const { styles, id, content } = element;

  const { state, dispatch } = useEditor();
  const updateElement = useUpdateElement();

  const handleOnClick = (e: React.MouseEvent<HTMLLabelElement>) => {
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

  const ref = useResizeObserver<HTMLLabelElement>(handleOnResizeBody);

  const handleOnChange = (e: ContentEditableEvent) => {
    updateElement({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            label: e.target.value,
          },
        },
      },
    });
  };

  if (Array.isArray(content)) return;

  return (
    <Label
      ref={ref}
      htmlFor={content.id}
      style={styles}
      onClick={handleOnClick}
      className={clsx("relative transition-all whitespace-pre", {
        "outline-dashed outline-slate-400 outline-[1px]":
          !state.editor.previewMode && !state.editor.liveMode,
      })}
    >
      <ContentEditable
        tagName="span"
        html={content.label || ""}
        disabled={state.editor.previewMode || state.editor.liveMode}
        onChange={handleOnChange}
      />
    </Label>
  );
};
