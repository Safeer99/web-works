"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";
import { Textarea } from "@/components/ui/textarea";
import { ComponentBadge, ComponentDeleteBadge } from "./component-badge";
import { useDeleteElement } from "@/hooks/use-editor-socket";

interface Props {
  element: EditorElement;
}

export const TextComponent = ({ element }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { state, dispatch } = useEditor();

  const deleteElement = useDeleteElement();

  if (Array.isArray(element.content)) return;

  const { styles, name } = element;
  const value = element.content.innerText;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontSize =
        styles.fontSize?.toString() || "16px";
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current?.scrollHeight + "px";
    }
  }, [value, isEditMode]);

  return (
    <div
      style={styles}
      className={clsx("p-[2px] w-full relative text-[16px] transition-all", {
        "!border-blue-500 !border-solid":
          state.editor.selectedElement.id === element.id,
        "!border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditMode(true);
      }}
      onClick={handleOnClickBody}
    >
      <ComponentBadge
        label={name}
        visible={
          state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode
        }
      />
      {(state.editor.previewMode || state.editor.liveMode || !isEditMode) && (
        <span className="whitespace-pre">{value}</span>
      )}
      {!state.editor.previewMode && !state.editor.liveMode && isEditMode && (
        <Textarea
          ref={textareaRef}
          rows={1}
          className="bg-transparent leading-normal min-h-0 resize-none border-none p-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value || ""}
          onBlur={() => {
            setIsEditMode(false);
          }}
          onChange={(e) => {
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...element,
                  content: {
                    innerText: e.target.value,
                  },
                },
              },
            });
          }}
        />
      )}
      <ComponentDeleteBadge
        onClick={deleteElement}
        visible={
          state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode
        }
      />
    </div>
  );
};
