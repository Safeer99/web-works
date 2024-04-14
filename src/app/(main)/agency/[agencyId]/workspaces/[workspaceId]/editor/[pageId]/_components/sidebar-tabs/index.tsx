import { Hint } from "@/components/hint";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Plus, SettingsIcon, SquareStackIcon } from "lucide-react";

export const TabList = () => {
  return (
    <TabsList className="mt-2 flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-2">
      <TabsTrigger
        value="Settings"
        className="w-10 h-10 p-2 data-[state=active]:bg-muted"
      >
        <Hint label="Settings" side="left" sideOffset={15}>
          <SettingsIcon />
        </Hint>
      </TabsTrigger>

      <TabsTrigger
        value="Components"
        className="w-10 h-10 p-2 data-[state=active]:bg-muted"
      >
        <Hint label="Components" side="left" sideOffset={15}>
          <Plus />
        </Hint>
      </TabsTrigger>

      <TabsTrigger
        value="Layers"
        className="w-10 h-10 p-2 data-[state=active]:bg-muted"
      >
        <Hint label="Layers" side="left" sideOffset={15}>
          <SquareStackIcon />
        </Hint>
      </TabsTrigger>

      <TabsTrigger
        value="Media"
        className="w-10 h-10 p-2 data-[state=active]:bg-muted"
      >
        <Hint label="Database" side="left" sideOffset={15}>
          <Database />
        </Hint>
      </TabsTrigger>
    </TabsList>
  );
};
