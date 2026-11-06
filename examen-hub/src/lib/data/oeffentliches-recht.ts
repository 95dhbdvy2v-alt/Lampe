import type { Topic } from "../types";

export const oeffentlichesRechtTopics: Topic[] = [
  // ───────────────────────────── Staatsrecht I ─────────────────────────────
  {
    id: "formelle-verfassungsmaessigkeit",
    areaId: "oeffentliches-recht",
    subareaId: "staatsrecht-1",
    title: "Formelle Verfassungsmäßigkeit eines Gesetzes",
    summary: "Gesetzgebungskompetenz (Art. 70 ff. GG), Gesetzgebungsverfahren (Art. 76 ff. GG) und Form (Art. 82 GG).",
    norms: ["Art. 70–74 GG", "Art. 76–78 GG", "Art. 82 GG"],
    difficulty: 2,
    schemata: [
      {
        id: "formell-schema",
        title: "Formelle Verfassungsmäßigkeit eines Bundesgesetzes",
        norm: "Art. 70 ff. GG",
        steps: [
          {
            title: "Gesetzgebungskompetenz",
            children: [
              { title: "Grundsatz: Länder", norm: "Art. 30, 70 I GG" },
              { title: "Ausschließliche Bundeskompetenz", norm: "Art. 71, 73 GG" },
              { title: "Konkurrierende Gesetzgebung", norm: "Art. 72, 74 GG", problems: ["Erforderlichkeitsklausel, Art. 72 II GG", "Abweichungsgesetzgebung, Art. 72 III GG"] },
              { title: "Ungeschriebene Kompetenzen", hint: "Kraft Sachzusammenhangs, Annexkompetenz, Natur der Sache." },
            ],
          },
          {
            title: "Gesetzgebungsverfahren",
            children: [
              { title: "Gesetzesinitiative", norm: "Art. 76 GG" },
              { title: "Beschluss des Bundestags", norm: "Art. 77 I 1, 42 II GG", problems: ["Beschlussfähigkeit (§ 45 GO-BT)"] },
              { title: "Mitwirkung des Bundesrats", norm: "Art. 77 II–IV, 78 GG", hint: "Einspruchs- oder Zustimmungsgesetz." },
            ],
          },
          {
            title: "Form",
            children: [
              { title: "Gegenzeichnung", norm: "Art. 82 I 1, 58 GG" },
              { title: "Ausfertigung durch den Bundespräsidenten", norm: "Art. 82 I 1 GG", problems: ["Prüfungsrecht des Bundespräsidenten (formell/materiell)"] },
              { title: "Verkündung im BGBl.", norm: "Art. 82 I 1 GG" },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Zustimmungsgesetz", text: "Gesetz, das nur mit Zustimmung des Bundesrats zustande kommt, weil das GG dies ausdrücklich anordnet (z. B. Art. 84 I 6, 105 III GG)." },
      { term: "Einspruchsgesetz", text: "Regelfall; der Bundesrat kann Einspruch einlegen, der vom Bundestag überstimmt werden kann (Art. 77 IV GG)." },
    ],
    disputes: [
      {
        title: "Materielles Prüfungsrecht des Bundespräsidenten",
        problem: "Darf der Bundespräsident die Ausfertigung wegen inhaltlicher Verfassungswidrigkeit verweigern?",
        views: [
          { name: "Evidenzkontrolle (h. M.)", content: "Ja, aber nur bei offensichtlicher und schwerwiegender Verfassungswidrigkeit.", argument: "Bindung an das GG (Art. 20 III), Amtseid Art. 56 GG; Verwerfungsmonopol des BVerfG" },
          { name: "Kein materielles Prüfungsrecht", content: "Verwerfungsmonopol liegt beim BVerfG.", argument: "Art. 100 GG; Gewaltenteilung" },
        ],
        decision: "Vermittelnd: Evidenzkontrolle – wahrt das Verwerfungsmonopol und die Verfassungsbindung.",
      },
    ],
    structures: [
      {
        title: "Klausurtipp",
        points: ["Kompetenz immer zuerst – nur problematische Punkte ausführlich.", "Verfahren: Initiativrecht, Beschluss, Bundesrat; bei unproblematischem Verfahren knapp feststellen."],
      },
    ],
    quiz: [
      {
        id: "fv-q1",
        type: "single",
        question: "Wer hat grundsätzlich die Gesetzgebungskompetenz nach dem Grundgesetz?",
        options: ["Der Bund", "Die Länder", "Bund und Länder gemeinsam", "Die Bundesregierung"],
        correct: [1],
        explanation: "Art. 70 I GG (i. V. m. Art. 30 GG): Die Länder haben das Recht der Gesetzgebung, soweit das GG nicht dem Bund Gesetzgebungsbefugnisse verleiht.",
      },
    ],
    flashcards: [
      { id: "fc-fv-1", front: "Prüfungspunkte formelle Verfassungsmäßigkeit?", back: "Zuständigkeit (Kompetenz), Verfahren, Form." },
      { id: "fc-fv-2", front: "Wann ist ein Bundesgesetz zustimmungsbedürftig?", back: "Nur wenn das GG es ausdrücklich anordnet (Enumerationsprinzip)." },
    ],
  },

  // ───────────────────────────── Staatsrecht II ─────────────────────────────
  {
    id: "verfassungsbeschwerde",
    areaId: "oeffentliches-recht",
    subareaId: "staatsrecht-2",
    title: "Verfassungsbeschwerde & Freiheitsgrundrechte",
    summary: "Zulässigkeit (Art. 93 I Nr. 4a GG, §§ 13 Nr. 8a, 90 ff. BVerfGG) und Begründetheit: Schutzbereich, Eingriff, Rechtfertigung.",
    norms: ["Art. 93 I Nr. 4a GG", "§§ 90 ff. BVerfGG", "Art. 1–19 GG"],
    difficulty: 2,
    schemata: [
      {
        id: "vb-schema",
        title: "Verfassungsbeschwerde",
        norm: "Art. 93 I Nr. 4a GG",
        steps: [
          {
            title: "Zulässigkeit",
            children: [
              { title: "Zuständigkeit", norm: "Art. 93 I Nr. 4a GG, § 13 Nr. 8a BVerfGG" },
              { title: "Beschwerdefähigkeit", hint: "„Jedermann“ – grundrechtsfähig; jur. Personen Art. 19 III GG." },
              { title: "Beschwerdegegenstand", hint: "Akt öffentlicher Gewalt (Legislative, Exekutive, Judikative)." },
              { title: "Beschwerdebefugnis", norm: "§ 90 I BVerfGG", hint: "Möglichkeit der Grundrechtsverletzung; selbst, gegenwärtig, unmittelbar betroffen." },
              { title: "Rechtswegerschöpfung & Subsidiarität", norm: "§ 90 II BVerfGG" },
              { title: "Form & Frist", norm: "§§ 23 I, 92, 93 BVerfGG", hint: "Ein Monat (Urteile), ein Jahr (Gesetze)." },
            ],
          },
          {
            title: "Begründetheit (Freiheitsgrundrecht)",
            children: [
              { title: "Schutzbereich", hint: "Persönlich und sachlich." },
              { title: "Eingriff", hint: "Klassischer und moderner Eingriffsbegriff." },
              {
                title: "Verfassungsrechtliche Rechtfertigung",
                children: [
                  { title: "Schranke", hint: "Einfacher/qualifizierter Gesetzesvorbehalt oder verfassungsimmanente Schranken." },
                  {
                    title: "Schranken-Schranken",
                    children: [
                      { title: "Formelle Verfassungsmäßigkeit des Gesetzes" },
                      { title: "Verhältnismäßigkeit", hint: "Legitimer Zweck, Geeignetheit, Erforderlichkeit, Angemessenheit." },
                      { title: "Wesensgehalt, Zitiergebot, Verbot des Einzelfallgesetzes", norm: "Art. 19 I, II GG" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Moderner Eingriffsbegriff", text: "Jedes staatliche Handeln, das dem Einzelnen ein Verhalten, das in den Schutzbereich fällt, ganz oder teilweise unmöglich macht oder erschwert – unabhängig von Finalität, Unmittelbarkeit, Rechtsförmigkeit und Befehl." },
      { term: "Erforderlichkeit", text: "Es gibt kein milderes, gleich effektives Mittel zur Erreichung des Zwecks." },
      { term: "Angemessenheit", text: "Die Schwere des Eingriffs darf bei einer Gesamtabwägung nicht außer Verhältnis zum Gewicht der ihn rechtfertigenden Gründe stehen." },
    ],
    disputes: [
      {
        title: "Drei-Stufen-Theorie (Art. 12 I GG)",
        problem: "Wie wird die Verhältnismäßigkeit bei Eingriffen in die Berufsfreiheit konkretisiert?",
        views: [
          { name: "BVerfG (Apothekenurteil)", content: "Berufsausübungsregelungen: vernünftige Gemeinwohlerwägungen; subjektive Zulassungsvoraussetzungen: wichtige Gemeinschaftsgüter; objektive Zulassungsvoraussetzungen: Abwehr nachweisbarer schwerer Gefahren für überragend wichtige Gemeinschaftsgüter.", argument: "Gestufte Eingriffsintensität" },
        ],
        decision: "Die Drei-Stufen-Theorie ist eine Konkretisierung der Verhältnismäßigkeit und in der Angemessenheit zu verorten.",
      },
    ],
    structures: [
      {
        title: "Gleichheitsgrundrecht Art. 3 I GG – Aufbau",
        points: ["Ungleichbehandlung von wesentlich Gleichem", "Rechtfertigung: Willkürformel oder strenge Verhältnismäßigkeitsprüfung (Neue Formel)"],
      },
    ],
    quiz: [
      {
        id: "vb-q1",
        type: "multi",
        question: "Welche Elemente prüft man bei der Beschwerdebefugnis? (Mehrfachauswahl)",
        options: ["Möglichkeit einer Grundrechtsverletzung", "Selbst betroffen", "Gegenwärtig betroffen", "Unmittelbar betroffen", "Erschöpfung des Rechtswegs"],
        correct: [0, 1, 2, 3],
        explanation: "Die Rechtswegerschöpfung (§ 90 II BVerfGG) ist ein eigener Zulässigkeitspunkt.",
      },
      {
        id: "vb-q2",
        type: "case",
        snippet:
          "Ein Landesgesetz verbietet den Verkauf von Alkohol an Tankstellen zwischen 22 und 5 Uhr. Tankstellenbetreiber T sieht sich in seiner Berufsfreiheit verletzt.",
        question: "Auf welcher Stufe der Drei-Stufen-Theorie liegt der Eingriff, und welcher Rechtfertigungsmaßstab gilt?",
        solution:
          "Der Schutzbereich des Art. 12 I GG (einheitliches Grundrecht der Berufsfreiheit) ist eröffnet. Das Verkaufsverbot regelt nicht das „Ob“, sondern das „Wie“ der Berufstätigkeit; es handelt sich um eine Berufsausübungsregelung (1. Stufe). Diese ist bereits durch vernünftige Erwägungen des Gemeinwohls gerechtfertigt – hier Gesundheitsschutz und Bekämpfung alkoholbedingter Kriminalität. Die Regelung muss zudem verhältnismäßig sein.",
        keyPoints: [
          { label: "Art. 12 I GG, einheitliches Grundrecht", keywords: ["12", "berufsfreiheit"] },
          { label: "Berufsausübungsregelung (1. Stufe)", keywords: ["ausübung", "1. stufe", "erste stufe", "wie"] },
          { label: "Vernünftige Gemeinwohlerwägungen", keywords: ["vernünftig", "gemeinwohl"] },
          { label: "Verhältnismäßigkeit", keywords: ["verhältnismäßig"] },
        ],
        traps: ["Nicht mit einer objektiven Zulassungsvoraussetzung verwechseln – der Beruf als solcher bleibt zugänglich."],
      },
    ],
    flashcards: [
      { id: "fc-vb-1", front: "Frist der Urteilsverfassungsbeschwerde?", back: "Ein Monat, § 93 I BVerfGG." },
      { id: "fc-vb-2", front: "Prüfungsschritte der Verhältnismäßigkeit?", back: "Legitimer Zweck, Geeignetheit, Erforderlichkeit, Angemessenheit." },
      { id: "fc-vb-3", front: "Stufen der Drei-Stufen-Theorie?", back: "1. Berufsausübungsregelung, 2. subjektive Berufswahlregelung, 3. objektive Berufswahlregelung." },
    ],
  },

  // ───────────────────────── Allg. Verwaltungsrecht ─────────────────────────
  {
    id: "verwaltungsakt-ruecknahme",
    areaId: "oeffentliches-recht",
    subareaId: "verwaltungsrecht-at",
    title: "Verwaltungsakt, Rücknahme & Widerruf",
    summary: "Merkmale des VA (§ 35 VwVfG), Rücknahme rechtswidriger (§ 48) und Widerruf rechtmäßiger VAe (§ 49 VwVfG).",
    norms: ["§ 35 VwVfG", "§§ 48, 49 VwVfG"],
    difficulty: 3,
    schemata: [
      {
        id: "48-schema",
        title: "Rücknahme eines rechtswidrigen begünstigenden VA",
        norm: "§ 48 VwVfG",
        steps: [
          { title: "Ermächtigungsgrundlage", norm: "§ 48 I 1 VwVfG", hint: "Spezialgesetzliche Regelungen vorrangig." },
          {
            title: "Formelle Rechtmäßigkeit",
            children: [{ title: "Zuständigkeit", norm: "§ 48 V VwVfG" }, { title: "Verfahren: Anhörung", norm: "§ 28 VwVfG" }, { title: "Form" }],
          },
          {
            title: "Materielle Rechtmäßigkeit",
            children: [
              { title: "Rechtswidriger VA", hint: "Zum Zeitpunkt des Erlasses." },
              { title: "Begünstigend?", norm: "§ 48 I 2 VwVfG" },
              { title: "Geld-/Sachleistungs-VA: Vertrauensschutz", norm: "§ 48 II VwVfG", problems: ["Ausschluss nach § 48 II 3 (Täuschung, Kenntnis)"] },
              { title: "Sonstige VAe: Ausgleich des Vermögensnachteils", norm: "§ 48 III VwVfG" },
              { title: "Rücknahmefrist", norm: "§ 48 IV VwVfG", problems: ["Entscheidungsfrist (h. M., BVerwG GrS)"] },
              { title: "Ermessen", norm: "§ 40 VwVfG" },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Verwaltungsakt", text: "Jede Verfügung, Entscheidung oder andere hoheitliche Maßnahme, die eine Behörde zur Regelung eines Einzelfalls auf dem Gebiet des öffentlichen Rechts trifft und die auf unmittelbare Rechtswirkung nach außen gerichtet ist.", source: "§ 35 S. 1 VwVfG" },
      { term: "Regelung", text: "Auf die Setzung einer Rechtsfolge gerichtete Maßnahme (Begründung, Änderung, Aufhebung oder verbindliche Feststellung von Rechten/Pflichten)." },
      { term: "Begünstigender VA", text: "VA, der ein Recht oder einen rechtlich erheblichen Vorteil begründet oder bestätigt, § 48 I 2 VwVfG." },
    ],
    disputes: [
      {
        title: "Jahresfrist des § 48 IV VwVfG",
        problem: "Handelt es sich um eine Bearbeitungs- oder eine Entscheidungsfrist?",
        views: [
          { name: "BVerwG GrS (h. M.)", content: "Entscheidungsfrist: beginnt erst, wenn die Behörde alle für die Rücknahme erheblichen Tatsachen vollständig kennt (inkl. Anhörung).", argument: "Rechtssicherheit; Gesetzmäßigkeit der Verwaltung" },
          { name: "Lit.", content: "Bearbeitungsfrist: beginnt mit Kenntnis der Rechtswidrigkeit.", argument: "Vertrauensschutz des Bürgers" },
        ],
        decision: "Mit dem BVerwG ist von einer Entscheidungsfrist auszugehen.",
      },
    ],
    structures: [
      {
        title: "Aufhebung von VAen – Übersicht",
        points: ["Rechtswidriger VA → Rücknahme § 48 VwVfG", "Rechtmäßiger VA → Widerruf § 49 VwVfG", "Belastender rechtmäßiger VA: Widerruf nach § 49 I (ex nunc)", "Begünstigender rechtmäßiger VA: nur bei Widerrufsgründen des § 49 II"],
      },
    ],
    quiz: [
      {
        id: "va-q1",
        type: "single",
        question: "Welches Merkmal fehlt typischerweise bei einer innerdienstlichen Weisung an einen Beamten?",
        options: ["Behörde", "Hoheitliche Maßnahme", "Außenwirkung", "Öffentliches Recht"],
        correct: [2],
        explanation: "Innerdienstliche Weisungen betreffen den Beamten in seiner Amtswalterstellung, nicht als Träger eigener Rechte; es fehlt die Außenwirkung.",
      },
    ],
    flashcards: [
      { id: "fc-va-1", front: "Merkmale des VA, § 35 S. 1 VwVfG?", back: "Hoheitliche Maßnahme, Behörde, Regelung, Einzelfall, öffentliches Recht, Außenwirkung." },
      { id: "fc-va-2", front: "Unterschied Rücknahme / Widerruf?", back: "Rücknahme betrifft rechtswidrige (§ 48), Widerruf rechtmäßige VAe (§ 49 VwVfG)." },
    ],
  },

  // ───────────────────────────── VwGO ─────────────────────────────
  {
    id: "anfechtungsklage",
    areaId: "oeffentliches-recht",
    subareaId: "vwgo",
    title: "Anfechtungsklage",
    summary: "Zulässigkeit (§§ 40, 42 I Alt. 1, 42 II, 68 ff., 74 VwGO) und Begründetheit (§ 113 I 1 VwGO).",
    norms: ["§ 40 VwGO", "§ 42 VwGO", "§§ 68 ff. VwGO", "§ 113 VwGO"],
    difficulty: 1,
    schemata: [
      {
        id: "ak-schema",
        title: "Anfechtungsklage",
        norm: "§ 42 I Alt. 1 VwGO",
        steps: [
          {
            title: "Zulässigkeit",
            children: [
              { title: "Verwaltungsrechtsweg", norm: "§ 40 I 1 VwGO", hint: "Öffentlich-rechtliche Streitigkeit nichtverfassungsrechtlicher Art; keine abdrängende Sonderzuweisung.", problems: ["Modifizierte Subjektstheorie (Sonderrechtstheorie)"] },
              { title: "Statthafte Klageart", norm: "§ 42 I Alt. 1 VwGO", hint: "Begehren: Aufhebung eines belastenden VA (§ 88 VwGO).", problems: ["Erledigung → Fortsetzungsfeststellungsklage"] },
              { title: "Klagebefugnis", norm: "§ 42 II VwGO", hint: "Möglichkeitstheorie; Adressatentheorie.", problems: ["Drittanfechtung: Schutznormtheorie"] },
              { title: "Vorverfahren", norm: "§§ 68 ff. VwGO", hint: "Landesrechtliche Ausnahmen beachten (§ 68 I 2 VwGO)." },
              { title: "Klagefrist", norm: "§ 74 I VwGO", hint: "Ein Monat; bei fehlender/fehlerhafter Rechtsbehelfsbelehrung ein Jahr (§ 58 II VwGO)." },
              { title: "Klagegegner", norm: "§ 78 VwGO" },
              { title: "Beteiligten- und Prozessfähigkeit", norm: "§§ 61, 62 VwGO" },
            ],
          },
          {
            title: "Begründetheit",
            norm: "§ 113 I 1 VwGO",
            children: [
              { title: "Rechtswidrigkeit des VA", children: [{ title: "Ermächtigungsgrundlage" }, { title: "Formelle Rechtmäßigkeit" }, { title: "Materielle Rechtmäßigkeit" }] },
              { title: "Rechtsverletzung des Klägers" },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Adressatentheorie", text: "Der Adressat eines belastenden VA ist stets klagebefugt, da er zumindest möglicherweise in Art. 2 I GG verletzt ist." },
      { term: "Schutznormtheorie", text: "Eine Norm vermittelt ein subjektives Recht, wenn sie zumindest auch dem Schutz der Interessen Einzelner zu dienen bestimmt ist." },
    ],
    disputes: [
      {
        title: "Abgrenzung öffentlich-rechtlich / privatrechtlich",
        problem: "Wann ist eine Streitigkeit öffentlich-rechtlich i. S. d. § 40 I VwGO?",
        views: [
          { name: "Modifizierte Subjektstheorie (h. M.)", content: "Öffentlich-rechtlich, wenn die streitentscheidende Norm ausschließlich einen Hoheitsträger als solchen berechtigt oder verpflichtet.", argument: "Klarheit, Sonderrecht des Staates" },
          { name: "Subordinationstheorie", content: "Über-/Unterordnungsverhältnis.", argument: "Versagt bei öffentlich-rechtlichen Verträgen" },
          { name: "Interessentheorie", content: "Dient die Norm öffentlichen Interessen?", argument: "Zu unbestimmt" },
        ],
        decision: "Modifizierte Subjektstheorie, ergänzt um die anderen Theorien als Hilfskriterien.",
      },
    ],
    structures: [
      {
        title: "Klagearten der VwGO",
        points: ["Anfechtungsklage, § 42 I Alt. 1", "Verpflichtungsklage, § 42 I Alt. 2", "Fortsetzungsfeststellungsklage, § 113 I 4", "Allgemeine Leistungsklage (vorausgesetzt, z. B. § 43 II)", "Feststellungsklage, § 43", "Normenkontrolle, § 47"],
      },
    ],
    quiz: [
      {
        id: "ak-q1",
        type: "single",
        question: "Wie lange ist die Klagefrist, wenn die Rechtsbehelfsbelehrung fehlt?",
        options: ["Ein Monat", "Drei Monate", "Ein Jahr", "Unbegrenzt"],
        correct: [2],
        explanation: "§ 58 II VwGO: Bei fehlender oder unrichtiger Belehrung gilt die Jahresfrist.",
      },
      {
        id: "ak-q2",
        type: "case",
        snippet:
          "Nachbar N wendet sich gegen eine Baugenehmigung, die die Behörde dem Bauherrn B für ein Mehrfamilienhaus erteilt hat. N rügt, das Gebäude halte die Abstandsflächen zu seinem Grundstück nicht ein.",
        question: "Ist N klagebefugt?",
        solution:
          "Statthaft ist die Anfechtungsklage (Drittanfechtung). N ist nicht Adressat der Baugenehmigung, sodass die Adressatentheorie nicht greift. Klagebefugt ist er nach § 42 II VwGO, wenn er die Verletzung einer drittschützenden Norm geltend machen kann (Schutznormtheorie). Abstandsflächenvorschriften der Landesbauordnungen dienen nach st. Rspr. auch dem Schutz des Nachbarn (Belichtung, Belüftung, Sozialabstand). N ist daher klagebefugt.",
        keyPoints: [
          { label: "§ 42 II VwGO / Möglichkeitstheorie", keywords: ["42 ii", "42 abs. 2", "möglich"] },
          { label: "Keine Adressatentheorie (Dritter)", keywords: ["adressat", "dritt"] },
          { label: "Schutznormtheorie", keywords: ["schutznorm", "drittschütz", "drittschutz"] },
          { label: "Abstandsflächen sind nachbarschützend", keywords: ["abstandsfläche", "nachbarschütz", "nachbarschutz"] },
        ],
        traps: ["Adressatentheorie passt bei Drittanfechtung nicht.", "Nicht jede baurechtliche Norm ist drittschützend (z. B. Art der baulichen Nutzung: Gebietserhaltungsanspruch prüfen)."],
      },
    ],
    flashcards: [
      { id: "fc-ak-1", front: "Klagefrist der Anfechtungsklage?", back: "Ein Monat nach Zustellung des Widerspruchsbescheids bzw. Bekanntgabe des VA, § 74 I VwGO." },
      { id: "fc-ak-2", front: "Begründetheitsmaßstab der Anfechtungsklage?", back: "§ 113 I 1 VwGO: VA rechtswidrig und Kläger dadurch in seinen Rechten verletzt." },
      { id: "fc-ak-3", front: "Definition Schutznormtheorie", back: "Eine Norm ist drittschützend, wenn sie zumindest auch den Interessen Einzelner zu dienen bestimmt ist." },
    ],
  },

  // ───────────────────────────── Polizeirecht ─────────────────────────────
  {
    id: "gefahrenabwehr",
    areaId: "oeffentliches-recht",
    subareaId: "polizeirecht",
    title: "Polizeiliche Generalklausel & Störerauswahl",
    summary: "Rechtmäßigkeit einer Gefahrenabwehrverfügung: konkrete Gefahr, Verantwortlichkeit (Verhaltens-/Zustandsstörer), Ermessen.",
    norms: ["Polizeigesetze der Länder (z. B. § 8 PolG NRW)", "§§ 4, 5 PolG NRW"],
    difficulty: 2,
    schemata: [
      {
        id: "gefahrenabwehr-schema",
        title: "Rechtmäßigkeit einer polizeilichen Verfügung",
        norm: "z. B. § 8 I PolG NRW",
        steps: [
          { title: "Ermächtigungsgrundlage", hint: "Spezialgesetz → Standardmaßnahme → Generalklausel." },
          { title: "Formelle Rechtmäßigkeit", hint: "Zuständigkeit (sachlich, örtlich, instanziell), Verfahren (Anhörung, § 28 VwVfG), Form." },
          {
            title: "Materielle Rechtmäßigkeit",
            children: [
              { title: "Gefahr für die öffentliche Sicherheit oder Ordnung", problems: ["Anscheinsgefahr", "Gefahrenverdacht", "Putativgefahr"] },
              { title: "Richtiger Adressat", hint: "Verhaltensstörer, Zustandsstörer, Notstandspflichtiger.", problems: ["Zweckveranlasser", "Unmittelbarkeitslehre"] },
              { title: "Rechtsfolge: Ermessen", hint: "Entschließungs- und Auswahlermessen; Ermessensfehler (§ 40 VwVfG, § 114 VwGO)." },
              { title: "Verhältnismäßigkeit" },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Öffentliche Sicherheit", text: "Unversehrtheit der objektiven Rechtsordnung, der subjektiven Rechte und Rechtsgüter des Einzelnen sowie des Bestands und der Funktionsfähigkeit des Staates und seiner Einrichtungen." },
      { term: "Konkrete Gefahr", text: "Sachlage, die bei ungehindertem Ablauf des objektiv zu erwartenden Geschehens im Einzelfall mit hinreichender Wahrscheinlichkeit zu einem Schaden für ein Schutzgut führt." },
      { term: "Anscheinsgefahr", text: "Sachlage, die bei verständiger Würdigung ex ante den Anschein einer Gefahr erweckt, sich ex post aber als ungefährlich herausstellt; sie steht der Gefahr gleich." },
    ],
    disputes: [
      {
        title: "Zweckveranlasser",
        problem: "Ist Störer, wer selbst rechtmäßig handelt, aber das störende Verhalten Dritter objektiv bezweckt oder zwangsläufig auslöst?",
        views: [
          { name: "H. M.", content: "Ja, als mittelbarer Verursacher Verhaltensstörer, wenn er die Störung subjektiv bezweckt oder sie sich als objektiv zwangsläufige Folge darstellt.", argument: "Effektive Gefahrenabwehr" },
          { name: "A. A.", content: "Nein, Widerspruch zur Unmittelbarkeitslehre; ggf. Inanspruchnahme als Nichtstörer.", argument: "Rechtsstaatliche Bestimmtheit; Grundrechtsschutz" },
        ],
        decision: "Mit der h. M. ist die Figur anzuerkennen, jedoch restriktiv anzuwenden (Grundrechtsausübung!).",
      },
    ],
    structures: [
      {
        title: "Störerauswahl – Leitlinien",
        points: ["Effektivität der Gefahrenabwehr als Hauptkriterium", "Verhaltensstörer i. d. R. vor Zustandsstörer (kein starres Rangverhältnis)", "Nichtstörer nur im polizeilichen Notstand"],
      },
    ],
    quiz: [
      {
        id: "pol-q1",
        type: "single",
        question: "Wie ist die Anscheinsgefahr im Polizeirecht zu behandeln?",
        options: ["Sie ist keine Gefahr", "Sie steht auf Primärebene einer Gefahr gleich", "Sie ist nur auf Kostenebene relevant", "Sie ist mit der Putativgefahr identisch"],
        correct: [1],
        explanation: "Maßgeblich ist die ex-ante-Sicht eines verständigen Amtswalters. Die Anscheinsgefahr berechtigt zum Einschreiten; auf Sekundärebene (Kosten) kann anders zu entscheiden sein.",
        trap: "Putativgefahr (nur subjektive Annahme ohne objektive Anhaltspunkte) ≠ Anscheinsgefahr.",
      },
    ],
    flashcards: [
      { id: "fc-pol-1", front: "Definition öffentliche Sicherheit", back: "Unversehrtheit der objektiven Rechtsordnung, der subjektiven Rechte und Rechtsgüter des Einzelnen sowie der Einrichtungen des Staates." },
      { id: "fc-pol-2", front: "Definition konkrete Gefahr", back: "Sachlage, die im Einzelfall bei ungehindertem Ablauf mit hinreichender Wahrscheinlichkeit zu einem Schaden für ein Schutzgut führt." },
      { id: "fc-pol-3", front: "Prüfungsreihenfolge Ermächtigungsgrundlagen im Polizeirecht?", back: "Spezialgesetz → Standardmaßnahme → Generalklausel (Subsidiarität)." },
    ],
  },
];
