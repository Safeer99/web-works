"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { useUpdateElement } from "@/hooks/use-editor-socket";

import { useEditor } from "@/components/providers/editor";
import { getElementDetails } from "@/components/providers/editor/editor-default-data";
import {
  EditorBtns,
  EditorElement,
} from "@/components/providers/editor/editor-types";
import { Recursive } from "./recursive";

interface Props {
  element: EditorElement;
}

export const FormComponent = ({ element }: Props) => {
  const { id, content, styles } = element;

  const { state, dispatch } = useEditor();
  const addElement = useUpdateElement();

  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    if (componentType) {
      addElement({
        type: "ADD_ELEMENT",
        payload: {
          containerId: id,
          elementDetails: getElementDetails(componentType),
        },
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!state.editor.liveMode && !state.editor.previewMode) return;

    try {
      console.log({ target: event.target });
    } catch (error) {}
  };

  return (
    <div
      ref={ref}
      style={styles}
      className={clsx("relative transition-all", {
        "outline-dashed outline-slate-400 outline-[1px]":
          !state.editor.previewMode && !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleDragOver}
      onDragStart={(e) => handleDragStart(e, "form")}
      draggable={!state.editor.liveMode && !state.editor.previewMode}
      onClick={handleOnClickBody}
    >
      <form onSubmit={handleFormSubmit}>
        {Array.isArray(content) &&
          content.map((element) => (
            <Recursive key={element.id} element={element} />
          ))}
      </form>
    </div>
  );
};
