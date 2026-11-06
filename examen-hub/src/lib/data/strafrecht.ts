import type { Topic } from "../types";

export const strafrechtTopics: Topic[] = [
  // ───────────────────────────── StGB AT ─────────────────────────────
  {
    id: "vorsatzdelikt",
    areaId: "strafrecht",
    subareaId: "stgb-at",
    title: "Das vollendete vorsätzliche Begehungsdelikt",
    summary: "Dreistufiger Deliktsaufbau: Tatbestandsmäßigkeit, Rechtswidrigkeit, Schuld – mit Kausalität und objektiver Zurechnung.",
    norms: ["§§ 15, 16 StGB", "§§ 32, 34 StGB", "§§ 17, 20 StGB"],
    difficulty: 1,
    schemata: [
      {
        id: "vorsatz-schema",
        title: "Grundschema vorsätzliches Begehungsdelikt",
        norm: "allg. Deliktsaufbau",
        steps: [
          {
            title: "Tatbestandsmäßigkeit",
            children: [
              {
                title: "Objektiver Tatbestand",
                children: [
                  { title: "Taterfolg & Tathandlung", hint: "Je nach Delikt." },
                  { title: "Kausalität", hint: "Conditio-sine-qua-non-Formel.", problems: ["Alternative und kumulative Kausalität", "Abgebrochene Kausalität"] },
                  { title: "Objektive Zurechnung", hint: "Rechtlich missbilligte Gefahr, die sich im tatbestandlichen Erfolg realisiert hat.", problems: ["Eigenverantwortliche Selbstgefährdung", "Atypischer Kausalverlauf", "Dazwischentreten Dritter"] },
                ],
              },
              {
                title: "Subjektiver Tatbestand",
                children: [
                  { title: "Vorsatz", norm: "§ 15 StGB", hint: "Wissen und Wollen der Tatbestandsverwirklichung.", problems: ["Abgrenzung dolus eventualis / bewusste Fahrlässigkeit", "error in persona / aberratio ictus"] },
                  { title: "Besondere subjektive Merkmale", hint: "Z. B. Zueignungsabsicht, Bereicherungsabsicht." },
                ],
              },
            ],
          },
          {
            title: "Rechtswidrigkeit",
            hint: "Indiziert durch die Tatbestandsmäßigkeit; Prüfung von Rechtfertigungsgründen.",
            children: [
              { title: "Notwehr", norm: "§ 32 StGB" },
              { title: "Rechtfertigender Notstand", norm: "§ 34 StGB" },
              { title: "Einwilligung / mutmaßliche Einwilligung" },
              { title: "Festnahmerecht", norm: "§ 127 I StPO" },
            ],
          },
          {
            title: "Schuld",
            children: [
              { title: "Schuldfähigkeit", norm: "§§ 19, 20 StGB" },
              { title: "Unrechtsbewusstsein", norm: "§ 17 StGB" },
              { title: "Entschuldigungsgründe", norm: "§§ 33, 35 StGB" },
            ],
          },
          { title: "Ggf. Strafausschließungs-/Strafaufhebungsgründe & Strafantrag" },
        ],
      },
      {
        id: "notwehr-schema",
        title: "Notwehr, § 32 StGB",
        norm: "§ 32 StGB",
        steps: [
          {
            title: "Notwehrlage",
            children: [
              { title: "Angriff", hint: "Jede durch menschliches Verhalten drohende Verletzung rechtlich geschützter Güter oder Interessen." },
              { title: "Gegenwärtig", hint: "Unmittelbar bevorstehend, gerade stattfindend oder noch andauernd." },
              { title: "Rechtswidrig", hint: "Nicht durch Erlaubnissatz gedeckt." },
            ],
          },
          {
            title: "Notwehrhandlung",
            children: [
              { title: "Verteidigung gegen den Angreifer" },
              { title: "Erforderlichkeit", hint: "Geeignet und mildestes von mehreren gleich effektiven Mitteln.", problems: ["Schusswaffengebrauch: Androhung → Warnschuss → Schuss in die Beine"] },
              { title: "Gebotenheit", hint: "Sozialethische Einschränkungen.", problems: ["Krasses Missverhältnis", "Schuldlos Handelnde", "Absichtsprovokation", "Garantenbeziehung"] },
            ],
          },
          { title: "Subjektives Rechtfertigungselement", hint: "Kenntnis der Notwehrlage (h. M.); Verteidigungswille str." },
        ],
      },
    ],
    definitions: [
      { term: "Vorsatz", text: "Wissen und Wollen der Tatbestandsverwirklichung in Kenntnis aller objektiven Tatumstände." },
      { term: "Dolus eventualis", text: "Der Täter hält den Erfolgseintritt für möglich und nicht ganz fernliegend und nimmt ihn billigend in Kauf (Billigungstheorie, BGH)." },
      { term: "Objektive Zurechnung", text: "Ein Erfolg ist objektiv zurechenbar, wenn der Täter eine rechtlich missbilligte Gefahr geschaffen hat, die sich im tatbestandsmäßigen Erfolg realisiert hat." },
      { term: "Angriff (§ 32 StGB)", text: "Jede durch menschliches Verhalten drohende Verletzung rechtlich geschützter Güter oder Interessen." },
    ],
    disputes: [
      {
        title: "Abgrenzung dolus eventualis – bewusste Fahrlässigkeit",
        problem: "Nach welchem Kriterium ist bedingter Vorsatz von bewusster Fahrlässigkeit abzugrenzen?",
        views: [
          { name: "Billigungstheorie (BGH)", content: "Täter billigt den Erfolg oder findet sich mit ihm ab (voluntatives Element).", argument: "Vorsatz als Wissen und Wollen" },
          { name: "Möglichkeitstheorie", content: "Bloßes Für-möglich-Halten genügt.", argument: "Klare Abgrenzung; aber zu weit" },
          { name: "Ernstnahmetheorie (h. L.)", content: "Täter nimmt die Gefahr ernst und findet sich mit ihr ab.", argument: "Weitgehend deckungsgleich mit BGH" },
        ],
        decision: "Billigungs- und Ernstnahmetheorie führen meist zum gleichen Ergebnis; Streitentscheid nur bei abweichenden Ergebnissen erforderlich.",
      },
      {
        title: "Subjektives Rechtfertigungselement",
        problem: "Reicht die Kenntnis der rechtfertigenden Lage oder ist ein Verteidigungswille erforderlich?",
        views: [
          { name: "Rspr.", content: "Verteidigungswille erforderlich (darf neben anderen Motiven bestehen).", argument: "Wortlaut „um … abzuwenden“" },
          { name: "Teile der Lit.", content: "Kenntnis genügt.", argument: "Erfolgsunrecht entfällt bereits durch objektive Lage" },
        ],
        decision: "Bei Kenntnis und gleichzeitigem Motivbündel kommen beide Ansichten meist zum selben Ergebnis.",
      },
    ],
    structures: [
      {
        title: "Vorsatzformen",
        points: [
          "Dolus directus 1. Grades (Absicht): Es kommt dem Täter auf den Erfolg an.",
          "Dolus directus 2. Grades: Täter weiß oder sieht als sicher voraus.",
          "Dolus eventualis: für möglich halten + billigend in Kauf nehmen.",
        ],
      },
    ],
    quiz: [
      {
        id: "vd-q1",
        type: "single",
        question: "Wo wird die Schuldfähigkeit im Deliktsaufbau geprüft?",
        options: ["Im objektiven Tatbestand", "In der Rechtswidrigkeit", "In der Schuld", "Gar nicht, sie wird vermutet"],
        correct: [2],
        explanation: "Die Schuldfähigkeit (§§ 19, 20 StGB) ist Teil der Schuld; sie wird grds. vermutet, ist aber bei Anhaltspunkten zu prüfen.",
      },
      {
        id: "vd-q2",
        type: "case",
        snippet:
          "A wird von dem betrunkenen, erkennbar schuldunfähigen B mit Fäusten angegriffen. A könnte ohne Weiteres weglaufen, schlägt B aber stattdessen nieder.",
        question: "Ist A nach § 32 StGB gerechtfertigt?",
        solution:
          "Eine Notwehrlage liegt vor: gegenwärtiger, rechtswidriger Angriff des B (Rechtswidrigkeit setzt keine Schuld voraus). Der Faustschlag ist geeignet und mangels gleich effektiver milderer Mittel erforderlich – Ausweichen ist im Rahmen der Erforderlichkeit grds. nicht geboten. Allerdings ist die Notwehr sozialethisch eingeschränkt (Gebotenheit): Bei erkennbar schuldlos Handelnden muss der Angegriffene zunächst ausweichen, dann Schutzwehr und erst zuletzt Trutzwehr üben. A war das Ausweichen möglich; er ist daher nicht gerechtfertigt.",
        keyPoints: [
          { label: "Notwehrlage: gegenwärtiger, rechtswidriger Angriff", keywords: ["notwehrlage", "angriff", "gegenwärtig", "rechtswidrig"] },
          { label: "Erforderlichkeit (+), kein Ausweichen nötig", keywords: ["erforderlich"] },
          { label: "Gebotenheit / sozialethische Einschränkung", keywords: ["geboten", "sozialethisch", "einschränkung"] },
          { label: "Schuldlos Handelnder → Ausweichpflicht", keywords: ["schuldlos", "schuldunfähig", "ausweich"] },
          { label: "Ergebnis: nicht gerechtfertigt", keywords: ["nicht gerechtfertigt", "keine rechtfertigung", "(-)"] },
        ],
        traps: [
          "Die Ausweichpflicht ist eine Frage der Gebotenheit, nicht der Erforderlichkeit!",
          "Rechtswidrigkeit des Angriffs setzt keine Schuld voraus.",
        ],
      },
    ],
    flashcards: [
      { id: "fc-vd-1", front: "Definition Vorsatz?", back: "Wissen und Wollen der Tatbestandsverwirklichung in Kenntnis aller objektiven Tatumstände." },
      { id: "fc-vd-2", front: "Wann ist ein Angriff gegenwärtig?", back: "Wenn er unmittelbar bevorsteht, gerade stattfindet oder noch fortdauert." },
      { id: "fc-vd-3", front: "Fallgruppen der Gebotenheit (§ 32 StGB)?", back: "Krasses Missverhältnis, schuldlos Handelnde, Absichtsprovokation/sonst vorwerfbare Provokation, enge persönliche Beziehung." },
      { id: "fc-vd-4", front: "Definition objektive Zurechnung?", back: "Täter hat eine rechtlich missbilligte Gefahr geschaffen, die sich im tatbestandlichen Erfolg realisiert hat." },
    ],
  },
  {
    id: "versuch-ruecktritt",
    areaId: "strafrecht",
    subareaId: "stgb-at",
    title: "Versuch & Rücktritt",
    summary: "Strafbarkeit des Versuchs (§§ 22, 23 StGB), unmittelbares Ansetzen und Rücktritt (§ 24 StGB).",
    norms: ["§§ 22–24 StGB", "§ 12 StGB"],
    difficulty: 2,
    schemata: [
      {
        id: "versuch-schema",
        title: "Versuchsprüfung",
        norm: "§§ 22, 23 I StGB",
        steps: [
          {
            title: "Vorprüfung",
            children: [
              { title: "Keine Vollendung" },
              { title: "Strafbarkeit des Versuchs", norm: "§§ 23 I, 12 StGB", hint: "Verbrechen stets; Vergehen nur bei ausdrücklicher Anordnung." },
            ],
          },
          {
            title: "Tatbestandsmäßigkeit",
            children: [
              { title: "Tatentschluss", hint: "Vorsatz bzgl. aller objektiven Merkmale + besondere subjektive Merkmale." },
              { title: "Unmittelbares Ansetzen", norm: "§ 22 StGB", problems: ["Zwischenaktstheorie / Gefährdungstheorie", "Mittelbare Täterschaft", "Mittäterschaft (Gesamtlösung)"] },
            ],
          },
          { title: "Rechtswidrigkeit" },
          { title: "Schuld" },
          {
            title: "Rücktritt",
            norm: "§ 24 StGB",
            children: [
              { title: "Kein fehlgeschlagener Versuch", hint: "Täter erkennt, dass er den Erfolg nicht mehr (ohne zeitliche Zäsur) herbeiführen kann." },
              { title: "Abgrenzung unbeendet / beendet", hint: "Rücktrittshorizont nach der letzten Ausführungshandlung (Gesamtbetrachtungslehre).", problems: ["Korrektur des Rücktrittshorizonts"] },
              { title: "Rücktrittshandlung", hint: "Unbeendet: Aufgeben; beendet: Verhindern der Vollendung." },
              { title: "Freiwilligkeit", hint: "Autonome Motive (Herr seiner Entschlüsse)." },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Unmittelbares Ansetzen", text: "Täter überschreitet subjektiv die Schwelle zum „Jetzt geht's los“ und setzt objektiv zur tatbestandsmäßigen Angriffshandlung an, sodass sein Tun ohne wesentliche Zwischenschritte in die Tatbestandserfüllung übergehen soll." },
      { term: "Fehlgeschlagener Versuch", text: "Der Täter erkennt oder nimmt an, dass er den Erfolg mit den ihm zur Verfügung stehenden Mitteln nicht mehr ohne zeitlich relevante Zäsur herbeiführen kann." },
      { term: "Freiwilligkeit", text: "Rücktritt aus autonomen Motiven; der Täter ist noch „Herr seiner Entschlüsse“ und hält die Tatvollendung noch für möglich." },
    ],
    disputes: [
      {
        title: "Rücktritt bei außertatbestandlicher Zielerreichung",
        problem: "Ist ein Rücktritt möglich, wenn der Täter sein eigentliches Ziel (z. B. Denkzettel) bereits erreicht hat?",
        views: [
          { name: "BGH (GrS)", content: "Ja, Rücktritt möglich; Aufgeben bezieht sich nur auf die tatbestandsmäßige Handlung.", argument: "Wortlaut, Opferschutz" },
          { name: "Teile der Lit.", content: "Nein, keine honorierbare Umkehrleistung.", argument: "Strafzwecktheorie" },
        ],
        decision: "Mit dem BGH ist ein Rücktritt möglich – Opferschutz und Wortlaut sprechen dafür.",
      },
    ],
    structures: [
      {
        title: "Prüfungsreihenfolge Rücktritt",
        points: ["1. Fehlschlag?", "2. Unbeendet oder beendet?", "3. Rücktrittshandlung", "4. Freiwilligkeit"],
      },
    ],
    quiz: [
      {
        id: "vr-q1",
        type: "single",
        question: "Was ist beim Rücktritt vom beendeten Versuch erforderlich (Alleintäter)?",
        options: ["Bloßes Aufgeben der weiteren Tatausführung", "Verhinderung der Vollendung", "Geständnis bei der Polizei", "Schadenswiedergutmachung"],
        correct: [1],
        explanation: "§ 24 I 1 Alt. 2 StGB: Beim beendeten Versuch muss der Täter die Vollendung aktiv verhindern.",
      },
      {
        id: "vr-q2",
        type: "single",
        question: "Ist der Versuch eines einfachen Diebstahls strafbar?",
        options: ["Nein, da Vergehen", "Ja, § 242 II StGB", "Nur bei Wert über 50 €", "Nur mit Strafantrag"],
        correct: [1],
        explanation: "Diebstahl ist ein Vergehen (§ 12 II StGB), die Versuchsstrafbarkeit ist aber ausdrücklich in § 242 II StGB angeordnet.",
        trap: "Immer Vorprüfung: Verbrechen oder Vergehen + ausdrückliche Anordnung?",
      },
    ],
    flashcards: [
      { id: "fc-vr-1", front: "Wann ist der Versuch eines Vergehens strafbar?", back: "Nur wenn das Gesetz es ausdrücklich bestimmt, § 23 I StGB." },
      { id: "fc-vr-2", front: "Definition: fehlgeschlagener Versuch", back: "Täter erkennt, dass er den Erfolg nicht mehr ohne zeitlich relevante Zäsur herbeiführen kann." },
      { id: "fc-vr-3", front: "Maßgeblicher Zeitpunkt für den Rücktrittshorizont?", back: "Vorstellung des Täters nach der letzten Ausführungshandlung (Gesamtbetrachtungslehre)." },
    ],
  },
  {
    id: "taeterschaft-teilnahme",
    areaId: "strafrecht",
    subareaId: "stgb-at",
    title: "Täterschaft & Teilnahme",
    summary: "Abgrenzung von Täter und Teilnehmer, Mittäterschaft (§ 25 II StGB), Anstiftung (§ 26) und Beihilfe (§ 27).",
    norms: ["§§ 25–31 StGB"],
    difficulty: 3,
    schemata: [
      {
        id: "anstiftung-schema",
        title: "Anstiftung, § 26 StGB",
        norm: "§ 26 StGB",
        steps: [
          {
            title: "Objektiver Tatbestand",
            children: [
              { title: "Vorsätzliche, rechtswidrige Haupttat", hint: "Limitierte Akzessorietät – Schuld des Haupttäters nicht erforderlich." },
              { title: "Bestimmen", hint: "Hervorrufen des Tatentschlusses.", problems: ["omnimodo facturus", "Kommunikativer Kontakt erforderlich?"] },
            ],
          },
          {
            title: "Subjektiver Tatbestand (doppelter Anstiftervorsatz)",
            children: [{ title: "Vorsatz bzgl. Haupttat" }, { title: "Vorsatz bzgl. Bestimmen" }],
          },
          { title: "Rechtswidrigkeit & Schuld" },
          { title: "Ggf. § 28 StGB", hint: "Besondere persönliche Merkmale." },
        ],
      },
    ],
    definitions: [
      { term: "Mittäterschaft", text: "Gemeinschaftliche Begehung aufgrund eines gemeinsamen Tatplans und arbeitsteiliger, wesentlicher Tatbeiträge." },
      { term: "Bestimmen (§ 26 StGB)", text: "Hervorrufen des Tatentschlusses beim Haupttäter." },
      { term: "Hilfeleisten (§ 27 StGB)", text: "Jede Handlung, die die Haupttat ermöglicht, erleichtert oder fördert (h. M. Förderungsformel)." },
    ],
    disputes: [
      {
        title: "Abgrenzung Täterschaft – Teilnahme",
        problem: "Nach welchen Kriterien ist der Täter vom Teilnehmer abzugrenzen?",
        views: [
          { name: "Subjektive Theorie (Rspr., normativ eingeschränkt)", content: "Täter ist, wer mit Täterwillen handelt; Gesamtbetrachtung: Tatherrschaft, Interesse am Erfolg, Umfang der Tatbeteiligung.", argument: "Flexibilität" },
          { name: "Tatherrschaftslehre (h. L.)", content: "Täter ist, wer das Tatgeschehen als Zentralgestalt planvoll lenkend in den Händen hält.", argument: "Objektivierbarkeit, Wortlaut § 25 I StGB" },
        ],
        decision: "Die h. L. ist vorzugswürdig; die Rspr. kommt durch ihre normative Gesamtbetrachtung meist zum selben Ergebnis.",
      },
    ],
    structures: [
      {
        title: "Aufbau bei mehreren Beteiligten",
        points: [
          "Tatnächsten zuerst prüfen (Täter vor Teilnehmer).",
          "Mittäter: gemeinsame Prüfung möglich, wenn beide alle Merkmale selbst verwirklichen; sonst getrennt mit Zurechnung über § 25 II.",
          "Teilnahme setzt Prüfung der Haupttat voraus – inzident oder vorher.",
        ],
      },
    ],
    quiz: [
      {
        id: "tt-q1",
        type: "single",
        question: "Kann man einen bereits fest zur Tat Entschlossenen (omnimodo facturus) anstiften?",
        options: ["Ja, immer", "Nein, aber ggf. psychische Beihilfe oder § 30 StGB", "Nur bei Verbrechen", "Ja, wenn er Geld anbietet"],
        correct: [1],
        explanation: "Beim omnimodo facturus kann kein Tatentschluss mehr hervorgerufen werden; in Betracht kommen psychische Beihilfe (§ 27) oder versuchte Anstiftung (§ 30 I StGB) bei Verbrechen.",
      },
    ],
    flashcards: [
      { id: "fc-tt-1", front: "Was bedeutet limitierte Akzessorietät?", back: "Teilnahme setzt eine vorsätzliche und rechtswidrige, nicht aber schuldhafte Haupttat voraus (§§ 26, 27, 29 StGB)." },
      { id: "fc-tt-2", front: "Voraussetzungen Mittäterschaft?", back: "Gemeinsamer Tatplan + wesentlicher Tatbeitrag im Ausführungsstadium (h. L.) bzw. Täterwille (Rspr.)." },
    ],
  },

  // ───────────────────────────── StGB BT ─────────────────────────────
  {
    id: "diebstahl",
    areaId: "strafrecht",
    subareaId: "stgb-bt",
    title: "Diebstahl, § 242 StGB",
    summary: "Fremde bewegliche Sache, Wegnahme (Gewahrsamsbruch) und Zueignungsabsicht – mit Regelbeispielen (§ 243 StGB).",
    norms: ["§§ 242–244a StGB", "§ 248a StGB"],
    difficulty: 1,
    schemata: [
      {
        id: "242-schema",
        title: "Diebstahl, § 242 I StGB",
        norm: "§ 242 I StGB",
        steps: [
          {
            title: "Objektiver Tatbestand",
            children: [
              { title: "Fremde bewegliche Sache", hint: "Fremd: im (Mit-)Eigentum eines anderen, nicht herrenlos." },
              {
                title: "Wegnahme",
                hint: "Bruch fremden und Begründung neuen, nicht notwendig tätereigenen Gewahrsams.",
                problems: ["Gewahrsamslockerung vs. -verlust", "Gewahrsamsenklave (Ladendiebstahl)", "Abgrenzung zum Betrug (Sachbetrug)", "Tatbestandsausschließendes Einverständnis"],
              },
            ],
          },
          {
            title: "Subjektiver Tatbestand",
            children: [
              { title: "Vorsatz" },
              {
                title: "Zueignungsabsicht",
                children: [
                  { title: "Aneignungsabsicht (dolus directus 1. Grades)", hint: "Zumindest vorübergehende Einverleibung der Sache oder ihres Sachwerts." },
                  { title: "Enteignungsvorsatz (dolus eventualis genügt)", hint: "Dauerhafte Verdrängung des Berechtigten." },
                ],
                problems: ["Sachwerttheorie / Substanztheorie (Vereinigungsformel)", "Gebrauchsanmaßung"],
              },
              { title: "Rechtswidrigkeit der erstrebten Zueignung (+ Vorsatz)", hint: "Kein fälliger, einredefreier Anspruch auf die Sache." },
            ],
          },
          { title: "Rechtswidrigkeit" },
          { title: "Schuld" },
          { title: "Strafzumessung: § 243 StGB (Regelbeispiele)", hint: "Kein Tatbestand! Nach der Schuld prüfen." },
        ],
      },
    ],
    definitions: [
      { term: "Wegnahme", text: "Bruch fremden und Begründung neuen, nicht notwendigerweise tätereigenen Gewahrsams." },
      { term: "Gewahrsam", text: "Von einem natürlichen Herrschaftswillen getragene tatsächliche Sachherrschaft, deren Reichweite nach der Verkehrsanschauung bestimmt wird." },
      { term: "Zueignungsabsicht", text: "Absicht, sich oder einem Dritten die Sache oder den in ihr verkörperten Sachwert zumindest vorübergehend anzueignen, und Vorsatz, den Berechtigten dauerhaft zu enteignen." },
    ],
    disputes: [
      {
        title: "Abgrenzung Diebstahl – Betrug",
        problem: "Wie ist der Trickdiebstahl vom Sachbetrug abzugrenzen?",
        views: [
          { name: "Innere Willensrichtung (h. M.)", content: "Betrug bei freiwilliger, unmittelbarer Vermögensverfügung mit Verfügungsbewusstsein; Diebstahl bei Gewahrsamsbruch.", argument: "Exklusivitätsverhältnis von Selbst- und Fremdschädigung" },
          { name: "Lagertheorie (Dreieck)", content: "Bei Dreieckskonstellationen: Betrug, wenn der Getäuschte im Lager des Geschädigten steht.", argument: "Nähebeziehung" },
        ],
        decision: "Diebstahl (Fremdschädigung) und Betrug (Selbstschädigung) schließen sich gegenseitig aus; maßgeblich ist das Verfügungsbewusstsein.",
      },
    ],
    structures: [
      {
        title: "Regelbeispiele § 243 I 2 StGB",
        points: ["Nr. 1: Einbruch, Einsteigen, falscher Schlüssel", "Nr. 2: besondere Schutzvorrichtung", "Nr. 3: gewerbsmäßig", "Nr. 6: Ausnutzen von Hilflosigkeit", "§ 243 II: Geringwertigkeitsklausel (ca. 25–50 €)"],
      },
    ],
    quiz: [
      {
        id: "dieb-q1",
        type: "single",
        question: "T steckt im Supermarkt eine Flasche Whisky in seine Jackentasche. Wann ist der Diebstahl vollendet?",
        options: ["Erst beim Verlassen des Ladens", "Erst beim Passieren der Kasse", "Bereits mit dem Einstecken (Gewahrsamsenklave)", "Gar nicht, da Kameras laufen"],
        correct: [2],
        explanation: "Durch das Einstecken in die Kleidung begründet T eine Gewahrsamsenklave; die Wegnahme ist vollendet. Beobachtung schließt die Vollendung nicht aus – Diebstahl ist keine heimliche Tat.",
        trap: "Beobachtung durch Detektive/Kameras hindert die Vollendung nicht!",
      },
      {
        id: "dieb-q2",
        type: "case",
        snippet: "S nimmt das Fahrrad seines Nachbarn N, um damit eine Spritztour zu unternehmen. Danach stellt er es wie geplant zurück.",
        question: "Hat sich S nach § 242 StGB strafbar gemacht?",
        solution:
          "Objektiv liegt eine Wegnahme einer fremden beweglichen Sache vor. Fraglich ist die Zueignungsabsicht. S hatte zwar Aneignungsabsicht (vorübergehende Nutzung), aber keinen Enteignungsvorsatz, da er das Rad zurückbringen wollte und der Sachwert nicht verbraucht wird. Es handelt sich um eine bloße Gebrauchsanmaßung (furtum usus). § 242 StGB scheidet aus; in Betracht kommt § 248b StGB (unbefugter Gebrauch eines Fahrzeugs – Fahrräder sind erfasst).",
        keyPoints: [
          { label: "Wegnahme einer fremden beweglichen Sache (+)", keywords: ["wegnahme", "fremd", "beweglich"] },
          { label: "Aneignungsabsicht (+)", keywords: ["aneignung"] },
          { label: "Enteignungsvorsatz (–)", keywords: ["enteignung"] },
          { label: "Gebrauchsanmaßung", keywords: ["gebrauchsanmaßung", "furtum usus", "gebrauch"] },
          { label: "§ 248b StGB", keywords: ["248b"] },
        ],
        traps: ["Gebrauchsanmaßung ist kein Diebstahl!", "§ 248b I StGB erfasst ausdrücklich auch Fahrräder."],
      },
    ],
    flashcards: [
      { id: "fc-dieb-1", front: "Definition Wegnahme", back: "Bruch fremden und Begründung neuen, nicht notwendig tätereigenen Gewahrsams." },
      { id: "fc-dieb-2", front: "Definition Gewahrsam", back: "Von natürlichem Herrschaftswillen getragene tatsächliche Sachherrschaft nach Verkehrsanschauung." },
      { id: "fc-dieb-3", front: "Bestandteile der Zueignungsabsicht?", back: "Aneignungsabsicht (dolus directus 1. Grades) + Enteignungsvorsatz (dolus eventualis genügt)." },
      { id: "fc-dieb-4", front: "Rechtsnatur des § 243 StGB?", back: "Strafzumessungsregel mit Regelbeispielen – kein Qualifikationstatbestand." },
    ],
  },
  {
    id: "betrug",
    areaId: "strafrecht",
    subareaId: "stgb-bt",
    title: "Betrug, § 263 StGB",
    summary: "Täuschung, Irrtum, Vermögensverfügung, Vermögensschaden – Stoffgleichheit und Bereicherungsabsicht.",
    norms: ["§ 263 StGB", "§ 263a StGB"],
    difficulty: 3,
    schemata: [
      {
        id: "263-schema",
        title: "Betrug, § 263 I StGB",
        norm: "§ 263 I StGB",
        steps: [
          {
            title: "Objektiver Tatbestand",
            children: [
              { title: "Täuschung über Tatsachen", hint: "Ausdrücklich, konkludent oder durch Unterlassen (Garantenstellung).", problems: ["Abgrenzung Tatsache / Werturteil"] },
              { title: "Irrtum", hint: "Fehlvorstellung über Tatsachen; sachgedankliches Mitbewusstsein genügt.", problems: ["Zweifel des Opfers"] },
              { title: "Vermögensverfügung", hint: "Jedes Tun, Dulden oder Unterlassen, das unmittelbar vermögensmindernd wirkt.", problems: ["Dreiecksbetrug", "Verfügungsbewusstsein beim Sachbetrug"] },
              { title: "Vermögensschaden", hint: "Gesamtsaldierung vor und nach der Verfügung.", problems: ["Eingehungsbetrug", "Persönlicher Schadenseinschlag", "Vermögensbegriff"] },
            ],
          },
          {
            title: "Subjektiver Tatbestand",
            children: [
              { title: "Vorsatz" },
              { title: "Bereicherungsabsicht", hint: "Absicht rechtswidriger, stoffgleicher Bereicherung." },
              { title: "Rechtswidrigkeit der Bereicherung + Vorsatz" },
            ],
          },
          { title: "Rechtswidrigkeit & Schuld" },
          { title: "Strafzumessung: § 263 III StGB" },
        ],
      },
    ],
    definitions: [
      { term: "Täuschung", text: "Jedes Verhalten, das objektiv irreführt oder einen Irrtum unterhält und damit auf die Vorstellung eines anderen einwirkt." },
      { term: "Tatsachen", text: "Alle gegenwärtigen oder vergangenen Verhältnisse, Zustände oder Geschehnisse, die dem Beweis zugänglich sind (auch innere Tatsachen)." },
      { term: "Stoffgleichheit", text: "Der erstrebte Vorteil muss die Kehrseite des Schadens sein; Schaden und Vorteil müssen auf derselben Verfügung beruhen." },
    ],
    disputes: [
      {
        title: "Vermögensbegriff",
        problem: "Was ist strafrechtlich geschütztes Vermögen?",
        views: [
          { name: "Juristischer Vermögensbegriff", content: "Summe aller Vermögensrechte und -pflichten.", argument: "Einheit der Rechtsordnung; heute kaum vertreten" },
          { name: "Wirtschaftlicher Vermögensbegriff (Rspr.)", content: "Alle Güter mit wirtschaftlichem Wert, auch rechtswidrig erlangte.", argument: "Keine strafrechtsfreien Räume" },
          { name: "Juristisch-ökonomischer Vermögensbegriff (h. L.)", content: "Güter mit wirtschaftlichem Wert, die unter dem Schutz der Rechtsordnung stehen.", argument: "Einheit der Rechtsordnung" },
        ],
        decision: "Relevant v. a. bei sittenwidrigen Geschäften (z. B. Ganovenbetrug) – Ergebnis offenlegen, dann entscheiden.",
      },
    ],
    structures: [
      {
        title: "Merkhilfe: Kausalkette",
        points: ["Täuschung → Irrtum → Verfügung → Schaden", "Jedes Merkmal muss auf dem vorherigen beruhen (durchgehender Kausal- und Funktionszusammenhang)."],
      },
    ],
    quiz: [
      {
        id: "betr-q1",
        type: "multi",
        question: "Welche Merkmale gehören zum objektiven Tatbestand des § 263 StGB? (Mehrfachauswahl)",
        options: ["Täuschung über Tatsachen", "Irrtum", "Wegnahme", "Vermögensverfügung", "Vermögensschaden", "Bereicherungsabsicht"],
        correct: [0, 1, 3, 4],
        explanation: "Die Bereicherungsabsicht ist subjektives Merkmal; die Wegnahme gehört zu § 242 StGB.",
      },
      {
        id: "betr-q2",
        type: "single",
        question: "Ist das ungeschriebene Merkmal „Vermögensverfügung“ beim Sachbetrug von einem Verfügungsbewusstsein abhängig?",
        options: ["Ja, nach h. M. zur Abgrenzung von § 242 StGB", "Nein, nie", "Nur beim Dreiecksbetrug", "Nur bei Forderungen"],
        correct: [0],
        explanation: "Beim Sachbetrug verlangt die h. M. Verfügungsbewusstsein, um Betrug (Selbstschädigung) und Diebstahl (Fremdschädigung) abzugrenzen.",
      },
    ],
    flashcards: [
      { id: "fc-betr-1", front: "Prüfungskette § 263 StGB?", back: "Täuschung – Irrtum – Vermögensverfügung – Vermögensschaden; subjektiv Vorsatz + stoffgleiche Bereicherungsabsicht." },
      { id: "fc-betr-2", front: "Definition Vermögensverfügung", back: "Jedes Handeln, Dulden oder Unterlassen, das unmittelbar zu einer Vermögensminderung führt." },
      { id: "fc-betr-3", front: "Was bedeutet Stoffgleichheit?", back: "Der erstrebte Vorteil muss die Kehrseite des Schadens sein (gleiche Verfügung)." },
    ],
  },
  {
    id: "toetungsdelikte",
    areaId: "strafrecht",
    subareaId: "stgb-bt",
    title: "Tötungsdelikte, §§ 211, 212 StGB",
    summary: "Totschlag und Mord – Mordmerkmale der 1., 2. und 3. Gruppe, Verhältnis der Tatbestände und § 28 StGB.",
    norms: ["§§ 211–213 StGB", "§ 28 StGB"],
    difficulty: 2,
    schemata: [
      {
        id: "211-schema",
        title: "Mord, §§ 212, 211 StGB",
        norm: "§§ 212 I, 211 StGB",
        steps: [
          {
            title: "Objektiver Tatbestand",
            children: [
              { title: "Tötung eines anderen Menschen", norm: "§ 212 I StGB" },
              { title: "Objektive Mordmerkmale (2. Gruppe)", hint: "Heimtücke, Grausamkeit, gemeingefährliche Mittel.", problems: ["Heimtücke: Arg- und Wehrlosigkeit; feindliche Willensrichtung", "Schlafende / Bewusstlose"] },
            ],
          },
          {
            title: "Subjektiver Tatbestand",
            children: [
              { title: "Vorsatz bzgl. Tötung und objektiver Mordmerkmale" },
              { title: "Subjektive Mordmerkmale (1. & 3. Gruppe)", hint: "Mordlust, Befriedigung des Geschlechtstriebs, Habgier, sonst niedrige Beweggründe; Ermöglichungs-/Verdeckungsabsicht." },
            ],
          },
          { title: "Rechtswidrigkeit & Schuld" },
        ],
      },
    ],
    definitions: [
      { term: "Heimtücke", text: "Bewusstes Ausnutzen der Arg- und Wehrlosigkeit des Opfers in feindseliger Willensrichtung." },
      { term: "Arglosigkeit", text: "Das Opfer versieht sich zum Zeitpunkt der Tat (Beginn des Versuchs) keines Angriffs auf Leib oder Leben." },
      { term: "Niedrige Beweggründe", text: "Motive, die nach allgemeiner sittlicher Wertung auf tiefster Stufe stehen und deshalb besonders verachtenswert sind." },
    ],
    disputes: [
      {
        title: "Verhältnis von § 211 zu § 212 StGB",
        problem: "Ist Mord ein eigenständiges Delikt oder eine Qualifikation des Totschlags?",
        views: [
          { name: "Rspr. (traditionell)", content: "Eigenständige Tatbestände; subjektive Mordmerkmale strafbegründend → § 28 I StGB.", argument: "Gesetzessystematik („Mörder“ / „Totschläger“)" },
          { name: "h. L.", content: "Qualifikation; subjektive Mordmerkmale strafschärfend → § 28 II StGB.", argument: "Gleiches Rechtsgut, Mord enthält alle Merkmale des Totschlags" },
        ],
        decision: "Relevanz bei Teilnahme an täterbezogenen Mordmerkmalen; BGH hat Abkehr angedeutet (BGH NJW 2006, 1008).",
      },
    ],
    structures: [
      {
        title: "Mordmerkmale – Gruppen",
        points: ["1. Gruppe (Motiv): Mordlust, Geschlechtstrieb, Habgier, niedrige Beweggründe", "2. Gruppe (Begehungsweise): heimtückisch, grausam, gemeingefährlich", "3. Gruppe (Ziel): Ermöglichungs-, Verdeckungsabsicht"],
      },
    ],
    quiz: [
      {
        id: "toet-q1",
        type: "single",
        question: "Zu welcher Gruppe gehört das Mordmerkmal „Heimtücke“?",
        options: ["1. Gruppe (täterbezogen)", "2. Gruppe (tatbezogen)", "3. Gruppe (Absicht)", "Keiner Gruppe – Regelbeispiel"],
        correct: [1],
        explanation: "Heimtücke ist ein tatbezogenes Merkmal der 2. Gruppe; bei Teilnehmern gilt daher die strenge Akzessorietät (kein § 28 StGB).",
      },
    ],
    flashcards: [
      { id: "fc-toet-1", front: "Definition Heimtücke", back: "Bewusstes Ausnutzen der Arg- und Wehrlosigkeit des Opfers in feindseliger Willensrichtung." },
      { id: "fc-toet-2", front: "Gilt § 28 StGB für die 2. Gruppe der Mordmerkmale?", back: "Nein, sie sind tatbezogen; es gilt die allgemeine Akzessorietät." },
    ],
  },
];
