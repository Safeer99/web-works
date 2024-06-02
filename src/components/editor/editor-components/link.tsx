"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useUpdateElement } from "@/hooks/use-editor-socket";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";

interface Props {
  element: EditorElement;
}

export const LinkComponent = ({ element }: Props) => {
  const { styles, id, content } = element;

  const [editMode, setEditMode] = useState(false);

  const { state, dispatch } = useEditor();
  const updateElement = useUpdateElement();

  const handleOnClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
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

  const ref = useResizeObserver<HTMLParagraphElement>(handleOnResizeBody);

  const handleOnChange = (e: ContentEditableEvent) => {
    updateElement({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            innerText: e.target.value,
          },
        },
      },
    });
  };

  if (Array.isArray(content)) return;

  const containsHttps = content.href?.includes("https://");

  const link = containsHttps ? content.href : `https://${content.href}`;

  return (
    <>
      {state.editor.previewMode || state.editor.liveMode ? (
        <Link target="_blank" href={link || "#"}>
          <p className="relative text-wrap whitespace-pre" style={styles}>
            {content.innerText}
          </p>
        </Link>
      ) : (
        <p
          ref={ref}
          style={styles}
          onClick={handleOnClick}
          onDoubleClick={() => {
            setEditMode(true);
          }}
          onBlur={() => {
            setEditMode(false);
          }}
          className={clsx(
            "relative text-wrap transition-all whitespace-pre",
            {
              "outline-dashed outline-slate-400 outline-[1px] cursor-auto":
                !state.editor.previewMode && !state.editor.liveMode,
            }
          )}
        >
          <ContentEditable
            tagName="span"
            html={content.innerText || ""}
            onChange={handleOnChange}
            disabled={
              !editMode || state.editor.previewMode || state.editor.liveMode
            }
            className="focus:outline-none"
          />
        </p>
      )}
    </>
  );
};
