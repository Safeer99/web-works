import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { CustomInput } from "../custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const CustomSection = ({ onChange: handleChange, state }: Props) => {
  const { content, type } = state.editor.selectedElement;

  const showInnerText =
    type === "text" ||
    type === "navigate" ||
    type === "link" ||
    type === "submitButton";

  if (Array.isArray(content)) return;

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4">
        {showInnerText && (
          <CustomInput
            id="innerText"
            label="Text"
            value={content.innerText}
            onChange={handleChange}
            placeholder="Text Element"
            wFull
          />
        )}
        {type === "navigate" && (
          <CustomInput
            id="route"
            label="Route"
            value={content.route}
            onChange={handleChange}
            placeholder="/contact"
            wFull
          />
        )}
        {type === "image" && (
          <CustomInput
            id="src"
            label="Image"
            value={content.src}
            onChange={handleChange}
            placeholder="https://..."
            wFull
          />
        )}
        {type === "video" && (
          <CustomInput
            id="src"
            label="Video"
            value={content.src}
            onChange={handleChange}
            placeholder="https://..."
            wFull
          />
        )}
      </div>
    </AccordionContent>
  );
};
