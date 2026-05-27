export type MediaItem = {
  id: string;
  type: "photo" | "video";
  url: string;
  file?: File;
};

export type BlockSpan = 1 | 2 | 3;

export type Block =
  | { id: string; type: "media"; span: BlockSpan; media: MediaItem | null }
  | { id: string; type: "text"; span: BlockSpan; text: string };

export type Chapter = {
  id: string;
  title: string;
  blocks: Block[];
};

export type StoryData = {
  address: string;
  heroPhoto: MediaItem | null;
  chapters: Chapter[];
};

export const DEFAULT_CHAPTER_TITLES = [
  "Welcome Home",
  "Our Favorite Story",
  "Built to Last",
  "Neighborhood Stories",
] as const;
