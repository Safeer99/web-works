"use client";

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

  if (
    !Array.isArray(state.editor.elements) ||
    !Array.isArray(state.editor.elements[0].content)
  )
    return;

  return (
    <div className="h-[100vh] w-full p-0 m-0">
      {state.editor.elements.map((childElement) => (
        <Recursive key={childElement.id} element={childElement} />
      ))}
    </div>
  );
};
