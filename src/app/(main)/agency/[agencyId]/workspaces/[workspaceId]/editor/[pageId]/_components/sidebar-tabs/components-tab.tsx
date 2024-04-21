import { EditorBtns } from "@/components/providers/editor/editor-types";
import {
  ContactFormComponentPlaceholder,
  ContainerPlaceholder,
  ImagePlaceholder,
  LinkPlaceholder,
  TextPlaceholder,
  VideoPlaceholder,
} from "./placeholders";

const elements: {
  Component: React.ReactNode;
  label: string;
  id: EditorBtns;
  group: "layout" | "elements";
}[] = [
  {
    Component: <ContainerPlaceholder />,
    label: "Container",
    id: "container",
    group: "layout",
  },
  {
    Component: <TextPlaceholder />,
    label: "Text",
    id: "text",
    group: "elements",
  },
  {
    Component: <LinkPlaceholder />,
    label: "Link",
    id: "link",
    group: "elements",
  },
  {
    Component: <ImagePlaceholder />,
    label: "Image",
    id: "image",
    group: "elements",
  },
  {
    Component: <VideoPlaceholder />,
    label: "Video",
    id: "video",
    group: "elements",
  },
  // {
  //   Component: <ContactFormComponentPlaceholder />,
  //   label: "Contact",
  //   id: "contactForm",
  //   group: "elements",
  // },
];

export const ComponentsTab = () => {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-4 p-2 pt-6">
      {elements.map((element) => (
        <div
          key={element.id}
          className="flex-col items-center justify-center gap-1 flex"
        >
          {element.Component}
          <span className="text-muted-foreground text-xs truncate">
            {element.label}
          </span>
        </div>
      ))}
    </div>
  );
};
