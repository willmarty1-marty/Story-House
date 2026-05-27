"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Block, BlockSpan, MediaItem } from "@/lib/types";

type Props = {
  block: Block;
  onChange: (id: string, updates: Partial<Omit<Block, "id" | "type">>) => void;
  onRemove: (id: string) => void;
  removable: boolean;
};

const spanLabels: Record<BlockSpan, string> = { 1: "⅓", 2: "½", 3: "Full" };

export default function BlockItem({ block, onChange, onRemove, removable }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    gridColumn: `span ${block.span}`,
  };

  const inputRef = typeof window !== "undefined" ? { current: null as HTMLInputElement | null } : { current: null };

  function handleFile(file: File) {
    const type = file.type.startsWith("video/") ? "video" : "photo";
    const url = URL.createObjectURL(file);
    const media: MediaItem = { id: crypto.randomUUID(), type, url, file };
    onChange(block.id, { media } as never);
  }

  const media = block.type === "media" ? block.media : null;
  const text = block.type === "text" ? block.text : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group flex flex-col rounded-lg overflow-hidden"
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-1 px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "var(--cream-dark)", borderBottom: "1px solid var(--border)" }}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 flex flex-col gap-0.5 opacity-50 hover:opacity-100"
          title="Drag to reorder"
        >
          {[0, 1].map((i) => (
            <span key={i} className="block w-3 h-0.5 rounded" style={{ background: "var(--ink)" }} />
          ))}
        </button>

        {/* Span controls */}
        <div className="flex gap-0.5 flex-1">
          {([1, 2, 3] as BlockSpan[]).map((s) => (
            <button
              key={s}
              onClick={() => onChange(block.id, { span: s } as never)}
              className="text-xs px-1.5 py-0.5 rounded transition-colors"
              style={{
                background: block.span === s ? "var(--gold)" : "transparent",
                color: block.span === s ? "var(--cream)" : "var(--ink-light)",
                fontFamily: "'Lora', serif",
                border: `1px solid ${block.span === s ? "var(--gold)" : "var(--border)"}`,
              }}
            >
              {spanLabels[s]}
            </button>
          ))}
        </div>

        {removable && (
          <button
            onClick={() => onRemove(block.id)}
            className="opacity-40 hover:opacity-80 text-base leading-none px-1"
            style={{ color: "var(--ink)" }}
          >
            ×
          </button>
        )}
      </div>

      {/* Block content */}
      {block.type === "media" ? (
        <div
          className="flex-1"
          style={{
            border: "1px solid var(--border)",
            borderTop: "none",
            background: media ? "transparent" : "var(--cream-dark)",
            height: "12rem",
            overflow: "hidden",
          }}
        >
          {media ? (
            <div className="relative w-full h-full">
              {media.type === "video" ? (
                <video src={media.url} className="w-full h-full object-cover" controls />
              ) : (
                <img src={media.url} alt="" className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => onChange(block.id, { media: null } as never)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--ink)", color: "var(--cream)" }}
              >
                ×
              </button>
            </div>
          ) : (
            <label
              className="flex flex-col items-center justify-center gap-1.5 cursor-pointer w-full h-full"
              style={{ minHeight: "8rem" }}
            >
              <span className="text-xl" style={{ color: "var(--gold-muted)" }}>⊕</span>
              <span className="text-xs" style={{ fontFamily: "'Lora', serif", color: "var(--ink-light)" }}>
                Add Photo or Video
              </span>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </label>
          )}
        </div>
      ) : (
        <textarea
          value={text}
          onChange={(e) => onChange(block.id, { text: e.target.value } as never)}
          placeholder="Type your story here…"
          rows={4}
          className="flex-1 resize-none outline-none px-3 py-3 text-sm leading-relaxed"
          style={{
            fontFamily: "'Lora', serif",
            color: "var(--ink)",
            background: "var(--cream-dark)",
            border: "1px solid var(--border)",
            borderTop: "none",
          }}
        />
      )}
    </div>
  );
}
