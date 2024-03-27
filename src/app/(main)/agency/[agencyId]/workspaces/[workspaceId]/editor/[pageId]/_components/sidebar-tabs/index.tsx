import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Plus, SettingsIcon, SquareStackIcon } from "lucide-react";

export const TabList = () => {
  return (
    <TabsList className="mt-2 flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4">
      <TabsTrigger
        value="Settings"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted focus-visible:ring-0"
      >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted focus-visible:ring-0"
      >
        <Plus />
      </TabsTrigger>
      <TabsTrigger
        value="Layers"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted focus-visible:ring-0"
      >
        <SquareStackIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted focus-visible:ring-0"
      >
        <Database />
      </TabsTrigger>
    </TabsList>
  );
};
