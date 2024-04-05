import { EditorElement } from "@/components/providers/editor/editor-types";
import { TextComponent } from "./text";
import { Container } from "./container";
import { LinkComponent } from "./link";
import { VideoComponent } from "./video";

interface Props {
  element: EditorElement;
}

export const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "contactForm":
      return; //<ContactFormComponent element={element} />;
    case "2Col":
      return <Container element={element} />;
    case "__body":
      return <Container element={element} />;
    case "link":
      return <LinkComponent element={element} />;
    default:
      return null;
  }
};
