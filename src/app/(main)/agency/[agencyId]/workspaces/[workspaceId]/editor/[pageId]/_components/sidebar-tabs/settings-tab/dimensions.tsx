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
import { Hint } from "@/components/hint";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const DimensionsSection = ({ state, onChange: handleChange }: Props) => {
  const { styles, type } = state.editor.selectedElement;
  const [independentMargin, setIndependentMargin] = useState(false);
  const [independentPadding, setIndependentPadding] = useState(false);
  const [independentCorners, setIndependentCorners] = useState(false);

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4 text-xs text-muted-foreground">
        {type !== "__body" && (
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
        )}

        {type !== "__body" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-4">
              <p>Border Radius</p>
              <Hint label="Independent Corners">
                <Scan
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIndependentCorners(!independentCorners)}
                />
              </Hint>
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
        )}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">Margin</p>
            <Hint label="Independent Margin">
              <Scan
                size={16}
                className="cursor-pointer"
                onClick={() => setIndependentMargin(!independentMargin)}
              />
            </Hint>
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
            <Hint label="Independent Padding">
              <Scan
                size={16}
                className="cursor-pointer"
                onClick={() => setIndependentPadding(!independentPadding)}
              />
            </Hint>
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
