import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/components/providers/editor/editor-types";
import {
  ArrowUpRightSquare,
  BoxSelect,
  CaseSensitive,
  CheckSquare,
  ClipboardList,
  Image,
  Link2,
  ListChecks,
  LucideIcon,
  Route,
  Text,
  TextCursorInput,
  TypeIcon,
  Youtube,
} from "lucide-react";

const elements: {
  icon: LucideIcon;
  label: string;
  id: EditorBtns;
  group: "layout" | "elements" | "form";
}[] = [
  {
    icon: BoxSelect,
    label: "Container",
    id: "container",
    group: "elements",
  },
  {
    icon: TypeIcon,
    label: "Text",
    id: "text",
    group: "elements",
  },
  {
    icon: Route,
    label: "Navigate",
    id: "navigate",
    group: "elements",
  },
  {
    icon: Link2,
    label: "Link",
    id: "link",
    group: "elements",
  },
  {
    icon: Image,
    label: "Image",
    id: "image",
    group: "elements",
  },
  {
    icon: Youtube,
    label: "Video",
    id: "video",
    group: "elements",
  },
  {
    icon: ClipboardList,
    label: "Form",
    id: "form",
    group: "form",
  },
  {
    icon: CaseSensitive,
    label: "Label",
    id: "label",
    group: "form",
  },
  {
    icon: TextCursorInput,
    label: "Input",
    id: "input",
    group: "form",
  },
  {
    icon: Text,
    label: "Textarea",
    id: "textarea",
    group: "form",
  },
  {
    icon: ListChecks,
    label: "Select",
    id: "select",
    group: "form",
  },
  {
    icon: CheckSquare,
    label: "Checkbox",
    id: "checkbox",
    group: "form",
  },
  {
    icon: ArrowUpRightSquare,
    label: "Submit",
    id: "submitButton",
    group: "form",
  },
];

export const ComponentsTab = () => {
  return (
    <Accordion
      type="multiple"
      className="w-[255px]"
      defaultValue={["Elements", "Form"]}
    >
      <AccordionItem value="Elements" className="px-4 py-0">
        <AccordionTrigger className="!no-underline text-sm">
          Elements
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-x-2 gap-y-4">
          {elements
            .filter((item) => item.group === "elements")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center gap-1 flex"
              >
                <Placeholder icon={element.icon} type={element.id} />
                <span className="text-muted-foreground text-xs truncate">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Form" className="px-4 py-0">
        <AccordionTrigger className="!no-underline text-sm">
          Form Elements
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-x-2 gap-y-4">
          {elements
            .filter((item) => item.group === "form")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center gap-1 flex"
              >
                <Placeholder icon={element.icon} type={element.id} />
                <span className="text-muted-foreground text-xs truncate">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

interface PlaceholderProps {
  icon: LucideIcon;
  type: EditorBtns;
}

const Placeholder = ({ icon: Icon, type }: PlaceholderProps) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, type)}
      className="h-14 w-14 hover:bg-muted rounded-lg flex items-center justify-center border-2 hover:border-primary cursor-grab transition-all group/placeholder"
    >
      <Icon
        size={30}
        className="text-muted-foreground group-hover/placeholder:text-primary"
      />
    </div>
  );
};
