# ExamenHub – Lern-Hub für das Erste Staatsexamen

Lokale Web-App (Next.js 15 App Router, React 19, Tailwind CSS, Lucide) mit festem Sidebar-Layout und drei Reitern:

| Reiter | Inhalt |
| --- | --- |
| **Datenbank** | Baumnavigation Rechtsgebiet → Untergebiet → Thema, Volltextsuche (Themen, Normen, Definitionen, Streitstände), interaktive Prüfungsschemata in juristischer Gliederung (A. → I. → 1. → a)) mit Problemständen und **Lernmodus** (Hinweise abdecken), Themenblöcke mit Definitionen, Streitständen inkl. Stellungnahme und Kernstrukturen. Definitionen lassen sich per Klick als Karteikarte speichern. |
| **Lernpfade** | Etappen je Rechtsgebiet mit Fortschritt und Empfehlung des nächsten Moduls. Quiz (Einfach-/Mehrfachauswahl, Tastatursteuerung) und Fall-Snippets mit **Korrektur-Training**: Freitext-Lösung → Abgleich mit Musterlösung, automatische Kernpunkt-Erkennung (mit manueller Selbstkorrektur), Hervorhebung typischer Klausurfallen. Nicht sicher gelöste Aufgaben können als Karteikarten übernommen werden. |
| **Karteikarten** | Dashboard (gesamt, heute offen, Lernphase, gefestigt, Status pro Rechtsgebiet/Unterkategorie als Fortschrittsbalken, 7-Tage-Prognose), Lernsession mit Flip-Karten und Bewertung „Nochmal / Schwer / Gewusst“ (vereinfachtes SM-2), Kartenverwaltung zum Bearbeiten, Löschen und Anlegen eigener Karten. |

Dark-/Light-Mode lässt sich in der Sidebar umschalten (Systemeinstellung als Standard).

## Starten

```bash
cd examen-hub
npm install
npm run dev        # http://localhost:3000
```

Produktions-Build: `npm run build && npm start`.

## Daten

- Mock-Inhalte liegen als typisierte TypeScript-Strukturen in `src/lib/data/` (`zivilrecht.ts`, `strafrecht.ts`, `oeffentliches-recht.ts`); Typen in `src/lib/types.ts`.
  Neue Themen werden einfach an das jeweilige Array angehängt – Datenbank, Lernpfade und Karteikarten übernehmen sie automatisch.
- Lernfortschritt, eigene/bearbeitete Karten und Quiz-Ergebnisse werden im `localStorage` des Browsers gespeichert (`src/lib/store.tsx`), es ist kein Server oder Datenbank-Setup nötig.

## Struktur

```
src/
  app/                 Routen (datenbank, lernpfade, karteikarten)
  components/          Sidebar, UI-Bausteine und Komponenten je Reiter
  lib/data/            Rechtsgebiete, Untergebiete, Themen (Schemata, Definitionen, Streitstände, Quiz, Karten)
  lib/store.tsx        Client-State + Persistenz + Spaced-Repetition-Logik
```

> Hinweis: Die Inhalte sind kompakte Lern-Mockdaten und ersetzen kein Lehrbuch/Skript.
