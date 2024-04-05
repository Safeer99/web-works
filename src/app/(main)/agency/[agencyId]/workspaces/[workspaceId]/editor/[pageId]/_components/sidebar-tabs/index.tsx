import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Database, Plus, SettingsIcon, SquareStackIcon } from "lucide-react";

export const TabList = () => {
  return (
    <TooltipProvider>
      <TabsList className="mt-2 flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4">
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger
              asChild
              value="Settings"
              className="w-10 h-10 p-2 data-[state=active]:bg-muted focus-visible:ring-0"
            >
              <SettingsIcon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">Settings</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger
              asChild
              value="Components"
              className="w-10 h-10 p-2 data-[state=active]:bg-muted focus-visible:ring-0"
            >
              <Plus />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">Components</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger
              asChild
              value="Layers"
              className="w-10 h-10 p-2 data-[state=active]:bg-muted focus-visible:ring-0"
            >
              <SquareStackIcon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">Layers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger
              asChild
              value="Media"
              className="w-10 h-10 p-2 data-[state=active]:bg-muted focus-visible:ring-0"
            >
              <Database />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">Media</TooltipContent>
        </Tooltip>
      </TabsList>
    </TooltipProvider>
  );
};
