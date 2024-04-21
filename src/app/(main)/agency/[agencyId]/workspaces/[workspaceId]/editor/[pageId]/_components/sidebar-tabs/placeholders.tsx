import { EditorBtns } from "@/components/providers/editor/editor-types";
import {
  BoxSelect,
  Contact2Icon,
  Image as ImageIcon,
  Link2Icon,
  TypeIcon,
  Youtube,
} from "lucide-react";

export const TextPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "text")}
      className="h-14 w-14 hover:bg-muted rounded-lg flex items-center justify-center border-2 hover:border-primary cursor-grab transition-all group/placeholder"
    >
      <TypeIcon
        size={30}
        className="text-muted-foreground group-hover/placeholder:text-white"
      />
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
      className="h-14 w-14 hover:bg-muted/70 rounded-lg flex items-center justify-center border-2 hover:border-primary cursor-grab transition-all group/placeholder"
    >
      <BoxSelect
        size={30}
        className="text-muted-foreground group-hover/placeholder:text-white"
      />
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
      className=" h-14 w-14 hover:bg-muted rounded-lg flex items-center justify-center border-2 hover:border-primary cursor-grab transition-all group/placeholder"
    >
      <Link2Icon
        size={30}
        className="text-muted-foreground group-hover/placeholder:text-white"
      />
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
      className="h-14 w-14 hover:bg-muted rounded-lg flex items-center justify-center border-2 hover:border-primary cursor-grab transition-all group/placeholder"
    >
      <Youtube
        size={30}
        className="text-muted-foreground group-hover/placeholder:text-white"
      />
    </div>
  );
};

export const ImagePlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "image")}
      className="h-14 w-14 hover:bg-muted rounded-lg flex items-center justify-center border-2 hover:border-primary cursor-grab transition-all group/placeholder"
    >
      <ImageIcon
        size={30}
        className="text-muted-foreground group-hover/placeholder:text-white"
      />
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
      className=" h-14 w-14 hover:bg-muted rounded-lg flex items-center justify-center border-2 hover:border-primary cursor-grab transition-all group/placeholder"
    >
      <Contact2Icon
        size={30}
        className="text-muted-foreground group-hover/placeholder:text-white"
      />
    </div>
  );
};
