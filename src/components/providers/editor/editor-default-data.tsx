import { v4 } from "uuid";
import { EditorBtns, EditorElement } from "./editor-types";

export const defaultDetails: Record<
  Extract<EditorBtns, string>,
  EditorElement
> = {
  __body: {
    name: "Body",
    type: "__body",
    id: "__body",
    styles: {
      boxSizing: "border-box",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      objectFit: "cover",
      opacity: "100%",
      padding: "20px",
    },
    content: [],
  },
  container: {
    id: "",
    name: "Container",
    type: "container",
    styles: {
      height: "100px",
      backgroundPosition: "center",
      objectFit: "cover",
      backgroundRepeat: "no-repeat",
    },
    content: [],
  },
  text: {
    id: "",
    name: "Text",
    type: "text",
    styles: {
      color: "black",
      fontSize: "16px",
      padding: "2px",
    },
    content: { innerText: "Text Element" },
  },
  navigate: {
    id: "",
    name: "Navigate",
    type: "navigate",
    styles: {
      color: "black",
      fontSize: "16px",
      padding: "2px",
    },
    content: {
      innerText: "Link Element",
      route: "/",
    },
  },
  link: {
    id: "",
    name: "Link",
    type: "link",
    styles: {
      color: "black",
      fontSize: "16px",
      padding: "2px",
    },
    content: {
      innerText: "Link Element",
      href: "#",
    },
  },
  video: {
    id: "",
    name: "Video",
    type: "video",
    styles: {
      width: "400px",
      height: "230px",
      padding: "10px",
    },
    content: {
      src: "https://www.youtube.com/embed/URyiCGZNjdI?si=OUamoblqbl6tLsi_",
    },
  },
  image: {
    id: "",
    name: "Image",
    type: "image",
    styles: {
      objectFit: "contain",
    },
    content: {},
  },
  form: {
    id: "",
    name: "Form",
    type: "form",
    styles: {
      padding: "20px",
    },
    content: [
      {
        id: "",
        name: "Label",
        type: "label",
        styles: {
          fontSize: "16px",
          color: "black",
        },
        content: {
          id: "email",
          label: "Email",
          required: false,
        },
      },
      {
        id: "",
        name: "Input",
        type: "input",
        styles: { fontSize: "16px", color: "black" },
        content: {
          id: "email",
          placeholder: "Enter email...",
          type: "email",
          required: false,
        },
      },
      {
        id: "",
        name: "Submit Button",
        type: "submitButton",
        styles: { marginTop: "20px" },
        content: {
          innerText: "Submit",
        },
      },
    ],
  },
  label: {
    id: "",
    name: "Label",
    type: "label",
    styles: { fontSize: "16px", color: "black" },
    content: {
      id: "",
      label: "Label Element",
    },
  },
  input: {
    id: "",
    name: "Input",
    type: "input",
    styles: { fontSize: "16px", color: "black" },
    content: {
      id: "",
      placeholder: "Input field...",
      required: false,
    },
  },
  textarea: {
    id: "",
    name: "Textarea",
    type: "textarea",
    styles: { fontSize: "16px", color: "black" },
    content: {
      id: "",
      placeholder: "Write your text here...",
      required: false,
    },
  },
  submitButton: {
    id: "",
    name: "Submit Button",
    type: "submitButton",
    styles: {},
    content: {
      innerText: "Submit",
    },
  },
  checkbox: {
    id: "",
    name: "Checkbox",
    type: "checkbox",
    styles: {
      padding: "10px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "start",
      color: "black",
      fontSize: "12px",
    },
    content: {
      id: "feedback",
      label: "Are you enjoying our amazing service ?",
      required: false,
    },
  },
  select: {
    id: "",
    name: "Select",
    type: "select",
    styles: { fontSize: "16px", color: "black" },
    content: {
      id: "",
      placeholder: "Select a value...",
      label: "Values",
      required: false,
      items: [
        { id: "first", value: "First item" },
        { id: "second", value: "Second item" },
      ],
    },
  },
};

const addId = (element: EditorElement): EditorElement => {
  if (Array.isArray(element.content)) {
    return {
      ...element,
      id: v4(),
      content: element.content.map((childElement) => {
        return addId(childElement);
      }),
    };
  }
  return {
    ...element,
    id: v4(),
  };
};

export const getElementDetails = (type: Extract<EditorBtns, string>) => {
  const data = addId(defaultDetails[type]);
  return data;
};
