"use client";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { Input, InputProps } from "@/components/ui/input";
import { CustomInput } from "../custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const SpacingSection = ({ state, onChange: handleChange }: Props) => {
  const { styles, type } = state.editor.selectedElement;

  return (
    <AccordionContent>
      <div className="relative w-full flex flex-col items-center gap-0.5">
        <p className="absolute left-1 -top-0.5 z-[100] text-foreground text-[8px] select-none">
          Margin
        </p>
        <div className="absolute inset-0 dark:border-t-[#464e5b] dark:border-l-[#323b49] dark:border-b-[#1f2937] dark:border-r-[#323b49] border-t-[#d7d9dc] border-l-[#a7abb2] border-b-[#868c95] border-r-[#a7abb2]  border-x-[36px] border-y-[22px] p-0.5 rounded-sm">
          <p className="absolute left-1 -top-0.5 text-foreground text-[8px] select-none">
            Padding
          </p>
          <div className="w-full h-full dark:border-b-[#464e5b] dark:border-l-[#323b49] dark:border-t-[#1f2937] dark:border-r-[#323b49] border-b-[#d7d9dc] border-l-[#a7abb2] border-t-[#868c95] border-r-[#a7abb2] border-x-[36px] border-y-[22px]"></div>
        </div>

        <CustomSpacingInput
          id="marginTop"
          onChange={handleChange}
          value={styles.marginTop}
          disabled={type === "__body"}
        />
        <CustomSpacingInput
          id="paddingTop"
          onChange={handleChange}
          value={styles.paddingTop}
        />

        <div className="w-full flex justify-between gap-1">
          <div className="flex justify-start gap-1">
            <CustomSpacingInput
              id="marginLeft"
              onChange={handleChange}
              value={styles.marginLeft}
              disabled={type === "__body"}
            />
            <CustomSpacingInput
              id="paddingLeft"
              onChange={handleChange}
              value={styles.paddingLeft}
            />
          </div>
          <div className="flex justify-end gap-1">
            <CustomSpacingInput
              id="paddingRight"
              onChange={handleChange}
              value={styles.paddingRight}
            />
            <CustomSpacingInput
              id="marginRight"
              onChange={handleChange}
              value={styles.marginRight}
              disabled={type === "__body"}
            />
          </div>
        </div>
        <CustomSpacingInput
          id="paddingBottom"
          onChange={handleChange}
          value={styles.paddingBottom}
        />
        <CustomSpacingInput
          id="marginBottom"
          onChange={handleChange}
          value={styles.marginBottom}
          disabled={type === "__body"}
        />
      </div>
      <div className="pt-4 space-y-3">
        <CustomInput
          id="margin"
          label="Margin"
          onChange={handleChange}
          value={styles.margin}
          disabled={type === "__body"}
          wFull
        />
        <CustomInput
          id="padding"
          label="Padding"
          onChange={handleChange}
          value={styles.padding}
          wFull
        />
      </div>
    </AccordionContent>
  );
};

const CustomSpacingInput = ({ value, ...props }: InputProps) => {
  return (
    <Input
      {...props}
      className="bg-transparent filter-none border-none outline-none focus-visible:ring-offset-0 focus-visible:ring-0 p-0 text-[10px] text-center h-5 w-[35px] z-[100]"
      value={value || ""}
      placeholder="0px"
    />
  );
};
