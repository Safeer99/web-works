"use client";

import { useState } from "react";
import {
  AlignVerticalJustifyCenter,
  ChevronsLeftRightIcon,
  LucideImageDown,
  Scan,
} from "lucide-react";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Hint } from "@/components/hint";
import {
  CustomColorInput,
  CustomInput,
  CustomSelectInput,
} from "./custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const DecorationsSection = ({
  state,
  onChange: handleChange,
}: Props) => {
  const positions = [
    "center",
    "center top",
    "center bottom",
    "left top",
    "left center",
    "left bottom",
    "right top",
    "right center",
    "right bottom",
  ];
  const { styles } = state.editor.selectedElement;
  const [independentBorders, setIndependentBorders] = useState(false);
  const [customPosition, setCustomPosition] = useState(false);

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4 text-xs text-muted-foreground">
        <CustomColorInput
          onChangeColor={(value: string) => {
            handleChange({ target: { id: "backgroundColor", value } });
          }}
          value={styles.backgroundColor?.toString() || "#FFFFFF"}
        />

        <div className="h-9 flex items-center gap-2 border-muted border-[1px] px-2">
          <div
            className="w-[22px] h-[22px] bg-contain bg-no-repeat bg-center border-muted-foreground border-b-[1px]"
            style={{
              backgroundImage:
                styles.backgroundImage || "url(/transparent-bg.jpg)",
            }}
          />
          <Separator orientation="vertical" />
          <Input
            id="backgroundImage"
            value={
              styles.backgroundImage?.substring(
                4,
                styles.backgroundImage.length - 1
              ) || ""
            }
            onChange={(e) => {
              handleChange({
                target: {
                  id: e.target.id,
                  value: `url(${e.target.value})`,
                },
              });
            }}
            placeholder="bg-image-url"
            className="w-[80%] text-xs outline-none border-none rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 px-2 py-0 h-6"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <p>Image Position</p>
            <Hint label="Custom Position">
              <Scan
                size={16}
                className="cursor-pointer"
                onClick={() => setCustomPosition(!customPosition)}
              />
            </Hint>
          </div>
          {customPosition ? (
            <div className="flex gap-4">
              <CustomInput
                label="X"
                id="backgroundPositionX"
                onChange={handleChange}
                value={styles.backgroundPositionX}
              />
              <CustomInput
                label="Y"
                id="backgroundPositionY"
                onChange={handleChange}
                value={styles.backgroundPositionY}
              />
            </div>
          ) : (
            <CustomSelectInput
              label="Position"
              list={positions}
              value={(styles.backgroundPosition as string) || "left top"}
              handleOnChanges={(value) => {
                handleChange({
                  target: { id: "backgroundPosition", value },
                });
              }}
            />
          )}
        </div>

        <ToggleGroup
          onValueChange={(value) => {
            handleChange({
              target: {
                id: "backgroundSize",
                value,
              },
            });
          }}
          value={styles.backgroundSize?.toString() || "auto"}
          className="flex justify-between"
          size="sm"
          type="single"
        >
          <ToggleGroupItem value="auto">
            <Hint label="auto">
              <LucideImageDown size={20} />
            </Hint>
          </ToggleGroupItem>
          <ToggleGroupItem value="cover">
            <Hint label="cover">
              <ChevronsLeftRightIcon size={20} />
            </Hint>
          </ToggleGroupItem>
          <ToggleGroupItem value="contain">
            <Hint label="contain">
              <AlignVerticalJustifyCenter size={20} />
            </Hint>
          </ToggleGroupItem>
        </ToggleGroup>

        <div>
          <div className="flex items-center justify-between h-7">
            <p>Opacity</p>
            <p className="p-2">
              {typeof styles?.opacity === "number"
                ? styles?.opacity
                : parseFloat((styles?.opacity || "0").replace("%", "")) || 100}
              %
            </p>
          </div>
          <Slider
            onValueChange={(e) => {
              handleChange({
                target: {
                  id: "opacity",
                  value: `${e[0]}%`,
                },
              });
            }}
            defaultValue={[
              typeof styles?.opacity === "number"
                ? styles?.opacity
                : parseFloat((styles?.opacity || "0").replace("%", "")) || 100,
            ]}
            max={100}
            step={1}
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center gap-4">
            <p>Border</p>
            <Hint label="Independent Borders">
              <Scan
                size={16}
                className="cursor-pointer"
                onClick={() => setIndependentBorders(!independentBorders)}
              />
            </Hint>
          </div>
          {independentBorders ? (
            <>
              <div className="flex gap-4">
                <CustomInput
                  label="T"
                  id="borderTopWidth"
                  onChange={handleChange}
                  value={styles.borderTopWidth}
                />
                <CustomInput
                  label="R"
                  id="borderRightWidth"
                  onChange={handleChange}
                  value={styles.borderRightWidth}
                />
              </div>
              <div className="flex gap-4">
                <CustomInput
                  label="B"
                  id="borderBottomWidth"
                  onChange={handleChange}
                  value={styles.borderBottomWidth}
                />
                <CustomInput
                  label="L"
                  id="borderLeftWidth"
                  onChange={handleChange}
                  value={styles.borderLeftWidth}
                />
              </div>
            </>
          ) : (
            <CustomInput
              label="B"
              id="borderWidth"
              onChange={handleChange}
              value={styles.borderWidth}
            />
          )}

          <CustomColorInput
            onChangeColor={(value: string) => {
              handleChange({ target: { id: "borderColor", value } });
            }}
            value={styles.borderColor || "#000000"}
          />
        </div>
      </div>
    </AccordionContent>
  );
};
