"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";

import { compareValues, targetToXYWH } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/use-resize-observer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";

interface Props {
  element: EditorElement;
}

export const SelectComponent = ({ element }: Props) => {
  const { styles, id, content } = element;

  const [open, setOpen] = useState(false);
  const { state, dispatch } = useEditor();

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const ref = useResizeObserver<HTMLButtonElement>(handleOnResizeBody);

  if (Array.isArray(content)) return;

  return (
    <Select
      open={open}
      onOpenChange={() => {
        if (state.editor.liveMode || state.editor.previewMode) {
          setOpen((prev) => !prev);
        }
      }}
      required={content.required}
    >
      <SelectTrigger
        id={content.id}
        ref={ref}
        style={styles}
        onClick={handleOnClick}
        className={clsx(
          "relative transition-all bg-white outline-none focus:ring-0 focus:ring-offset-0 text-black",
          {
            "outline-dashed outline-slate-400 outline-[1px]":
              !state.editor.previewMode && !state.editor.liveMode,
          }
        )}
      >
        <SelectValue placeholder={content.placeholder} />
      </SelectTrigger>
      <SelectContent
        className="z-[200] bg-inherit"
        style={{ color: styles.color }}
      >
        <SelectGroup>
          <SelectLabel>{content.label}</SelectLabel>
          {content.items?.map((item, index) => (
            <SelectItem
              className="focus:bg-slate-100 focus:text-black"
              key={index}
              value={item.id}
            >
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
