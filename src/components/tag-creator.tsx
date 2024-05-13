"use client";

import { PlusCircleIcon, TrashIcon, X } from "lucide-react";
import { v4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tag } from "@prisma/client";

import { deleteTag, getTagsForAgency, upsertTag } from "@/lib/board-service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TagComponent } from "@/components/tag";

type Props = {
  agencyId: string;
  getSelectedTags: (tags: Tag[]) => void;
  defaultTags?: Tag[];
};

const TagColors = ["BLUE", "ORANGE", "ROSE", "PURPLE", "GREEN"] as const;
export type TagColor = (typeof TagColors)[number];

export const TagCreator = ({
  getSelectedTags,
  agencyId,
  defaultTags,
}: Props) => {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [value, setValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags || []);

  useEffect(() => {
    getSelectedTags(selectedTags);
  }, [selectedTags, getSelectedTags]);

  useEffect(() => {
    if (agencyId) {
      const fetchData = async () => {
        const response = await getTagsForAgency(agencyId);
        if (response) setTags(response);
      };
      fetchData();
    }
  }, [agencyId]);

  const handleAddSelections = (tag: Tag) => {
    if (selectedTags.every((t) => t.id !== tag.id)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleDeleteSelection = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const handleAddTag = async () => {
    if (!value) {
      toast.error("Tags need to have a name");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    const tagData: Tag = {
      color: selectedColor,
      createdAt: new Date(),
      id: v4(),
      name: value,
      agencyId,
      updatedAt: new Date(),
    };

    setTags((prev) => [...prev, tagData]);
    setValue("");
    setSelectedColor("");
    try {
      const response = await upsertTag(agencyId, tagData);
      toast.success("Created the tag");
    } catch (error) {
      toast.error("Could not create tag");
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
    try {
      const response = await deleteTag(tagId);
      toast.success("Tag is deleted");
      router.refresh();
    } catch (error) {
      toast.error("Could not delete tag");
    }
  };

  return (
    <AlertDialog>
      <Command className="bg-transparent">
        {!!selectedTags.length && (
          <div className="flex flex-wrap gap-2 p-2 bg-background border-2 border-border rounded-md">
            {selectedTags.map((tag) => (
              <div key={tag.id} className="flex items-center">
                <TagComponent title={tag.name} colorName={tag.color} />
                <X
                  size={14}
                  className="text-muted-foreground cursor-pointer"
                  onClick={() => handleDeleteSelection(tag.id)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 my-2">
          {TagColors.map((colorName) => (
            <TagComponent
              key={colorName}
              selectedColor={setSelectedColor}
              title=""
              colorName={colorName}
            />
          ))}
        </div>
        <div className="relative">
          <CommandInput
            placeholder="Search for tag..."
            value={value}
            onValueChange={setValue}
          />
          <PlusCircleIcon
            onClick={handleAddTag}
            size={20}
            className="absolute top-1/2 transform -translate-y-1/2 right-2 hover:text-primary transition-all cursor-pointer text-muted-foreground"
          />
        </div>
        <CommandList>
          <ScrollArea className="w-full h-52">
            <CommandSeparator />
            <CommandGroup heading="Tags">
              {tags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  className="hover:!bg-secondary !bg-transparent flex items-center justify-between !font-light cursor-pointer"
                >
                  <div onClick={() => handleAddSelections(tag)}>
                    <TagComponent title={tag.name} colorName={tag.color} />
                  </div>

                  <AlertDialogTrigger>
                    <TrashIcon
                      size={16}
                      className="cursor-pointer text-muted-foreground hover:text-rose-400  transition-all"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent className="z-[600]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-left">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-left">
                        This action cannot be undone. This will permanently
                        delete your the tag and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="items-center">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        Delete Tag
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty>No results found.</CommandEmpty>
          </ScrollArea>
        </CommandList>
      </Command>
    </AlertDialog>
  );
};
