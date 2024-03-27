"use client";

import { Dispatch, createContext, useContext, useReducer } from "react";
import { WorkspacePage } from "@prisma/client";
import { editorReducer } from "./editor-reducer";
import { EditorAction } from "./editor-actions";
import { DeviceTypes, EditorState, initialState } from "./editor-types";

export type EditorContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  agencyId: string;
  workspaceId: string;
  pageDetails: WorkspacePage | null;
}>({
  state: initialState,
  dispatch: () => undefined,
  agencyId: "",
  workspaceId: "",
  pageDetails: null,
});

type EditorProps = {
  children: React.ReactNode;
  agencyId: string;
  workspaceId: string;
  pageDetails: WorkspacePage;
};

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        agencyId: props.agencyId,
        workspaceId: props.workspaceId,
        pageDetails: props.pageDetails,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default EditorProvider;
