export type AreaId = "zivilrecht" | "strafrecht" | "oeffentliches-recht";

export interface Area {
  id: AreaId;
  name: string;
  short: string;
  description: string;
}

export interface Subarea {
  id: string;
  areaId: AreaId;
  name: string;
  description: string;
}

/** Ein Prüfungsschritt; kann Unterschritte und Problemstände enthalten. */
export interface SchemaStep {
  title: string;
  norm?: string;
  hint?: string;
  problems?: string[];
  children?: SchemaStep[];
}

export interface Schema {
  id: string;
  title: string;
  norm: string;
  intro?: string;
  steps: SchemaStep[];
}

export interface Definition {
  term: string;
  text: string;
  source?: string;
}

export interface Dispute {
  title: string;
  problem: string;
  views: { name: string; content: string; argument?: string }[];
  decision: string;
}

export interface CoreStructure {
  title: string;
  points: string[];
}

export interface ChoiceQuestion {
  id: string;
  type: "single" | "multi";
  question: string;
  snippet?: string;
  options: string[];
  correct: number[];
  explanation: string;
  trap?: string;
}

export interface CaseQuestion {
  id: string;
  type: "case";
  snippet: string;
  question: string;
  solution: string;
  keyPoints: { label: string; keywords: string[] }[];
  traps: string[];
}

export type Question = ChoiceQuestion | CaseQuestion;

export interface SeedFlashcard {
  id: string;
  front: string;
  back: string;
}

export interface Topic {
  id: string;
  areaId: AreaId;
  subareaId: string;
  title: string;
  summary: string;
  norms: string[];
  difficulty: 1 | 2 | 3;
  schemata: Schema[];
  definitions: Definition[];
  disputes: Dispute[];
  structures: CoreStructure[];
  quiz: Question[];
  flashcards: SeedFlashcard[];
}

export interface Flashcard {
  id: string;
  areaId: AreaId;
  subareaId: string;
  topicId?: string;
  front: string;
  back: string;
  custom?: boolean;
}

export type Rating = "again" | "hard" | "good";

export interface CardProgress {
  reps: number;
  interval: number; // Tage
  ease: number;
  due: number; // timestamp ms
  last?: Rating;
  lastReviewed?: number;
}
