"use client";

import clsx from "clsx";
import { useState } from "react";
import { BoxSelect, GripHorizontal, Scan, Square } from "lucide-react";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { Hint } from "@/components/hint";
import {
  CustomColorInput,
  CustomInput,
  CustomTabsInput,
} from "../custom-inputs";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const BorderSection = ({ state, onChange: handleChange }: Props) => {
  const { styles } = state.editor.selectedElement;

  const [independentCorners, setIndependentCorners] = useState(false);
  const [selectedBorder, setSelectedBorder] = useState<
    "border" | "borderLeft" | "borderRight" | "borderTop" | "borderBottom"
  >("border");

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4 text-xs">
        <div className="grid grid-cols-3 gap-3 justify-between">
          <div className="flex items-center gap-3">
            <Hint label="All corners">
              <Square
                className={clsx("p-1 rounded cursor-pointer", {
                  "bg-muted": !independentCorners,
                })}
                onClick={() => setIndependentCorners(false)}
              />
            </Hint>
            <Hint label="Independent corners">
              <Scan
                className={clsx("p-1 rounded cursor-pointer", {
                  "bg-muted": independentCorners,
                })}
                onClick={() => setIndependentCorners(true)}
              />
            </Hint>
          </div>
          <div className="col-start-2 col-end-4">
            <CustomInput
              id="borderRadius"
              label="Radius"
              value={styles.borderRadius}
              onChange={handleChange}
            />
          </div>
        </div>
        {independentCorners && (
          <div className="grid grid-cols-2 grid-rows-2 gap-3 gap-y-3">
            <CustomInput
              id="borderTopLeftRadius"
              label="TL"
              value={styles.borderTopLeftRadius}
              onChange={handleChange}
            />
            <CustomInput
              id="borderTopRightRadius"
              label="TR"
              value={styles.borderTopRightRadius}
              onChange={handleChange}
            />
            <CustomInput
              id="borderBottomLeftRadius"
              label="BL"
              value={styles.borderBottomLeftRadius}
              onChange={handleChange}
            />
            <CustomInput
              id="borderBottomRightRadius"
              label="BR"
              value={styles.borderBottomRightRadius}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <p>Borders</p>
          <div className="flex gap-3 items-center">
            <div className="grid grid-rows-3 grid-cols-3 place-items-center w-[80px] gap-y-1.5 gap-x-2">
              <div
                className={clsx(
                  "col-start-2 col-end-3 row-start-1 row-end-2 rounded cursor-pointer size-5 p-1",
                  {
                    "bg-muted": selectedBorder === "borderTop",
                  }
                )}
                onClick={() => setSelectedBorder("borderTop")}
              >
                <Hint label="Border Top">
                  <div className="w-full h-full border-[1px] border-slate-400 border-t-2 border-t-slate-100" />
                </Hint>
              </div>
              <div
                className={clsx(
                  "col-start-1 col-end-2 row-start-2 row-end-3 rounded cursor-pointer size-5 p-1",
                  {
                    "bg-muted": selectedBorder === "borderLeft",
                  }
                )}
                onClick={() => setSelectedBorder("borderLeft")}
              >
                <Hint label="Border Left">
                  <div className="w-full h-full border-[1px] border-slate-400 border-l-2 border-l-slate-100" />
                </Hint>
              </div>
              <div
                className={clsx(
                  "col-start-2 col-end-3 row-start-2 row-end-3 rounded cursor-pointer size-5 p-1",
                  {
                    "bg-muted": selectedBorder === "border",
                  }
                )}
                onClick={() => setSelectedBorder("border")}
              >
                <Hint label="All Borders">
                  <div className="w-full h-full border-[1.5px] border-slate-100" />
                </Hint>
              </div>
              <div
                className={clsx(
                  "col-start-3 col-end-4 row-start-2 row-end-3 rounded cursor-pointer size-5 p-1",
                  {
                    "bg-muted": selectedBorder === "borderRight",
                  }
                )}
                onClick={() => setSelectedBorder("borderRight")}
              >
                <Hint label="Border Right">
                  <div className="w-full h-full border-[1px] border-slate-400 border-r-2 border-r-slate-100" />
                </Hint>
              </div>
              <div
                className={clsx(
                  "col-start-2 col-end-3 row-start-3 row-end-4 rounded cursor-pointer size-5 p-1",
                  {
                    "bg-muted": selectedBorder === "borderBottom",
                  }
                )}
                onClick={() => setSelectedBorder("borderBottom")}
              >
                <Hint label="Border Bottom">
                  <div className="w-full h-full border-[1px] border-slate-400 border-b-2 border-b-slate-100" />
                </Hint>
              </div>
            </div>

            <div className="flex max-w-[65%] w-full flex-col gap-2">
              <CustomInput
                id={`${selectedBorder}Width`}
                label="Width"
                value={styles[`${selectedBorder}Width`]}
                onChange={handleChange}
                wFull
              />
              <CustomColorInput
                label="Color"
                onChangeColor={(value: string) => {
                  handleChange({
                    target: { id: `${selectedBorder}Color`, value },
                  });
                }}
                value={
                  styles[`${selectedBorder}Color`]?.toString() || "#FFFFFF"
                }
                hideOpacity
              />
              <CustomTabsInput
                label="Style"
                value={styles[`${selectedBorder}Style`]?.toString() || "solid"}
                list={[
                  {
                    children: (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    ),
                    value: "solid",
                  },
                  {
                    children: (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z"></path>
                      </svg>
                    ),
                    value: "dashed",
                  },
                  {
                    children: (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M112 476h72v72h-72zm182 0h72v72h-72zm364 0h72v72h-72zm182 0h72v72h-72zm-364 0h72v72h-72z"></path>
                      </svg>
                    ),
                    value: "dotted",
                  },
                ]}
                onValueChange={(value: string) => {
                  handleChange({
                    target: {
                      id: `${selectedBorder}Style`,
                      value,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AccordionContent>
  );
};
