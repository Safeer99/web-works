"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useUpdateElement } from "@/hooks/use-editor-socket";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";

interface Props {
  element: EditorElement;
}

export const CheckboxComponent = ({ element }: Props) => {
  const { styles, id, content } = element;

  const [editMode, setEditMode] = useState(false);

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
            label: e.target.value,
          },
        },
      },
    });
  };

  if (Array.isArray(content)) return;

  return (
    <div
      ref={ref}
      style={styles}
      onClick={handleOnClick}
      className={clsx("relative transition-all whitespace-pre", {
        "outline-dashed outline-slate-400 outline-[1px]":
          !state.editor.previewMode && !state.editor.liveMode,
      })}
    >
      <Checkbox id={content.id} required={content.required} />
      <Label
        htmlFor={
          state.editor.previewMode || state.editor.liveMode
            ? content.id
            : undefined
        }
        onDoubleClick={() => {
          setEditMode(true);
        }}
        onBlur={() => {
          setEditMode(false);
        }}
      >
        <ContentEditable
          tagName="span"
          html={content.label || ""}
          onChange={handleOnChange}
          disabled={
            !editMode || state.editor.previewMode || state.editor.liveMode
          }
          className="focus:outline-none"
        />
      </Label>
    </div>
  );
};
