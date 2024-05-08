"use client";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
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

export const BackgroundSection = ({ state, onChange: handleChange }: Props) => {
  const { styles } = state.editor.selectedElement;
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

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4 text-xs">
        <CustomColorInput
          label="Color"
          onChangeColor={(value: string) => {
            handleChange({ target: { id: "backgroundColor", value } });
          }}
          value={styles.backgroundColor?.toString() || "#FFFFFF"}
        />

        <div className="h-8 flex items-center gap-2 border-muted border-[1px] px-2 rounded">
          <div
            className="size-5 bg-contain bg-no-repeat bg-center border-muted-foreground border-b-[1px]"
            style={{
              backgroundSize: "100px",
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
        {styles.backgroundImage && (
          <>
            <CustomTabsInput
              label="Size"
              value={styles.backgroundSize?.toString() || "auto"}
              list={[
                { children: <>Contain</>, value: "contain" },
                { children: <>Cover</>, value: "cover" },
                { children: <>Auto</>, value: "auto" },
              ]}
              onValueChange={(value: string) => {
                handleChange({
                  target: {
                    id: "backgroundSize",
                    value,
                  },
                });
              }}
            />

            <CustomTabsInput
              label="Repeat"
              value={styles.backgroundRepeat?.toString() || "repeat"}
              list={[
                { children: <>Repeat</>, value: "repeat" },
                { children: <>No-repeat</>, value: "no-repeat" },
                // { Icon: undefined, value: "x" },
                // { Icon: undefined, value: "y" },
              ]}
              onValueChange={(value: string) => {
                handleChange({
                  target: {
                    id: "backgroundRepeat",
                    value,
                  },
                });
              }}
            />

            <CustomSelectInput
              label="Position"
              value={styles.backgroundPosition?.toString() || "left top"}
              list={positions}
              onValueChange={(value: string) => {
                handleChange({
                  target: {
                    id: "backgroundPosition",
                    value,
                  },
                });
              }}
            />

            <div className="grid grid-cols-2 gap-3">
              <CustomInput
                id="backgroundPositionX"
                label="Left"
                onChange={handleChange}
                value={styles.backgroundPositionX}
              />
              <CustomInput
                id="backgroundPositionY"
                label="Top"
                onChange={handleChange}
                value={styles.backgroundPositionY}
              />
            </div>
          </>
        )}
        <div>
          <div className="flex items-center justify-between h-7 text-muted-foreground text-xs">
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
            value={[
              typeof styles?.opacity === "number"
                ? styles?.opacity
                : parseFloat((styles?.opacity || "0").replace("%", "")) || 100,
            ]}
            max={100}
            step={1}
          />
        </div>
      </div>
    </AccordionContent>
  );
};
