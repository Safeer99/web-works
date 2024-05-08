import "react-color-palette/css";
import clsx from "clsx";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CustomInputProps extends InputProps {
  label: string;
  wFull?: boolean;
}

export const CustomInput = ({
  label,
  value,
  placeholder,
  wFull = false,
  ...props
}: CustomInputProps) => {
  return (
    <div className="flex-1 flex items-center justify-between gap-2">
      <div className="text-xs text-left text-muted-foreground">
        <span>{label}</span>
      </div>
      <Input
        {...props}
        value={value || ""}
        placeholder={placeholder || "0px"}
        className={clsx(
          "text-xs w-[56px] max-w-[173px] outline-none border-[1px] border-muted rounded focus-visible:border-primary focus-visible:ring-0 p-1 px-2 h-7",
          {
            "w-full": wFull,
          }
        )}
      />
    </div>
  );
};

interface CustomColorInputProps {
  value: string;
  label: string;
  onChangeColor: (e: any) => void;
  hideOpacity?: boolean;
}

export const CustomColorInput = ({
  onChangeColor,
  label,
  value,
  hideOpacity = false,
}: CustomColorInputProps) => {
  const [color, setColor] = useColor(value);

  const handleChange = (color: IColor) => {
    setColor(color);
    onChangeColor(color.hex);
  };

  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <div className="text-muted-foreground">{label}</div>
      <Popover>
        <PopoverTrigger asChild>
          <div className="h-7 max-w-[172px] w-full flex items-center cursor-pointer border-[1px] border-muted rounded overflow-hidden">
            <div
              style={{ backgroundColor: color.hex }}
              className="h-full w-6 bg-muted-foreground rounded-none"
            />
            <Separator orientation="vertical" />
            <div className="flex-grow px-2">{color.hex}</div>
            {!hideOpacity && (
              <>
                <Separator orientation="vertical" />
                <div className="px-2 text-xs">
                  {Number(color.rgb.a * 100).toFixed(0) + "%"}
                </div>
              </>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent side="left" className="z-[200]">
          <ColorPicker height={100} color={color} onChange={handleChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface CustomSelectInputProps {
  onValueChange: (value: string) => void;
  label: string;
  list: string[];
  value: string;
}

export const CustomSelectInput = ({
  onValueChange,
  list,
  label,
  value,
}: CustomSelectInputProps) => {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <div className="text-muted-foreground">{label}</div>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className="text-xs h-7 w-[172px] outline-none rounded focus:border-primary focus:ring-0">
          <SelectValue placeholder="Select a weight" />
        </SelectTrigger>
        <SelectContent className="z-[200]">
          <SelectGroup>
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
    </div>
  );
};

interface CustomTabsInputProps {
  label: string;
  value: string;
  list: {
    children: React.ReactNode;
    value: string;
  }[];
  onValueChange: (value: string) => void;
}

export const CustomTabsInput = ({
  label,
  list,
  onValueChange,
  value,
}: CustomTabsInputProps) => {
  return (
    <Tabs
      className="flex gap-2 items-center justify-between"
      value={value}
      onValueChange={onValueChange}
    >
      <div className="text-muted-foreground text-xs">{label}</div>
      <TabsList className="text-xs h-7 max-w-[172px] w-full p-1 flex rounded">
        {list.map(({ children, value }, index) => (
          <TabsTrigger
            key={index}
            value={value}
            className="text-xs truncate flex-1 px-1 w-7 h-6 [&>*]:size-4"
          >
            {children}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
