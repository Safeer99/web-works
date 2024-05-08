import { useEditor } from "@/components/providers/editor";
import { EditorElement } from "@/components/providers/editor/editor-types";
import { useState } from "react";
import { LayerItem } from "./layer-item";

interface Props {
  elements?: EditorElement[];
  level?: number;
}

export const LayersTab = ({ elements, level = 0 }: Props) => {
  const { state, dispatch } = useEditor();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOnClick = (id: string) => {
    const selectedElement = elements?.find((item) => item.id === id);
    if (selectedElement) {
      dispatch({
        type: "CHANGE_CLICKED_ELEMENT",
        payload: {
          elementDetails: {
            ...selectedElement,
            position: { x: 0, y: 0, h: 0, w: 0 },
          },
        },
      });
    }
  };

  return (
    <div>
      {elements?.map((item) => (
        <div key={item.id}>
          <LayerItem
            label={item.name}
            expanded={expanded[item.id]}
            level={level}
            active={state.editor.selectedElement.id === item.id}
            hasChildren={Array.isArray(item.content) && !!item.content.length}
            onClick={() => handleOnClick(item.id)}
            handleExpand={() => handleExpand(item.id)}
          />
          {expanded[item.id] && Array.isArray(item.content) && (
            <LayersTab elements={item.content} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};
