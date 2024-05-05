"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { WorkspacePage } from "@prisma/client";

import { useEditorSocket } from "@/hooks/use-editor-socket";
import { useEditor } from "@/components/providers/editor";
import { Recursive } from "./editor-components/recursive";

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
  }, [liveMode, dispatch]);

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
  }, [pageDetails, dispatch, liveMode]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  return (
    <div
      className={clsx(
        "use-automation-zoom-in h-full mt-16 mr-[320px] p-5 rounded-md",
        {
          "!p-0 !m-0 !w-full":
            state.editor.previewMode || state.editor.liveMode,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[420px]": state.editor.device === "Mobile",
          "!w-full": state.editor.device === "Desktop",
        }
      )}
      onClick={handleClick}
    >
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
