"use client";

import {
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignHorizontalDistributeCenter,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignStartHorizontal,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  StretchVertical,
} from "lucide-react";
import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/hint";
import {
  CustomInput,
  CustomSelectInput,
  CustomTabsInput,
} from "../custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const LayoutSection = ({ onChange: handleChange, state }: Props) => {
  const { styles } = state.editor.selectedElement;
  const justifyContent = [
    "start",
    "center",
    "end",
    "space-between",
    "space-evenly",
    "space-around",
  ];
  const alignItems = ["start", "center", "end", "stretch"];
  const flexWrap = ["wrap", "nowrap", "wrap-reverse"];

  return (
    <AccordionContent>
      <div className="flex flex-col gap-3 text-xs">
        <CustomTabsInput
          label="Display"
          value={styles.display || "block"}
          list={[
            { children: <>Block</>, value: "block" },
            { children: <>Flex</>, value: "flex" },
            // {children: <>Grid</>, value: "grid"},
          ]}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                id: "display",
                value,
              },
            });
          }}
        />

        {styles.display === "flex" && (
          <>
            <CustomTabsInput
              label="Direction"
              value={styles.flexDirection || "row"}
              list={[
                { children: <ArrowRight />, value: "row" },
                { children: <ArrowDown />, value: "column" },
                { children: <ArrowLeft />, value: "row-reverse" },
                { children: <ArrowUp />, value: "column-reverse" },
              ]}
              onValueChange={(value: string) => {
                handleChange({
                  target: {
                    id: "flexDirection",
                    value,
                  },
                });
              }}
            />
            <CustomSelectInput
              label="Wrap"
              value={styles.flexWrap || "nowrap"}
              list={flexWrap}
              onValueChange={(value: string) => {
                handleChange({
                  target: {
                    id: "flexWrap",
                    value,
                  },
                });
              }}
            />
            <CustomSelectInput
              label="Justify"
              value={styles.justifyContent || "start"}
              list={justifyContent}
              onValueChange={(value: string) => {
                handleChange({
                  target: {
                    id: "justifyContent",
                    value,
                  },
                });
              }}
            />
            <CustomSelectInput
              label="Align"
              value={styles.alignItems || "start"}
              list={alignItems}
              onValueChange={(value: string) => {
                handleChange({
                  target: {
                    id: "alignItems",
                    value,
                  },
                });
              }}
            />
            <CustomInput
              id="gap"
              label="Gap"
              value={styles.gap}
              onChange={handleChange}
              wFull
            />
          </>
        )}
      </div>
    </AccordionContent>
  );
};
