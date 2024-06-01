import clsx from "clsx";
import Image from "next/image";
import { intlFormatDistance, subDays } from "date-fns";
import { Associate, User } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  data: (Associate & {
    user: User;
  })[];
}

export const RecentActivity = ({ data }: Props) => {
  const borderLine = subDays(new Date(), 7);

  const filteredData = data.filter((user) => user.createdAt > borderLine);

  return (
    <div className="border-[1px] rounded-lg shadow shadow-primary p-2 overflow-hidden bg-background">
      <h2 className="p-2 text-xl">Recently Joined</h2>
      <ScrollArea>
        <Command className="w-full min-w-[600px] mb-2">
          <CommandList>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex-1 flex items-center gap-4">
                    <div className="h-8 w-8 relative flex-none">
                      <Image
                        src={item.user.imageUrl}
                        fill
                        className="rounded-full object-cover"
                        alt="avatar image"
                      />
                    </div>
                    <div className="text-sm flex flex-col">
                      <span>{item.user.name}</span>
                      <span className="text-xs  text-muted-foreground">
                        {item.user.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <Badge
                      className={clsx("bg-slate-500 cursor-default", {
                        "bg-emerald-500": item.role === "AGENCY_OWNER",
                        "bg-orange-400": item.role === "AGENCY_ADMIN",
                      })}
                    >
                      {item.role}
                    </Badge>
                    <div>
                      <span className="text-muted-foreground">
                        {intlFormatDistance(item.createdAt, new Date())}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              ))}
              {filteredData.length === 0 && (
                <div className="my-8 text-sm text-center text-muted-foreground">
                  No results found.
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
