import "react-color-palette/css";
import { useState } from "react";
import { ColorPicker, IColor, useColor } from "react-color-palette";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomInputProps extends InputProps {
  label: string;
}

export const CustomInput = ({
  label,
  onChange,
  value,
  id,
}: CustomInputProps) => {
  return (
    <div className="flex-1 flex items-center gap-2 border-muted border-[1px] pl-2 p-1">
      <span className="text-xs w-[15px] text-center text-muted-foreground">
        {label}
      </span>
      <Input
        id={id}
        value={value || ""}
        onChange={onChange}
        placeholder="0px"
        className="text-xs outline-none border-none rounded-none focus-visible:ring-0 p-1 h-6"
      />
    </div>
  );
};

interface CustomColorInputProps {
  value: string;
  onChangeColor: (e: any) => void;
}

export const CustomColorInput = ({
  onChangeColor,
  value,
}: CustomColorInputProps) => {
  // const [opacity, setOpacity] = useState(1);
  const [color, setColor] = useColor(value);

  const handleChange = (color: IColor) => {
    setColor(color);
    // setOpacity(parseFloat(color.rgb.a.toFixed(2)));
    onChangeColor(color.hex);
  };

  // const handleOpacity = (e: any) => {
  //   const opa = parseInt(e.target.value) / 100;
  //   const updatedColor: IColor = { ...color, rgb: { ...color.rgb, a: opa } };
  //   setColor(updatedColor);
  //   setOpacity(opa);
  // };

  return (
    <div className="flex items-center border-muted border-[1px]">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex h-9 items-center gap-2 px-2 w-full text-xs cursor-default">
            <div
              style={{ backgroundColor: color.hex }}
              className="h-[22px] w-[22px] bg-muted-foreground border-none rounded-none"
            />
            <Separator orientation="vertical" />
            <div className="w-[50%]">{color.hex}</div>
            <Separator orientation="vertical" />
            <div>{Number(color.rgb.a * 100).toFixed(0) + "%"}</div>
          </div>
        </PopoverTrigger>
        <PopoverContent side="left" className="z-[200]">
          <ColorPicker height={100} color={color} onChange={handleChange} />
        </PopoverContent>
      </Popover>
      {/* <Input
        value={color.hex}
        //   onChange={handleChange}
        placeholder="background color"
        className="w-[60%] text-xs outline-none border-y-0 border-x-[1px] rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 px-2 py-0"
      />
      <Input
        value={opacity * 100 + "%"}
        onChange={handleOpacity}
        placeholder="opacity"
        className="w-[28%] text-xs outline-none border-none rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 px-2 py-0"
      /> */}
    </div>
  );
};

interface CustomSelectInputProps {
  handleOnChanges: (e: any) => void;
  label: string;
  list: string[];
  value: string;
}

export const CustomSelectInput = ({
  handleOnChanges,
  list,
  label,
  value,
}: CustomSelectInputProps) => {
  return (
    <Select onValueChange={handleOnChanges} value={value}>
      <SelectTrigger className="flex-1 h-[34px] text-xs outline-none rounded-none focus:ring-0">
        <SelectValue placeholder="Select a weight" />
      </SelectTrigger>
      <SelectContent className="z-[200]">
        <SelectGroup>
          <SelectLabel className="text-xs">{label}</SelectLabel>
          {list.map((value) => (
            <SelectItem
              className="text-xs font-light"
              key={value}
              value={value}
            >
              {value === "normal"
                ? "Regular"
                : value.toUpperCase().substring(0, 1) + value.substring(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
