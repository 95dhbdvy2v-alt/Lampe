import type { AreaId, Flashcard, Topic } from "../types";
import { zivilrechtTopics } from "./zivilrecht";
import { strafrechtTopics } from "./strafrecht";
import { oeffentlichesRechtTopics } from "./oeffentliches-recht";
import { subareas } from "./areas";

export * from "./areas";

export const topics: Topic[] = [...zivilrechtTopics, ...strafrechtTopics, ...oeffentlichesRechtTopics];

export const topicById = (id: string) => topics.find((t) => t.id === id);
export const topicsOfArea = (areaId: AreaId | string) => topics.filter((t) => t.areaId === areaId);
export const topicsOfSubarea = (subareaId: string) => topics.filter((t) => t.subareaId === subareaId);

/** Lernpfad-Reihenfolge: nach Untergebiet (Reihenfolge in `subareas`), dann Datenreihenfolge. */
export const orderedTopics = (areaId: AreaId) =>
  subareas.filter((s) => s.areaId === areaId).flatMap((s) => topicsOfSubarea(s.id));

export const seedFlashcards: Flashcard[] = topics.flatMap((t) =>
  t.flashcards.map((c) => ({
    id: c.id,
    areaId: t.areaId,
    subareaId: t.subareaId,
    topicId: t.id,
    front: c.front,
    back: c.back,
  })),
);
