import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

import { useUpdateElement } from "@/hooks/use-editor-socket";
import { useEditor } from "@/components/providers/editor";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { DimensionsSection } from "./dimensions";
import { TypographySection } from "./typography";
import { BackgroundSection } from "./backgrounds";
import { LayoutSection } from "./layout";
import { BorderSection } from "./borders";
import { SpacingSection } from "./spacing";

export const StylesTab = () => {
  const { state } = useEditor();
  const [debounce, setValue] = useDebounceValue("", 2000);
  const updateElement = useUpdateElement();

  const { position, ...selectedElement } = state.editor.selectedElement;

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };
    updateElement({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...selectedElement,
          styles: {
            ...selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
    setValue(value);
  };

  // TODO:- solve dbounce hook issue.

  useEffect(() => {
    if (debounce) {
      console.log("Saving....");
    }
  }, [debounce]);

  return (
    <Accordion
      type="multiple"
      className="w-[255px]"
      defaultValue={[
        "Layout",
        "Spacing",
        "Dimensions",
        "Typography",
        "Backgrounds",
        "Borders",
      ]}
    >
      <AccordionItem value="Layout" className="px-2 py-0">
        <AccordionTrigger className="!no-underline text-sm">
          Layout
        </AccordionTrigger>
        <LayoutSection state={state} onChange={handleOnChanges} />
      </AccordionItem>

      <AccordionItem value="Spacing" className="px-2 py-0 ">
        <AccordionTrigger className="!no-underline text-sm">
          Spacing
        </AccordionTrigger>
        <SpacingSection state={state} onChange={handleOnChanges} />
      </AccordionItem>

      <AccordionItem value="Dimensions" className=" px-2 py-0 ">
        <AccordionTrigger className="!no-underline text-sm">
          Dimensions
        </AccordionTrigger>
        <DimensionsSection state={state} onChange={handleOnChanges} />
      </AccordionItem>

      <AccordionItem value="Typography" className="px-2 py-0">
        <AccordionTrigger className="!no-underline text-sm">
          Typography
        </AccordionTrigger>
        <TypographySection state={state} onChange={handleOnChanges} />
      </AccordionItem>

      <AccordionItem value="Backgrounds" className="px-2 py-0 ">
        <AccordionTrigger className="!no-underline text-sm">
          Backgrounds
        </AccordionTrigger>
        <BackgroundSection state={state} onChange={handleOnChanges} />
      </AccordionItem>

      {selectedElement.type !== "__body" && (
        <AccordionItem value="Borders" className="px-2 py-0 ">
          <AccordionTrigger className="!no-underline text-sm">
            Borders
          </AccordionTrigger>
          <BorderSection state={state} onChange={handleOnChanges} />
        </AccordionItem>
      )}
    </Accordion>
  );
};
