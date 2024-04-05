"use client";

import { useState } from "react";
import { Scan } from "lucide-react";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomColorInput, CustomInput } from "./custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const DimensionsSection = ({ state, onChange: handleChange }: Props) => {
  const { styles } = state.editor.selectedElement;
  const [independentMargin, setIndependentMargin] = useState(false);
  const [independentPadding, setIndependentPadding] = useState(false);
  const [independentCorners, setIndependentCorners] = useState(false);
  const [independentBorders, setIndependentBorders] = useState(false);

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <CustomInput
            id="width"
            label="W"
            onChange={handleChange}
            value={styles.width}
          />
          <CustomInput
            id="height"
            label="H"
            onChange={handleChange}
            value={styles.height}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <p>Border Radius</p>
            <Tooltip>
              <TooltipTrigger>
                <Scan
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIndependentCorners(!independentCorners)}
                />
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                Independent corners
              </TooltipContent>
            </Tooltip>
          </div>
          {independentCorners ? (
            <>
              <div className="flex gap-4">
                <CustomInput
                  label="TL"
                  id="borderTopLeftRadius"
                  onChange={handleChange}
                  value={styles.borderTopLeftRadius}
                />
                <CustomInput
                  label="TR"
                  id="borderTopRightRadius"
                  onChange={handleChange}
                  value={styles.borderTopRightRadius}
                />
              </div>
              <div className="flex gap-4">
                <CustomInput
                  label="BL"
                  id="borderBottomLeftRadius"
                  onChange={handleChange}
                  value={styles.borderBottomLeftRadius}
                />
                <CustomInput
                  label="BR"
                  id="borderBottomRightRadius"
                  onChange={handleChange}
                  value={styles.borderBottomRightRadius}
                />
              </div>
            </>
          ) : (
            <CustomInput
              label="B"
              id="borderRadius"
              onChange={handleChange}
              value={styles.borderRadius}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <p>Border</p>
            <Tooltip>
              <TooltipTrigger>
                <Scan
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIndependentBorders(!independentBorders)}
                />
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                Independent borders
              </TooltipContent>
            </Tooltip>
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

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <p>Margin</p>
            <Tooltip>
              <TooltipTrigger>
                <Scan
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIndependentMargin(!independentMargin)}
                />
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                Independent margin
              </TooltipContent>
            </Tooltip>
          </div>
          {independentMargin ? (
            <>
              <div className="flex gap-4">
                <CustomInput
                  label="T"
                  id="marginTop"
                  onChange={handleChange}
                  value={styles.marginTop}
                />
                <CustomInput
                  label="R"
                  id="marginRight"
                  onChange={handleChange}
                  value={styles.marginRight}
                />
              </div>
              <div className="flex gap-4">
                <CustomInput
                  label="B"
                  id="marginBottom"
                  onChange={handleChange}
                  value={styles.marginBottom}
                />
                <CustomInput
                  label="L"
                  id="marginLeft"
                  onChange={handleChange}
                  value={styles.marginLeft}
                />
              </div>
            </>
          ) : (
            <CustomInput
              label="M"
              id="margin"
              onChange={handleChange}
              value={styles.margin}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <p>Padding</p>
            <Tooltip>
              <TooltipTrigger>
                <Scan
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIndependentPadding(!independentPadding)}
                />
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                Independent padding
              </TooltipContent>
            </Tooltip>
          </div>
          {independentPadding ? (
            <>
              <div className="flex gap-4">
                <CustomInput
                  label="T"
                  id="paddingTop"
                  onChange={handleChange}
                  value={styles.paddingTop}
                />
                <CustomInput
                  label="R"
                  id="paddingRight"
                  onChange={handleChange}
                  value={styles.paddingRight}
                />
              </div>
              <div className="flex gap-4">
                <CustomInput
                  label="B"
                  id="paddingBottom"
                  onChange={handleChange}
                  value={styles.paddingBottom}
                />
                <CustomInput
                  label="L"
                  id="paddingLeft"
                  onChange={handleChange}
                  value={styles.paddingLeft}
                />
              </div>
            </>
          ) : (
            <CustomInput
              label="P"
              id="padding"
              onChange={handleChange}
              value={styles.padding}
            />
          )}
        </div>
      </div>
    </AccordionContent>
  );
};
