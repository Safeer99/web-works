"use client";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Italic,
} from "lucide-react";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CustomColorInput, CustomSelectInput } from "./custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const TypographySection = ({ state, onChange: handleChange }: Props) => {
  const { styles } = state.editor.selectedElement;
  const fontWeights = ["lighter", "normal", "bold", "bolder"];

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4">
        <Input
          id="fontFamily"
          value={styles.fontFamily}
          onChange={handleChange}
          placeholder="font-family"
          className="text-xs outline-none border-[1px] rounded-none focus-visible:ring-0 p-4 h-6"
        />

        <div className="flex gap-2">
          <Toggle
            onPressedChange={(e) => {
              handleChange({
                target: {
                  id: "fontStyle",
                  value: e ? "italic" : "normal",
                },
              });
            }}
            pressed={styles.fontStyle === "italic"}
            className="h-[34px] w-[34px] p-2.5"
          >
            <Italic />
          </Toggle>
          <CustomSelectInput
            label="Font Weights"
            list={fontWeights}
            value={(styles.fontWeight as string) || "normal"}
            handleOnChanges={(value) => {
              handleChange({ target: { id: "fontWeight", value } });
            }}
          />
          <Input
            id="fontSize"
            value={styles.fontSize || "16px"}
            onChange={handleChange}
            placeholder="font-size"
            className="flex-[0.7] text-xs outline-none border-[1px] rounded-none focus-visible:ring-0 py-4 px-2 h-6"
          />
        </div>

        <CustomColorInput
          value={styles.color || "#000000"}
          onChangeColor={(value: string) => {
            handleChange({ target: { id: "color", value } });
          }}
        />

        <ToggleGroup
          onValueChange={(value) =>
            handleChange({
              target: {
                id: "textAlign",
                value,
              },
            })
          }
          value={styles.textAlign || "left"}
          className="flex justify-between"
          size="sm"
          type="single"
        >
          <ToggleGroupItem title="left" value="left">
            <AlignLeft size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem title="right" value="right">
            <AlignRight size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem title="center" value="center">
            <AlignCenter size={20} />
          </ToggleGroupItem>
          <ToggleGroupItem title="justify" value="justify">
            <AlignJustify size={20} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </AccordionContent>
  );
};
