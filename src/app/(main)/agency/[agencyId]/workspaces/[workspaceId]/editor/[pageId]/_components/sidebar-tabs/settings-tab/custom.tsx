import { EditorState } from "@/components/providers/editor/editor-types";
import { AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface Props {
  state: EditorState;
  onChange: (e: any) => void;
}

export const CustomSection = ({ onChange: handleChange, state }: Props) => {
  const { content, type } = state.editor.selectedElement;

  if (Array.isArray(content)) return;

  return (
    <AccordionContent>
      <div className="flex flex-col gap-4">
        {(type === "link" || type === "text") && (
          <div>
            <p className="text-xs text-muted-foreground">Text</p>
            <Input
              id="innerText"
              value={content.innerText || ""}
              onChange={handleChange}
              placeholder="text"
              className="text-xs outline-none border-[1px] rounded-none focus-visible:ring-0 p-4 h-6"
            />
          </div>
        )}
        {type === "link" && (
          <div>
            <p className="text-xs text-muted-foreground">Link</p>
            <Input
              id="href"
              value={content.href || ""}
              onChange={handleChange}
              placeholder="www.google.com"
              className="text-xs outline-none border-[1px] rounded-none focus-visible:ring-0 p-4 h-6"
            />
          </div>
        )}
        {type === "video" && (
          <div>
            <p className="text-xs text-muted-foreground">Video URL</p>
            <Input
              id="src"
              value={content.src || ""}
              onChange={handleChange}
              placeholder="video url"
              className="text-xs outline-none border-[1px] rounded-none focus-visible:ring-0 p-4 h-6"
            />
          </div>
        )}
      </div>
    </AccordionContent>
  );
};
