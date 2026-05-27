"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import Link from "next/link";
import MediaUpload from "@/components/MediaUpload";
import ChapterCard from "@/components/ChapterCard";
import type { Block, Chapter, StoryData, MediaItem } from "@/lib/types";
import { makeDemoStory } from "@/lib/demoDefaults";

export default function BuilderPage() {
  const [story, setStory] = useState<StoryData>(makeDemoStory);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setStory((prev) => {
      const oldIndex = prev.chapters.findIndex((c) => c.id === active.id);
      const newIndex = prev.chapters.findIndex((c) => c.id === over.id);
      return { ...prev, chapters: arrayMove(prev.chapters, oldIndex, newIndex) };
    });
  }

  function updateChapter(id: string, updates: Partial<Chapter>) {
    setStory((prev) => ({
      ...prev,
      chapters: prev.chapters.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  }

  function removeChapter(id: string) {
    setStory((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((c) => c.id !== id),
    }));
  }

  function addChapter() {
    const newChapter: Chapter = {
      id: crypto.randomUUID(),
      title: "",
      blocks: [{ id: crypto.randomUUID(), type: "media", span: 3, media: null }],
    };
    setStory((prev) => ({ ...prev, chapters: [...prev.chapters, newChapter] }));
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between px-8 py-4"
        style={{ background: "var(--cream-dark)", borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--ink)" }}
          >
            Home Story
          </h1>
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Lora', serif" }}>
            Story Builder
          </p>
        </div>
        <Link
          href="/listing"
          className="px-7 py-2.5 rounded-lg font-semibold tracking-wide transition-opacity hover:opacity-80 flex items-center gap-2"
          style={{ background: "var(--gold)", color: "var(--cream)", fontFamily: "'Lora', serif", fontSize: "0.95rem", boxShadow: "0 2px 12px rgba(184,150,12,0.35)" }}
        >
          Preview Listing →
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-10">
        {/* Address */}
        <section className="flex flex-col gap-2">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: "'Lora', serif", color: "var(--gold)" }}
          >
            Property Address
          </label>
          <input
            type="text"
            value={story.address}
            onChange={(e) => setStory((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="123 Maple Lane, Austin, TX 78701"
            className="w-full outline-none rounded-lg px-4 py-3 text-lg"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "var(--ink)",
              background: "var(--cream-dark)",
              border: "1px solid var(--border)",
            }}
          />
        </section>

        {/* Hero photo */}
        <section className="flex flex-col gap-2">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: "'Lora', serif", color: "var(--gold)" }}
          >
            Cover Photo
          </label>
          <MediaUpload
            value={story.heroPhoto}
            onChange={(heroPhoto: MediaItem | null) => setStory((prev) => ({ ...prev, heroPhoto }))}
            label="Add Front-of-Home Photo"
          />
        </section>

        {/* Chapters */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Lora', serif", color: "var(--gold)" }}
            >
              Chapters
            </label>
            <span className="text-xs" style={{ color: "var(--ink-light)", opacity: 0.6 }}>
              Drag to reorder
            </span>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={story.chapters.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {story.chapters.map((chapter, index) => (
                  <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    index={index}
                    onChange={updateChapter}
                    onRemove={removeChapter}
                    removable={story.chapters.length > 1}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button
            onClick={addChapter}
            className="w-full py-3 rounded-lg text-sm tracking-widest uppercase transition-colors hover:opacity-80 flex items-center justify-center gap-2"
            style={{
              border: "2px dashed var(--border)",
              color: "var(--gold)",
              fontFamily: "'Lora', serif",
              background: "transparent",
            }}
          >
            <span className="text-lg leading-none">+</span> Chapter
          </button>
        </section>

        <div className="h-16" />
      </main>
    </div>
  );
}
