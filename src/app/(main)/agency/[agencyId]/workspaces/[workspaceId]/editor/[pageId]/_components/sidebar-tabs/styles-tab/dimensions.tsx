"use client";

import { ArrowUpDown, Eye, EyeOff } from "lucide-react";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { CustomInput, CustomTabsInput } from "../custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const DimensionsSection = ({ state, onChange: handleChange }: Props) => {
  const { styles, type } = state.editor.selectedElement;

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4 text-xs">
        <div className="grid grid-cols-2 grid-rows-3 gap-3 gap-y-3">
          <CustomInput
            id="width"
            label="Width"
            onChange={handleChange}
            value={styles.width}
            disabled={type === "__body"}
          />
          <CustomInput
            id="height"
            label="Height"
            onChange={handleChange}
            value={styles.height}
            disabled={type === "__body"}
          />
          <CustomInput
            id="minWidth"
            label="Min W"
            onChange={handleChange}
            value={styles.minWidth}
            disabled={type === "__body"}
          />
          <CustomInput
            id="minHeight"
            label="Min H"
            onChange={handleChange}
            value={styles.minHeight}
            disabled={type === "__body"}
          />
          <CustomInput
            id="maxWidth"
            label="Max W"
            onChange={handleChange}
            value={styles.maxWidth}
            disabled={type === "__body"}
          />
          <CustomInput
            id="maxHeight"
            label="Max H"
            onChange={handleChange}
            value={styles.maxHeight}
            disabled={type === "__body"}
          />
        </div>
        <CustomTabsInput
          onValueChange={(value: string) => {
            handleChange({
              target: {
                id: "overflow",
                value,
              },
            });
          }}
          label="Overflow"
          list={[
            { children: <Eye />, value: "visible" },
            { children: <EyeOff />, value: "hidden" },
            { children: <ArrowUpDown />, value: "scroll" },
            { children: <>Auto</>, value: "auto" },
          ]}
          value={styles.overflow || "visible"}
        />
      </div>
    </AccordionContent>
  );
};
