"use client";
import clsx from "clsx";

import { useDeleteElement } from "@/hooks/use-editor-socket";
import { EditorElement } from "@/components/providers/editor/editor-types";
import { useEditor } from "@/components/providers/editor";
import { ComponentBadge, ComponentDeleteBadge } from "./component-badge";
import Image from "next/image";

type Props = {
  element: EditorElement;
};

export const ImageComponent = ({ element }: Props) => {
  const { id, content, name, styles } = element;
  const { dispatch, state } = useEditor();

  const deleteElement = useDeleteElement();

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
      className={clsx("relative transition-all", {
        "!border-blue-500": state.editor.selectedElement.id === id,
        "!border-solid": state.editor.selectedElement.id === id,
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onClick={handleOnClick}
    >
      <ComponentBadge
        label={name}
        visible={
          state.editor.selectedElement.id === id && !state.editor.liveMode
        }
      />
      <div
        style={styles}
        className="p-4 aspect-video relative flex items-center justify-center"
      >
        {!Array.isArray(content) && (
          <Image
            alt={name}
            width={Number(styles.width) || 100}
            height={Number(styles.height) || 100}
            src={content.src || "/canvas-placeholder.png"}
          />
        )}
      </div>
      <ComponentDeleteBadge
        visible={
          state.editor.selectedElement.id === id && !state.editor.liveMode
        }
        onClick={deleteElement}
      />
    </div>
  );
};
