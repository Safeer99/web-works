"use client";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Italic,
  TextCursor,
  Underline,
  X,
} from "lucide-react";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import {
  CustomColorInput,
  CustomInput,
  CustomSelectInput,
  CustomTabsInput,
} from "../custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const TypographySection = ({ state, onChange: handleChange }: Props) => {
  const { styles } = state.editor.selectedElement;
  const fontList = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Times",
    "Courier New",
    "Courier",
    "Georgia",
    "Palatino",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Arial Black",
    "Comic Sans MS",
  ];
  const fontWeights = [
    "100",
    "200",
    "300",
    "normal",
    "500",
    "600",
    "bold",
    "800",
    "bolder",
    "900",
  ];

  return (
    <AccordionContent>
      <div className="flex flex-col gap-3 text-xs">
        <CustomSelectInput
          label="Font"
          list={fontList}
          value={styles.fontFamily?.toString().split(",")[0] || "Arial"}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                id: "fontFamily",
                value: `${value}, sans-serif, serif, monospace`,
              },
            });
          }}
        />
        <CustomSelectInput
          label="Weight"
          list={fontWeights}
          value={styles.fontWeight?.toString() || "normal"}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                id: "fontWeight",
                value,
              },
            });
          }}
        />

        <div className="grid gap-2 grid-cols-2">
          <CustomInput
            id="fontSize"
            label="Size"
            onChange={handleChange}
            value={styles.fontSize}
          />
          <CustomInput
            id="lineHeight"
            label="Height"
            onChange={handleChange}
            value={styles.lineHeight}
          />
        </div>

        <CustomColorInput
          label="Color"
          value={styles.color || "#fff"}
          onChangeColor={(value: string) => {
            handleChange({ target: { id: "color", value } });
          }}
        />

        <CustomTabsInput
          label="Align"
          value={styles.textAlign || "left"}
          list={[
            { children: <AlignLeft />, value: "left" },
            { children: <AlignCenter />, value: "center" },
            { children: <AlignRight />, value: "right" },
            { children: <AlignJustify />, value: "justify" },
          ]}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                id: "textAlign",
                value,
              },
            });
          }}
        />

        <CustomTabsInput
          label="Style"
          value={styles.fontStyle || "normal"}
          list={[
            { children: <TextCursor />, value: "normal" },
            { children: <Italic />, value: "italic" },
          ]}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                id: "fontStyle",
                value,
              },
            });
          }}
        />

        <CustomTabsInput
          label="Decoration"
          value={styles.textDecorationLine || "none"}
          list={[
            { children: <X />, value: "none" },
            { children: <Underline />, value: "underline" },
            {
              children: <span className="overline">U</span>,
              value: "overline",
            },
            {
              children: <span className="line-through">U</span>,
              value: "line-through",
            },
          ]}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                id: "textDecorationLine",
                value,
              },
            });
          }}
        />
      </div>
    </AccordionContent>
  );
};
