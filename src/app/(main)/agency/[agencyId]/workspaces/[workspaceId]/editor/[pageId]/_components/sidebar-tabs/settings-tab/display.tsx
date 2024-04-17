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
  StretchVertical,
} from "lucide-react";
import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/hint";
import { CustomSelectInput } from "./custom-inputs";

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
        <div className="flex items-center justify-between">
          <Label htmlFor="flexbox" className="text-xs">
            Flex-box
          </Label>
          <Switch
            id="flexbox"
            className="scale-75"
            checked={styles.display === "flex"}
            onCheckedChange={(check) => {
              handleChange({
                target: { id: "display", value: check ? "flex" : "block" },
              });
            }}
          />
        </div>
        {styles.display === "flex" && (
          <>
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

            <div className="space-y-1 text-xs text-muted-foreground">
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
                <ToggleGroupItem value="flex-start">
                  <Hint label="start">
                    <AlignHorizontalJustifyStart size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Hint label="center">
                    <AlignHorizontalJustifyCenter size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="flex-end">
                  <Hint label="end">
                    <AlignHorizontalJustifyEnd size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="space-between">
                  <Hint label="between">
                    <AlignHorizontalSpaceBetween size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="space-around">
                  <Hint label="around">
                    <AlignHorizontalSpaceAround size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="space-evenly">
                  <Hint label="evenly">
                    <AlignHorizontalDistributeCenter size={18} />
                  </Hint>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground">
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
                <ToggleGroupItem value="flex-start">
                  <Hint label="start">
                    <AlignStartHorizontal size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Hint label="center">
                    <AlignCenterHorizontal size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="flex-end">
                  <Hint label="end">
                    <AlignEndHorizontal size={18} />
                  </Hint>
                </ToggleGroupItem>
                <ToggleGroupItem value="stretch">
                  <Hint label="stretch">
                    <StretchVertical size={18} />
                  </Hint>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </>
        )}
      </div>
    </AccordionContent>
  );
};
