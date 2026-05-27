"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BlockCanvas from "./BlockCanvas";
import type { Block, Chapter } from "@/lib/types";

type Props = {
  chapter: Chapter;
  index: number;
  onChange: (id: string, updates: Partial<Chapter>) => void;
  onRemove: (id: string) => void;
  removable: boolean;
};

export default function ChapterCard({ chapter, index, onChange, onRemove, removable }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: "var(--cream)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Chapter header */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--cream-dark)" }}
      >
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex flex-col gap-0.5 p-1 opacity-40 hover:opacity-70 transition-opacity"
          title="Drag to reorder chapter"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-4 h-0.5 rounded" style={{ background: "var(--ink)" }} />
          ))}
        </button>

        <span
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: "'Lora', serif", color: "var(--gold)", minWidth: "4.5rem" }}
        >
          Chapter {index + 1}
        </span>

        <input
          type="text"
          value={chapter.title}
          onChange={(e) => onChange(chapter.id, { title: e.target.value })}
          className="flex-1 bg-transparent outline-none text-base font-semibold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--ink)" }}
          placeholder="Chapter title…"
        />

        {removable && (
          <button
            onClick={() => onRemove(chapter.id)}
            className="opacity-30 hover:opacity-70 transition-opacity text-lg leading-none"
            style={{ color: "var(--ink)" }}
            title="Remove chapter"
          >
            ×
          </button>
        )}
      </div>

      {/* Block canvas */}
      <div className="p-4">
        <BlockCanvas
          blocks={chapter.blocks}
          onChange={(blocks: Block[]) => onChange(chapter.id, { blocks })}
        />
      </div>
    </div>
  );
}
