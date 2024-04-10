import { db } from "@/lib/db";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { CreateCanvasButton } from "./_components/create-canvas-btn";
import { NotebookPen } from "lucide-react";
import { CanvasCard } from "./_components/canvas-card";

interface Props {
  params: {
    agencyId: string;
  };
}

const CanvasPage = async ({ params }: Props) => {
  const data = await db.canvas.findMany({
    where: {
      agencyId: params.agencyId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">Team Canvas</h2>
        <CreateCanvasButton agencyId={params.agencyId} />
      </div>
      <Command className="bg-transparent">
        <CommandInput placeholder="Search for canvas title..." />
        <CommandList className="max-h-fit">
          <CommandEmpty>No canvas found.</CommandEmpty>
          <CommandGroup heading="Canvas">
            <div className="flex flex-wrap gap-4 pt-1">
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  className="p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white"
                >
                  <CanvasCard data={item} />
                </CommandItem>
              ))}
              {!data?.length && (
                <div className="flex items-center justify-center w-full flex-col">
                  <NotebookPen
                    size={200}
                    className="dark:text-muted text-slate-300"
                  />
                  <p className="text-muted-foreground ">
                    Empty! no canvas to show.
                  </p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CanvasPage;
