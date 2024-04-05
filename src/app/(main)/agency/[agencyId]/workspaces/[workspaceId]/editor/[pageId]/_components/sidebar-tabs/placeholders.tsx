import { EditorBtns } from "@/components/providers/editor/editor-types";
import { Contact2Icon, Link2Icon, TypeIcon, Youtube } from "lucide-react";

export const TextPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "text")}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <TypeIcon size={40} className="text-muted-foreground" />
    </div>
  );
};

export const ContainerPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "container")}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px] cursor-grab"
    >
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full" />
    </div>
  );
};

export const LinkPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "link")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <Link2Icon size={40} className="text-muted-foreground" />
    </div>
  );
};

export const TwoColumnsPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "2Col")}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px] cursor-grab"
    >
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
    </div>
  );
};

export const VideoPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <Youtube size={40} className="text-muted-foreground" />
    </div>
  );
};

export const ContactFormComponentPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center cursor-grab"
    >
      <Contact2Icon size={40} className="text-muted-foreground" />
    </div>
  );
};
