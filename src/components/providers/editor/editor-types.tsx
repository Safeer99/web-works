import { defaultDetails } from "./editor-default-data";

export type EditorBtns =
  | "__body"
  | "container"
  | "text"
  | "navigate"
  | "link"
  | "video"
  | "image"
  | "form"
  | "label"
  | "input"
  | "textarea"
  | "checkbox"
  | "select"
  | "submitButton"
  | null;

export type FormBtns =
  | "label"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "submitButton"
  | null;

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type ElementContent = {
  href?: string; //!                  link
  route?: string; //!                 navigate
  src?: string; //!                   image, video
  innerText?: string; //!             text, link, navigate, label, button
  //? Form elements attributes
  id?: string; //!                    input, textarea, select, checkbox, label
  required?: boolean; //!             input, textarea, select, checkbox
  placeholder?: string; //!           input, textarea, select
  type?: string; //!                  input
  label?: string; //!                 select checkbox
  items?: Record<string, any>[]; //!  select
};

export type EditorElement = {
  id: string;
  name: string;
  type: EditorBtns;
  styles: React.CSSProperties;
  content: EditorElement[] | ElementContent;
};

export type SelectedElementType = EditorElement & {
  position: { x: number; y: number; w: number; h: number };
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: SelectedElementType;
  device: DeviceTypes;
  previewMode: boolean;
  pageId: string;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

export const initialEditorState: EditorState["editor"] = {
  elements: [defaultDetails["__body"]],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
    position: { x: 0, y: 0, w: 0, h: 0 },
  },
  device: "Desktop",
  previewMode: false,
  liveMode: false,
  pageId: "",
};

export const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

export const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};
