import {
  DeviceTypes,
  EditorElement,
  HistoryState,
  SelectedElementType,
} from "./editor-types";

export type EditorAction =
  | {
      type: "ADD_ELEMENT";
      payload: {
        containerId: string;
        elementDetails: EditorElement;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        elementDetails: SelectedElementType;
      };
    }
  | {
      type: "CHANGE_CLICKED_ELEMENT";
      payload: {
        elementDetails?:
          | SelectedElementType
          | {
              id: "";
              content: [];
              name: "";
              styles: {};
              type: null;
              position: { x: 0; y: 0; h: 0; w: 0 };
            };
      };
    }
  | {
      type: "CHANGE_DEVICE";
      payload: {
        device: DeviceTypes;
      };
    }
  | {
      type: "TOGGLE_PREVIEW_MODE";
    }
  | {
      type: "TOGGLE_LIVE_MODE";
      payload?: {
        value: boolean;
      };
    }
  | { type: "REDO" }
  | { type: "UNDO" }
  | {
      type: "LOAD_DATA";
      payload: {
        elements: EditorElement[];
        history?: HistoryState;
        withLive: boolean;
      };
    }
  | {
      type: "SET_PAGE_ID";
      payload: {
        pageId: string;
      };
    };
