"use client";

import clsx from "clsx";
import { v4 } from "uuid";

import { useDeleteElement, useUpdateElement } from "@/hooks/use-editor-socket";
import { useEditor } from "@/components/providers/editor";
import {
  EditorBtns,
  EditorElement,
  defaultDetails,
} from "@/components/providers/editor/editor-types";
import { Recursive } from "./recursive";
import { ComponentBadge, ComponentDeleteBadge } from "./component-badge";

interface Props {
  element: EditorElement;
}

export const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { state, dispatch } = useEditor();
  const addElement = useUpdateElement();
  const deleteElement = useDeleteElement();

  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    if (componentType) {
      addElement({
        type: "ADD_ELEMENT",
        payload: {
          containerId: id,
          elementDetails: {
            ...defaultDetails[componentType],
            id: v4(),
          },
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

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const selectedNotLive =
    state.editor.selectedElement.id === id && !state.editor.liveMode;

  return (
    <div
      className={clsx("relative h-full", {
        "!border-blue-500 !border-solid":
          selectedNotLive && state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-2 !border-solid":
          selectedNotLive && state.editor.selectedElement.type === "__body",
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleDragOver}
      onDragStart={(e) => handleDragStart(e, "container")}
      draggable={type !== "__body"}
      onClick={handleOnClickBody}
    >
      <ComponentBadge label={name} visible={selectedNotLive} />
      <div
        style={styles}
        className={clsx("relative transition-all group p-4", {
          "max-w-full w-full": type === "container",
          "h-fit": type === "container",
          "min-h-full h-fit": type === "__body",
        })}
      >
        {Array.isArray(content) &&
          content.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>
      <ComponentDeleteBadge
        onClick={deleteElement}
        visible={
          selectedNotLive && state.editor.selectedElement.type !== "__body"
        }
      />
    </div>
  );
};
