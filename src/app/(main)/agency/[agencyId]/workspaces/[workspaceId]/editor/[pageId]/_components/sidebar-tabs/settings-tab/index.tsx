import { useDebounceValue } from "usehooks-ts";

import { useUpdateElement } from "@/hooks/use-editor-socket";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEditor } from "@/components/providers/editor";
import { CustomSection } from "./custom";
import { FormElementsSection } from "./form-elements";
import { SelectElementSection } from "./select-element";

export const SettingsTab = () => {
  const { state } = useEditor();
  const { position, ...selectedElement } = state.editor.selectedElement;

  const [debounce, setValue] = useDebounceValue("", 2000);
  const updateElement = useUpdateElement();

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    updateElement({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...selectedElement,
          content: {
            ...selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  const isCustomElement =
    selectedElement.type === "text" ||
    selectedElement.type === "navigate" ||
    selectedElement.type === "link" ||
    selectedElement.type === "video" ||
    selectedElement.type === "image" ||
    selectedElement.type === "submitButton";

  const isFormElement =
    selectedElement.type === "label" ||
    selectedElement.type === "input" ||
    selectedElement.type === "textarea" ||
    selectedElement.type === "select" ||
    selectedElement.type === "checkbox";

  return (
    <Accordion
      type="multiple"
      className="w-[255px]"
      defaultValue={["Custom", "Form", "Select"]}
    >
      {isCustomElement && (
        <AccordionItem value="Custom" className="px-4 py-0">
          <AccordionTrigger className="!no-underline text-sm">
            Custom Settings
          </AccordionTrigger>
          <CustomSection state={state} onChange={handleChangeCustomValues} />
        </AccordionItem>
      )}

      {isFormElement && (
        <AccordionItem value="Form" className="px-4 py-0">
          <AccordionTrigger className="!no-underline text-sm">
            Form Fields Settings
          </AccordionTrigger>
          <FormElementsSection
            state={state}
            onChange={handleChangeCustomValues}
          />
        </AccordionItem>
      )}

      {selectedElement.type === "select" && (
        <AccordionItem value="Select" className="px-4 py-0">
          <AccordionTrigger className="!no-underline text-sm">
            Select Field Settings
          </AccordionTrigger>
          <SelectElementSection
            state={state}
            onChange={handleChangeCustomValues}
          />
        </AccordionItem>
      )}
    </Accordion>
  );
};
