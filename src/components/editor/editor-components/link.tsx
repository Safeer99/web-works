"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useDeleteElement, useUpdateElement } from "@/hooks/use-editor-socket";
import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";
import { Textarea } from "@/components/ui/textarea";
import { ComponentBadge, ComponentDeleteBadge } from "./component-badge";

interface Props {
  element: EditorElement;
}

export const LinkComponent = ({ element }: Props) => {
  const { styles, name, id, content } = element;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { state, dispatch } = useEditor();
  const updateElement = useUpdateElement();
  const deleteElement = useDeleteElement();

  const value = Array.isArray(content) ? "" : content.innerText;

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
    if (textareaRef.current && value && isEditMode) {
      textareaRef.current.style.fontSize =
        styles.fontSize?.toString() || "16px";
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value, isEditMode, styles.fontSize]);

  if (Array.isArray(content)) return;

  return (
    <div
      className={clsx("relative transition-all", {
        "!border-blue-500 !border-solid":
          state.editor.selectedElement.id === id,
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
          state.editor.selectedElement.id === id && !state.editor.liveMode
        }
      />
      <div style={styles} className="p-[2px] w-full relative text-[16px]">
        {(state.editor.previewMode || state.editor.liveMode || !isEditMode) && (
          <Link href={content.href || "#"} className="whitespace-pre">
            {value}
          </Link>
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
              updateElement({
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
      </div>
      <ComponentDeleteBadge
        onClick={deleteElement}
        visible={
          state.editor.selectedElement.id === id && !state.editor.liveMode
        }
      />
    </div>
  );
};
