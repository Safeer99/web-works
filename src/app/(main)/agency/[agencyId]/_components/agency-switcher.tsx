"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Agency, Associate, Role } from "@prisma/client";
import { Building2, Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AgencyForm } from "@/components/forms/agency-form";
import { Modal } from "@/components/modal";

import { useModal } from "@/hooks/use-modals";
import { cn } from "@/lib/utils";

interface Props {
  data: (Associate & { agency: Agency })[];
}

export const AgencySwitcher = ({ data }: Props) => {
  const params = useParams();
  const router = useRouter();

  const modal = useModal();
  const [open, setOpen] = useState(false);

  const agencies = data
    .filter((d) => d.role === Role.AGENCY_OWNER)
    .map((item) => item.agency);
  const associatedAgencies = data
    .filter((d) => d.role !== Role.AGENCY_OWNER)
    .map((item) => item.agency);

  const currentAgency = data.find(
    (item) => item.agencyId === params.agencyId
  )?.agency;

  if (!currentAgency) return;

  const onAccounSelect = (id: string) => {
    if (currentAgency.id === id) return;
    setOpen(false);
    router.push(`/agency/${id}`);
  };

  return (
    <div className="mt-6">
      <AspectRatio ratio={16 / 5}>
        <Image
          src={currentAgency?.agencyLogo}
          alt="Agency logo"
          fill
          className="rounded-md object-contain"
        />
      </AspectRatio>
      <div className="px-4 py-2 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a account"
              className="w-full my-4 flex items-center justify-start gap-2 py-8"
            >
              <Building2 />
              <div className="px-2 flex flex-col text-left truncate w-[75%]">
                {currentAgency.name}
                <span className="text-xs text-muted-foreground">
                  {currentAgency.address}
                </span>
              </div>
              <ChevronsUpDown
                size={16}
                className="ml-auto text-muted-foreground"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-h-80 ml-4 mt-2 z-[100] p-2">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search accounts..." />
                <CommandEmpty>No result found.</CommandEmpty>
                <CommandGroup heading="Personal accounts">
                  {agencies.map((agency) => (
                    <CommandItem
                      key={agency.id}
                      onSelect={() => onAccounSelect(agency.id)}
                      className="text-sm gap-2 px-4 cursor-pointer"
                    >
                      <Building2 />
                      <div className="px-2 flex flex-col text-left truncate w-[75%]">
                        {agency.name}
                        <span className="text-xs text-muted-foreground">
                          {agency.address}
                        </span>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          currentAgency.id === agency.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
                {associatedAgencies.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading="Associated accounts">
                      {associatedAgencies.map((agency) => (
                        <CommandItem
                          key={agency.id}
                          onSelect={() => onAccounSelect(agency.id)}
                          className="text-sm gap-2 px-4 cursor-pointer"
                        >
                          <Building2 />
                          <div className="px-2 flex flex-col text-left truncate w-[75%]">
                            {agency.name}
                            <span className="text-xs text-muted-foreground">
                              {agency.address}
                            </span>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              currentAgency.id === agency.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
              <CommandSeparator />
              <Button
                onClick={() => {
                  setOpen(false);
                  modal.onOpen(
                    <Modal
                      title="Create Agency"
                      description="Create your agency to manage your projects"
                    >
                      <AgencyForm />
                    </Modal>
                  );
                }}
                className="mt-4 mb-2 mx-1"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create agency
              </Button>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
