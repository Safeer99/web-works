"use client";

import clsx from "clsx";
import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Props {
  element: EditorElement;
}

export const LinkComponent = ({ element }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { state, dispatch } = useEditor();

  if (Array.isArray(element.content)) return;

  const styles = element.styles;
  const value = element.content.innerText;

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: element },
    });
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
      className={clsx(
        "p-[2px] m-[5px] w-full relative text-[16px] transition-all",
        {
          "!border-blue-500 !border-solid":
            state.editor.selectedElement.id === element.id,
          "!border-dashed border-[1px] border-slate-300":
            !state.editor.liveMode,
        }
      )}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditMode(true);
      }}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      {(state.editor.previewMode || state.editor.liveMode || !isEditMode) && (
        <Link href={element.content.href || "#"} className="whitespace-pre">
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
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-red-600 px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};
