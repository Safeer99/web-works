import { EditorElement } from "@/components/providers/editor/editor-types";
import { TextComponent } from "./text";
import { Container } from "./container";
import { LinkComponent } from "./link";
import { VideoComponent } from "./video";
import { ImageComponent } from "./image";
import { FormComponent } from "./form";
import { InputComponent } from "./input";
import { TextAreaComponent } from "./textarea";
import { NavigateComponent } from "./navigate";
import { SubmitButtonComponent } from "./submit-button";
import { LabelComponent } from "./label";
import { SelectComponent } from "./select";
import { CheckboxComponent } from "./checkbox";

interface Props {
  element: EditorElement;
}

export const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "__body":
      return <Container element={element} />;
    case "container":
      return <Container element={element} />;
    case "form":
      return <FormComponent element={element} />;
    case "text":
      return <TextComponent element={element} />;
    case "navigate":
      return <NavigateComponent element={element} />;
    case "link":
      return <LinkComponent element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "image":
      return <ImageComponent element={element} />;
    case "label":
      return <LabelComponent element={element} />;
    case "input":
      return <InputComponent element={element} />;
    case "textarea":
      return <TextAreaComponent element={element} />;
    case "select":
      return <SelectComponent element={element} />;
    case "checkbox":
      return <CheckboxComponent element={element} />;
    case "submitButton":
      return <SubmitButtonComponent element={element} />;
    default:
      return null;
  }
};
