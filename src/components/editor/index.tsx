"use client";

import clsx from "clsx";
import { EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useEditor } from "@/components/providers/editor";
import { Button } from "@/components/ui/button";
import { getWorkspacePageDetails } from "@/lib/workspace-service";
import { Recursive } from "./editor-components/recursive";

interface Props {
  pageId: string;
  liveMode?: boolean;
}

export const Editor = ({ pageId, liveMode }: Props) => {
  const { state, dispatch } = useEditor();

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getWorkspacePageDetails(pageId);
      if (!res) return;

      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: res.content ? JSON.parse(res.content) : "",
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [pageId]);

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
        "use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md",
        {
          "!p-0 !mr-0": state.editor.previewMode || state.editor.liveMode,
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
    </div>
  );
};
