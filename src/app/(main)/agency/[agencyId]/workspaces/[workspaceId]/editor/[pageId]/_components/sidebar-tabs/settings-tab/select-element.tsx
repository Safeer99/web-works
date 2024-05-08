import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, GripVertical, Plus, Trash } from "lucide-react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CustomInput } from "../custom-inputs";

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Id must be at least 2 characters.",
  }),
  value: z.string().min(2, {
    message: "Value must be at least 2 characters.",
  }),
});

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const SelectElementSection = ({
  onChange: handleChange,
  state,
}: Props) => {
  const { content } = state.editor.selectedElement;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      value: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [items, setItems] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (!Array.isArray(content) && content.items) {
      setItems(content.items);
    }
  }, [content]);

  const handleOnClick = () => {
    form.reset({ id: "", value: "" });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    form.reset({
      id: items[index].id,
      value: items[index].value,
    });
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedItems = [...items].toSpliced(index, 1);
    handleChange({
      target: {
        id: "items",
        value: updatedItems,
      },
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let updatedList = [];
    if (editIndex != null) {
      const listWithoutEditedElement = [...items].toSpliced(editIndex, 1);
      if (listWithoutEditedElement.find((item) => item.id === values.id)) {
        return form.setError("id", {
          type: "custom",
          message: "Id must be unique",
        });
      }
      updatedList = [...items].toSpliced(editIndex, 1, values);
    } else {
      if (items.find((item) => item.id === values.id)) {
        return form.setError("id", {
          type: "custom",
          message: "Id must be unique",
        });
      }
      updatedList = [...items, values];
    }
    handleChange({
      target: {
        id: "items",
        value: updatedList,
      },
    });
    setOpen(false);
  };

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    const newOrder = [...items]
      .toSpliced(source.index, 1)
      .toSpliced(destination.index, 0, items[source.index]);

    setItems(newOrder);
    handleChange({
      target: {
        id: "items",
        value: newOrder,
      },
    });
  };

  if (Array.isArray(content)) return;

  return (
    <AccordionContent>
      <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <p>Choices</p>
            <PopoverTrigger asChild>
              <Plus onClick={handleOnClick} className="cursor-pointer size-4" />
            </PopoverTrigger>
          </div>
          <div className="h-fit min-h-10 border-muted border-[1px] rounded p-1 py-2">
            {items.length ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="itemsList"
                  direction="vertical"
                  key="itemsList"
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-2"
                    >
                      {items.map((item, idx) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={idx}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className="w-full relative flex gap-1 bg-background text-muted-foreground"
                            >
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="size-4" />
                              </div>
                              <div className="w-full flex justify-between items-center gap-2 text-xs">
                                <span className="text-foreground truncate w-32">
                                  {item.value}
                                </span>
                                <div className="flex items-center gap-3 pr-2">
                                  <Edit2
                                    onClick={() => handleEdit(idx)}
                                    className="size-3 cursor-pointer"
                                  />
                                  <Trash
                                    onClick={() => handleDelete(idx)}
                                    className="size-3 cursor-pointer"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="p-2 text-center text-xs text-muted-foreground">
                start adding items
              </div>
            )}
          </div>
        </div>
        <PopoverContent side="left" className="w-64 z-[250]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-end gap-3"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        label="Id"
                        placeholder="first"
                        wFull
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        label="Value"
                        placeholder="First Element"
                        wFull
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button size="sm" className="self-end" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </AccordionContent>
  );
};
