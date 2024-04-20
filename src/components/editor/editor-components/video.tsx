"use client";
import clsx from "clsx";

import {
  EditorBtns,
  EditorElement,
} from "@/components/providers/editor/editor-types";
import { useEditor } from "@/components/providers/editor";
import { ComponentBadge, ComponentDeleteBadge } from "./component-badge";
import { useDeleteElement } from "@/hooks/use-editor-socket";

type Props = {
  element: EditorElement;
};

export const VideoComponent = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();

  const deleteElement = useDeleteElement();

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      onClick={handleOnClick}
      className={clsx(
        "p-[2px] w-full relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500": state.editor.selectedElement.id === id,
          "!border-solid": state.editor.selectedElement.id === id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      <ComponentBadge
        label={name}
        visible={
          state.editor.selectedElement.id === id && !state.editor.liveMode
        }
      />

      {!Array.isArray(content) && (
        <iframe
          width={styles.width || "560"}
          height={styles.height || "315"}
          src={content.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}

      <ComponentDeleteBadge
        visible={
          state.editor.selectedElement.id === id && !state.editor.liveMode
        }
        onClick={deleteElement}
      />
    </div>
  );
};
