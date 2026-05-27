"use client";

import { useRef, useState } from "react";
import type { MediaItem } from "@/lib/types";

type Props = {
  value: MediaItem | null;
  onChange: (media: MediaItem | null) => void;
  label?: string;
  compact?: boolean;
};

export default function MediaUpload({ value, onChange, label = "Add Media", compact = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    const type = file.type.startsWith("video/") ? "video" : "photo";
    const url = URL.createObjectURL(file);
    onChange({ id: crypto.randomUUID(), type, url, file });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  if (value) {
    return (
      <div className="relative group rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        {value.type === "video" ? (
          <video src={value.url} controls className={compact ? "w-full max-h-48 object-cover" : "w-full max-h-72 object-cover"} />
        ) : (
          <img src={value.url} alt="Uploaded media" className={compact ? "w-full max-h-48 object-cover" : "w-full max-h-72 object-cover"} />
        )}
        <button
          onClick={() => onChange(null)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold"
          style={{ background: "var(--ink)", color: "var(--cream)" }}
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className="cursor-pointer rounded-lg flex flex-col items-center justify-center gap-2 transition-colors"
      style={{
        border: `2px dashed ${dragging ? "var(--gold)" : "var(--border)"}`,
        background: dragging ? "rgba(184,150,12,0.05)" : "transparent",
        padding: compact ? "1.5rem 1rem" : "2.5rem 1rem",
      }}
    >
      <span className="text-2xl" style={{ color: "var(--gold-muted)" }}>⊕</span>
      <span className="text-sm" style={{ fontFamily: "'Lora', serif", color: "var(--ink-light)" }}>{label}</span>
      <span className="text-xs" style={{ color: "var(--ink-light)", opacity: 0.6 }}>Photo or Video</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
