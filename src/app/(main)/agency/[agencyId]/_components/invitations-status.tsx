import clsx from "clsx";
import { intlFormatDistance } from "date-fns";
import { Invitation } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Actions } from "./invitation-actions";

interface Props {
  data: Invitation[];
  isAdmin: boolean;
}

export const InvitationsStatus = ({ data, isAdmin }: Props) => {
  return (
    <div className="border-[1px] rounded-lg shadow shadow-primary p-2 overflow-hidden bg-background">
      <h2 className="p-2 text-xl">Invitations Status</h2>
      <ScrollArea>
        <Command className="w-full min-w-[700px] min-h-[150px]  mb-2">
          <CommandList>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  className="flex items-center justify-between gap-6 py-3 px-2"
                >
                  <div className="w-44 flex items-center justify-center">
                    {item.email}
                  </div>
                  <Badge
                    className={clsx("bg-slate-500 cursor-default", {
                      "bg-emerald-500": item.role === "AGENCY_OWNER",
                      "bg-orange-400": item.role === "AGENCY_ADMIN",
                    })}
                  >
                    {item.role}
                  </Badge>
                  <Badge
                    className={clsx("bg-orange-400 cursor-default", {
                      "bg-emerald-500": item.status === "ACCEPTED",
                      "bg-destructive": item.status === "REJECTED",
                    })}
                  >
                    {item.status}
                  </Badge>
                  <div>
                    <span className="text-muted-foreground">
                      expired {intlFormatDistance(item.expires, new Date())}
                    </span>
                  </div>
                  <Actions data={item} isAdmin={isAdmin} />
                </CommandItem>
              ))}
              {data.length === 0 && (
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
