"use client";

import clsx from "clsx";
import { useCallback } from "react";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useUpdateElement } from "@/hooks/use-editor-socket";
import { useResizeObserver } from "@/hooks/use-resize-observer";

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

export const Container = ({ element }: Props) => {
  const { id, content, styles, type } = element;

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

  return (
    <div
      ref={ref}
      style={styles}
      className={clsx("relative transition-all group box-border", {
        "outline-dashed outline-slate-400 outline-[1px]":
          !state.editor.previewMode && !state.editor.liveMode,
        "max-w-full w-full h-fit": type === "container",
        "min-h-full h-fit border-transparent border-[1px] outline-none":
          type === "__body",
      })}
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleDragOver}
      onDragStart={(e) => handleDragStart(e, "container")}
      draggable={
        type !== "__body" && !state.editor.liveMode && !state.editor.previewMode
      }
      onClick={handleOnClickBody}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};
