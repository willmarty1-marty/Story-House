"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import BlockItem from "./BlockItem";
import type { Block, BlockSpan } from "@/lib/types";

type Props = {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
};

export default function BlockCanvas({ blocks, onChange }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    onChange(arrayMove(blocks, oldIndex, newIndex));
  }

  function updateBlock(id: string, updates: Partial<Omit<Block, "id" | "type">>) {
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  }

  function removeBlock(id: string) {
    onChange(blocks.filter((b) => b.id !== id));
  }

  function addMedia() {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type: "media",
      span: blocks.length === 0 ? 3 : (blocks.length === 1 ? 2 : 1) as BlockSpan,
      media: null,
    };
    // Also shrink the last media block if it's full-width and there's only one
    if (blocks.length === 1 && blocks[0].span === 3) {
      onChange([{ ...blocks[0], span: 2 }, newBlock]);
    } else {
      onChange([...blocks, newBlock]);
    }
  }

  function addText() {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type: "text",
      span: 3,
      text: "",
    };
    onChange([...blocks, newBlock]);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Grid canvas */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={rectSortingStrategy}>
          <div
            className="grid gap-2 p-3 rounded-lg"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              background: "#FBF7F0",
              border: "1px solid var(--border)",
              minHeight: "6rem",
            }}
          >
            {blocks.map((block) => (
              <BlockItem
                key={block.id}
                block={block}
                onChange={updateBlock}
                onRemove={removeBlock}
                removable={blocks.length > 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add block buttons */}
      <div className="flex gap-2">
        <button
          onClick={addMedia}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs tracking-wide transition-opacity hover:opacity-70"
          style={{
            border: "1px dashed var(--border)",
            color: "var(--gold)",
            fontFamily: "'Lora', serif",
            background: "transparent",
          }}
        >
          <span className="text-sm leading-none">+</span> Add Photo / Video
        </button>
        <button
          onClick={addText}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs tracking-wide transition-opacity hover:opacity-70"
          style={{
            border: "1px dashed var(--border)",
            color: "var(--ink-light)",
            fontFamily: "'Lora', serif",
            background: "transparent",
          }}
        >
          <span className="text-sm leading-none">+</span> Add Text
        </button>
      </div>
    </div>
  );
}
