export const defaultStyles: React.CSSProperties = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
};

export const defaultDetails: Record<string, EditorElement> = {
  text: {
    content: { innerText: "Text Element" },
    id: "",
    name: "Text",
    styles: {
      color: "black",
      ...defaultStyles,
    },
    type: "text",
  },
  link: {
    content: {
      innerText: "Link Element",
      href: "#",
    },
    id: "",
    name: "Link",
    styles: {
      color: "black",
      ...defaultStyles,
    },
    type: "link",
  },
  video: {
    content: {
      src: "https://www.youtube.com/embed/URyiCGZNjdI?si=OUamoblqbl6tLsi_",
    },
    id: "",
    name: "Video",
    styles: {},
    type: "video",
  },
  container: {
    content: [],
    id: "",
    name: "Container",
    styles: { ...defaultStyles },
    type: "container",
  },
  contactForm: {
    content: [],
    id: "",
    name: "Contact Form",
    styles: {},
    type: "contactForm",
  },
};

export type EditorBtns =
  | "text"
  | "container"
  | "section"
  | "contactForm"
  | "paymentForm"
  | "link"
  | "2Col"
  | "video"
  | "__body"
  | "image"
  | null
  | "3Col";

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content:
    | EditorElement[]
    | {
        href?: string;
        innerText?: string;
        src?: string;
      };
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
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
  elements: [
    {
      id: "__body",
      content: [],
      name: "Body",
      styles: { ...defaultStyles },
      type: "__body",
    },
  ],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
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
