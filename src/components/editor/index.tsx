"use client";

import clsx from "clsx";
import { EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useEditor } from "@/components/providers/editor";
import { Button } from "@/components/ui/button";
import { Recursive } from "./editor-components/recursive";
import { useEditorSocket } from "@/hooks/use-editor-socket";
import { WorkspacePage } from "@prisma/client";

interface Props {
  pageDetails: WorkspacePage;
  liveMode?: boolean;
}

export const Editor = ({ pageDetails, liveMode }: Props) => {
  const { state, dispatch } = useEditor();
  useEditorSocket();

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  useEffect(() => {
    dispatch({
      type: "LOAD_DATA",
      payload: {
        elements: pageDetails.content ? JSON.parse(pageDetails.content) : "",
        withLive: !!liveMode,
      },
    });
    dispatch({
      type: "SET_PAGE_ID",
      payload: {
        pageId: pageDetails.id,
      },
    });
  }, [pageDetails]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handlePreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  return (
    <div
      className={clsx(
        "use-automation-zoom-in h-full mt-16 mr-[320px] p-4 transition-all rounded-md",
        {
          "!p-0 !m-0": state.editor.previewMode || state.editor.liveMode,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[420px]": state.editor.device === "Mobile",
          "!w-full": state.editor.device === "Desktop",
        }
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          onClick={handlePreview}
          variant="ghost"
          size="icon"
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
      {!state.editor.previewMode && !state.editor.liveMode && (
        <div className="h-10" />
      )}
    </div>
  );
};
