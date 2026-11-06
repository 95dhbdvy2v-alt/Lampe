import type { Area, Subarea } from "../types";

export const areas: Area[] = [
  {
    id: "zivilrecht",
    name: "Zivilrecht",
    short: "ZR",
    description: "BGB AT, Schuldrecht, Sachenrecht, Handels- und Gesellschaftsrecht",
  },
  {
    id: "strafrecht",
    name: "Strafrecht",
    short: "SR",
    description: "Allgemeiner und Besonderer Teil des StGB",
  },
  {
    id: "oeffentliches-recht",
    name: "Öffentliches Recht",
    short: "ÖR",
    description: "Staatsrecht, Verwaltungsrecht, Verwaltungsprozessrecht, Polizeirecht",
  },
];

export const subareas: Subarea[] = [
  { id: "bgb-at", areaId: "zivilrecht", name: "BGB AT", description: "Willenserklärung, Vertragsschluss, Anfechtung, Stellvertretung" },
  { id: "schuldrecht", areaId: "zivilrecht", name: "Schuldrecht", description: "Leistungsstörungen, Kaufrecht, Delikt" },
  { id: "sachenrecht", areaId: "zivilrecht", name: "Sachenrecht", description: "Eigentumserwerb, EBV, Besitz" },
  { id: "handels-gesellschaftsrecht", areaId: "zivilrecht", name: "Handels- & Gesellschaftsrecht", description: "Kaufmann, Handelsregister, Personengesellschaften" },

  { id: "stgb-at", areaId: "strafrecht", name: "StGB AT", description: "Deliktsaufbau, Versuch, Rücktritt, Beteiligung" },
  { id: "stgb-bt", areaId: "strafrecht", name: "StGB BT", description: "Vermögens- und Tötungsdelikte" },

  { id: "staatsrecht-1", areaId: "oeffentliches-recht", name: "Staatsrecht I", description: "Staatsorganisationsrecht" },
  { id: "staatsrecht-2", areaId: "oeffentliches-recht", name: "Staatsrecht II", description: "Grundrechte und Verfassungsbeschwerde" },
  { id: "verwaltungsrecht-at", areaId: "oeffentliches-recht", name: "Allg. Verwaltungsrecht (VwVfG)", description: "Verwaltungsakt, Rücknahme, Widerruf" },
  { id: "vwgo", areaId: "oeffentliches-recht", name: "Verwaltungsprozessrecht (VwGO)", description: "Klagearten, Zulässigkeit, Begründetheit" },
  { id: "polizeirecht", areaId: "oeffentliches-recht", name: "Polizei- & Ordnungsrecht", description: "Gefahrenabwehr, Störer, Standardmaßnahmen" },
];

export const areaById = (id: string) => areas.find((a) => a.id === id);
export const subareaById = (id: string) => subareas.find((s) => s.id === id);
export const subareasOf = (areaId: string) => subareas.filter((s) => s.areaId === areaId);
