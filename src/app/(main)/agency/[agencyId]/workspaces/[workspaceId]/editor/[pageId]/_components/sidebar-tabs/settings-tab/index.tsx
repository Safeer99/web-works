import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { useEditor } from "@/components/providers/editor";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TooltipProvider } from "@/components/ui/tooltip";

import { DimensionsSection } from "./dimensions";
import { TypographySection } from "./typography";
import { DecorationsSection } from "./decorations";
import { DisplaySection } from "./display";
import { CustomSection } from "./custom";

export const SettingsTab = () => {
  const { state, dispatch } = useEditor();
  const [style, setStyle] = useState({});
  const [debounce, setValue] = useDebounceValue("", 500);

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
    // setValue(value);
    // setStyle(styleObject);
  };

  // TODO:- solve dbounce hook issue.

  useEffect(() => {
    if (debounce) {
    }
  }, [debounce]);

  // TODO:- add restrictions based on selected element on all styles

  return (
    <TooltipProvider>
      <Accordion
        type="multiple"
        className="w-[255px]"
        defaultValue={[
          "Custom",
          // "Typography",
          // "Dimensions",
          // "Decorations",
          // "Display",
        ]}
      >
        <AccordionItem value="Custom" className="px-4 py-0">
          <AccordionTrigger className="!no-underline text-sm">
            Custom
          </AccordionTrigger>
          <CustomSection state={state} onChange={handleChangeCustomValues} />
        </AccordionItem>

        <AccordionItem value="Display" className="px-4 py-0">
          <AccordionTrigger className="!no-underline text-sm">
            Display
          </AccordionTrigger>
          <DisplaySection state={state} onChange={handleOnChanges} />
        </AccordionItem>

        <AccordionItem value="Dimensions" className=" px-4 py-0 ">
          <AccordionTrigger className="!no-underline text-sm">
            Dimensions
          </AccordionTrigger>
          <DimensionsSection state={state} onChange={handleOnChanges} />
        </AccordionItem>

        <AccordionItem value="Typography" className="px-4 py-0">
          <AccordionTrigger className="!no-underline text-sm">
            Typography
          </AccordionTrigger>
          <TypographySection state={state} onChange={handleOnChanges} />
        </AccordionItem>

        <AccordionItem value="Decorations" className="px-4 py-0 ">
          <AccordionTrigger className="!no-underline text-sm">
            Decorations
          </AccordionTrigger>
          <DecorationsSection state={state} onChange={handleOnChanges} />
        </AccordionItem>
      </Accordion>
    </TooltipProvider>
  );
};