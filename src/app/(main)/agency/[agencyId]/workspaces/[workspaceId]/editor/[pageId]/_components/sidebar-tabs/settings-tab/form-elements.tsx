import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CustomInput, CustomSelectInput } from "../custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const FormElementsSection = ({
  onChange: handleChange,
  state,
}: Props) => {
  const { content, type } = state.editor.selectedElement;

  const showLabel =
    type === "select" || type === "checkbox" || type === "label";

  const showPlaceholder =
    type === "input" || type === "textarea" || type === "select";

  if (Array.isArray(content)) return;

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4">
        <CustomInput
          id="id"
          label="Name"
          value={content.id}
          onChange={handleChange}
          placeholder="Email"
          wFull
        />
        {showPlaceholder && (
          <CustomInput
            id="placeholder"
            label="Placeholder"
            value={content.placeholder}
            onChange={handleChange}
            placeholder="www.example.com"
            wFull
          />
        )}
        {showLabel && (
          <CustomInput
            id="label"
            label="Label"
            value={content.label}
            onChange={handleChange}
            placeholder="something"
            wFull
          />
        )}
        {type === "input" && (
          <CustomSelectInput
            label="Type"
            value={content.type || "text"}
            list={["text", "email", "password", "number"]}
            onValueChange={(value: string) => {
              handleChange({
                target: {
                  id: "type",
                  value,
                },
              });
            }}
          />
        )}
        {type !== "label" && (
          <div className="flex items-center gap-3">
            <Checkbox
              id="required"
              checked={content.required}
              onCheckedChange={(check: boolean) => {
                handleChange({
                  target: {
                    id: "required",
                    value: check,
                  },
                });
              }}
            />
            <Label htmlFor="required" className="text-xs text-muted-foreground">
              Required
            </Label>
          </div>
        )}
      </div>
    </AccordionContent>
  );
};
