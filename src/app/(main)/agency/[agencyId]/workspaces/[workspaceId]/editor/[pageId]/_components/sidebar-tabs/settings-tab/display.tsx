"use client";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { CustomSelectInput } from "./custom-inputs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
  StretchVertical,
} from "lucide-react";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const DisplaySection = ({ onChange: handleChange, state }: Props) => {
  const { styles } = state.editor.selectedElement;

  const flexDirections = ["row", "row-reverse", "column", "column-reverse"];
  const flexWrap = ["wrap", "nowrap", "wrap-reverse"];

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <CustomSelectInput
            list={flexDirections}
            label="Flex Direction"
            value={styles.flexDirection || "row"}
            handleOnChanges={(value) => {
              handleChange({ target: { id: "flexDirection", value } });
            }}
          />
          <CustomSelectInput
            list={flexWrap}
            label="Flex Wrap"
            value={styles.flexWrap || "nowrap"}
            handleOnChanges={(value) => {
              handleChange({ target: { id: "flexWrap", value } });
            }}
          />
        </div>

        <div className="text-xs space-y-1 text-muted-foreground">
          <p>Justify Content</p>
          <ToggleGroup
            onValueChange={(value) => {
              handleChange({
                target: {
                  id: "justifyContent",
                  value,
                },
              });
            }}
            value={styles.justifyContent?.toString() || "flex-start"}
            className="flex flex-wrap justify-between"
            size="sm"
            type="single"
          >
            <ToggleGroupItem title="flex-start" value="flex-start">
              <AlignHorizontalJustifyStart size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="center" value="center">
              <AlignHorizontalJustifyCenter size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="flex-end" value="flex-end">
              <AlignHorizontalJustifyEnd size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="space-between" value="space-between">
              <AlignHorizontalSpaceBetween size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="space-around" value="space-around">
              <AlignHorizontalSpaceAround size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="space-evenly" value="space-evenly">
              <AlignHorizontalDistributeCenter size={18} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="text-xs space-y-1 text-muted-foreground">
          <p>Align Items</p>
          <ToggleGroup
            onValueChange={(value) => {
              handleChange({
                target: {
                  id: "alignItems",
                  value,
                },
              });
            }}
            value={styles.alignItems?.toString() || "flex-start"}
            className="flex justify-between"
            size="sm"
            type="single"
          >
            <ToggleGroupItem title="flex-start" value="flex-start">
              <AlignStartHorizontal size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="center" value="center">
              <AlignCenterHorizontal size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="flex-end" value="flex-end">
              <AlignEndHorizontal size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem title="stretch" value="stretch">
              <StretchVertical size={18} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </AccordionContent>
  );
};
