"use client";

import { EditorElement, EditorState } from "./editor-types";
import { EditorAction } from "./editor-actions";

const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the Add Element editor State"
    );
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }
    return item;
  });
};

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error("You sent the wrong action type to the update Element State");
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }
    return item;
  });
};

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Delete Element editor State"
    );
  return editorArray
    .filter((item) => item.id !== action.payload.elementDetails.id)
    .map((item) => {
      if (item.content && Array.isArray(item.content)) {
        return {
          ...item,
          content: deleteAnElement(item.content, action),
        };
      }
      return item;
    });
};

export const editorReducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };
      const updateHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ];
      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updateHistory,
          currentIndex: updateHistory.length - 1,
        },
      };
      return newEditorState;

    case "UPDATE_ELEMENT":
      const updatedElements = updateAnElement(state.editor.elements, action);

      const updatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: updatedElementIsSelected
          ? {
              position: { ...state.editor.selectedElement.position },
              ...action.payload.elementDetails,
            }
          : { ...state.editor.selectedElement },
      };
      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate },
      ];
      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };
      return updatedEditor;

    case "DELETE_ELEMENT":
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action
      );

      const updatedSelectedElementState =
        state.editor.selectedElement.id === action.payload.elementDetails.id
          ? {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
              position: { x: 0, y: 0, h: 0, w: 0 },
            }
          : state.editor.selectedElement;

      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
        selectedElement: updatedSelectedElementState,
      };
      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete },
      ];

      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };

      return deletedState;

    case "CHANGE_CLICKED_ELEMENT":
      const updatedEditorClickedState = {
        ...state.editor,
        selectedElement: action.payload.elementDetails || {
          id: "",
          content: [],
          name: "",
          styles: {},
          type: null,
          position: { x: 0, y: 0, h: 0, w: 0 },
        },
      };
      const updatedState = {
        ...state,
        editor: updatedEditorClickedState,
      };
      return updatedState;

    case "CHANGE_DEVICE":
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      };
      return changedDeviceState;

    case "TOGGLE_PREVIEW_MODE":
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
      return toggleState;

    case "TOGGLE_LIVE_MODE":
      const toggleLiveMode: EditorState = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? action.payload.value
            : !state.editor.liveMode,
        },
      };
      return toggleLiveMode;

    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;

    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;

    case "LOAD_DATA":
      const editorState = {
        ...state.editor,
        elements: action.payload.elements || [...state.editor.elements],
        liveMode: !!action.payload.withLive,
      };
      return {
        ...state,
        editor: editorState,
        history: action.payload.history || {
          history: [editorState],
          currentIndex: 0,
        },
      };

    case "SET_PAGE_ID":
      return {
        ...state,
        editor: {
          ...state.editor,
          pageId: action.payload.pageId,
        },
      };

    default:
      return state;
  }
};
