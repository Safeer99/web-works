import { EditorElement } from "@/components/providers/editor/editor-types";
import { TextComponent } from "./text";

interface Props {
  element: EditorElement;
}

export const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;

    default:
      return null;
  }
};
