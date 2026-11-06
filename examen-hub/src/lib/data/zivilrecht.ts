import type { Topic } from "../types";

export const zivilrechtTopics: Topic[] = [
  // ───────────────────────────── BGB AT ─────────────────────────────
  {
    id: "vertragsschluss",
    areaId: "zivilrecht",
    subareaId: "bgb-at",
    title: "Vertragsschluss & Willenserklärung",
    summary:
      "Angebot und Annahme (§§ 145 ff. BGB), objektiver und subjektiver Tatbestand der Willenserklärung, Zugang und Widerruf.",
    norms: ["§§ 104 ff. BGB", "§§ 130 ff. BGB", "§§ 145 ff. BGB"],
    difficulty: 1,
    schemata: [
      {
        id: "anspruchsaufbau",
        title: "Grundaufbau eines vertraglichen Primäranspruchs",
        norm: "z. B. § 433 II BGB",
        intro: "Klassische Dreiteilung jeder Anspruchsprüfung im Zivilrecht.",
        steps: [
          {
            title: "Anspruch entstanden",
            children: [
              {
                title: "Einigung: Angebot",
                norm: "§ 145 BGB",
                hint: "Empfangsbedürftige WE, die so bestimmt ist, dass die Annahme durch bloßes „Ja“ erfolgen kann (essentialia negotii).",
                problems: ["Abgrenzung zur invitatio ad offerendum (Schaufenster, Online-Shop)", "Schweigen als WE"],
              },
              {
                title: "Einigung: Annahme",
                norm: "§§ 146 ff. BGB",
                hint: "Vorbehaltlose Zustimmung zum Angebot, rechtzeitig (§§ 147, 148 BGB).",
                problems: ["Verspätete/abändernde Annahme, § 150 BGB", "Verzicht auf Zugang, § 151 BGB", "Kaufmännisches Bestätigungsschreiben"],
              },
              {
                title: "Keine rechtshindernden Einwendungen",
                hint: "Geschäftsunfähigkeit (§§ 104 f.), Formmangel (§ 125), Gesetzesverstoß (§ 134), Sittenwidrigkeit (§ 138), Minderjährigkeit (§§ 107 ff.).",
              },
            ],
          },
          {
            title: "Anspruch nicht untergegangen",
            hint: "Rechtsvernichtende Einwendungen",
            children: [
              { title: "Erfüllung", norm: "§ 362 BGB" },
              { title: "Anfechtung", norm: "§ 142 I BGB", problems: ["Anfechtungsgrund, -erklärung, -frist"] },
              { title: "Unmöglichkeit", norm: "§ 275 BGB" },
              { title: "Rücktritt / Aufrechnung", norm: "§§ 346, 389 BGB" },
            ],
          },
          {
            title: "Anspruch durchsetzbar",
            hint: "Rechtshemmende Einreden",
            children: [
              { title: "Verjährung", norm: "§ 214 I BGB" },
              { title: "Zurückbehaltungsrecht / Einrede des nicht erfüllten Vertrags", norm: "§§ 273, 320 BGB" },
            ],
          },
        ],
      },
      {
        id: "willenserklaerung",
        title: "Tatbestand der Willenserklärung",
        norm: "§§ 116 ff., 130 BGB",
        steps: [
          {
            title: "Objektiver Tatbestand",
            hint: "Verhalten, das sich aus Sicht eines objektiven Empfängers (§§ 133, 157 BGB) als Äußerung eines Rechtsbindungswillens darstellt.",
          },
          {
            title: "Subjektiver Tatbestand",
            children: [
              { title: "Handlungswille", hint: "Fehlt er (z. B. Reflex), liegt keine WE vor." },
              {
                title: "Erklärungsbewusstsein",
                hint: "Bewusstsein, irgendetwas rechtlich Erhebliches zu erklären.",
                problems: ["Trierer Weinversteigerung: h. M. – WE bei fahrlässiger Zurechenbarkeit, aber anfechtbar analog § 119 I BGB"],
              },
              { title: "Geschäftswille", hint: "Nicht konstitutiv; Fehlen führt nur zur Anfechtbarkeit." },
            ],
          },
          {
            title: "Wirksamwerden",
            children: [
              { title: "Abgabe", hint: "Willentliche Entäußerung in Richtung Empfänger.", problems: ["Abhandengekommene WE"] },
              { title: "Zugang", norm: "§ 130 I 1 BGB", hint: "Machtbereich des Empfängers + Möglichkeit der Kenntnisnahme unter gewöhnlichen Umständen." },
              { title: "Kein Widerruf", norm: "§ 130 I 2 BGB", hint: "Widerruf muss vorher oder gleichzeitig zugehen." },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Willenserklärung", text: "Äußerung eines auf die Herbeiführung einer Rechtsfolge gerichteten Willens.", source: "allg. M." },
      { term: "Angebot", text: "Empfangsbedürftige Willenserklärung, durch die einem anderen ein Vertragsschluss so angetragen wird, dass das Zustandekommen nur noch von dessen Einverständnis abhängt.", source: "§ 145 BGB" },
      { term: "Zugang", text: "Eine WE ist zugegangen, wenn sie so in den Machtbereich des Empfängers gelangt ist, dass dieser unter normalen Umständen die Möglichkeit hat, von ihr Kenntnis zu nehmen.", source: "BGH NJW 2004, 1320" },
      { term: "invitatio ad offerendum", text: "Aufforderung zur Abgabe eines Angebots ohne eigenen Rechtsbindungswillen (z. B. Katalog, Schaufensterauslage, Online-Shop-Präsentation)." },
    ],
    disputes: [
      {
        title: "Fehlendes Erklärungsbewusstsein",
        problem: "Liegt eine wirksame WE vor, wenn der Erklärende nicht wusste, dass sein Verhalten rechtserheblich ist?",
        views: [
          { name: "Willenstheorie", content: "Keine WE, da das Erklärungsbewusstsein konstitutiv ist; analog § 118 BGB nichtig.", argument: "Privatautonomie / Selbstbestimmung" },
          { name: "Erklärungstheorie (h. M., BGH)", content: "WE liegt vor, wenn der Erklärende bei Anwendung der verkehrserforderlichen Sorgfalt hätte erkennen können, dass sein Verhalten als WE aufgefasst wird; Anfechtung analog § 119 I BGB möglich.", argument: "Verkehrs- und Vertrauensschutz; Erklärender ist über § 122 BGB hinreichend geschützt" },
        ],
        decision: "Der h. M. ist zu folgen: Sie schützt den Rechtsverkehr und belässt dem Erklärenden über die Anfechtung die Wahl, ob er das Geschäft gelten lassen will.",
      },
    ],
    structures: [
      {
        title: "Merksätze zum Zugang",
        points: [
          "Unter Anwesenden: Vernehmungstheorie (eingeschränkt) – mündliche Erklärung geht zu, wenn der Empfänger sie akustisch richtig verstehen konnte.",
          "Briefkasten: Zugang zu dem Zeitpunkt, zu dem üblicherweise mit Leerung zu rechnen ist.",
          "E-Mail im Geschäftsverkehr: Zugang während der üblichen Geschäftszeiten mit Eingang im Postfach.",
          "Zugangsvereitelung: Empfänger muss sich nach § 242 BGB so behandeln lassen, als sei zugegangen.",
        ],
      },
    ],
    quiz: [
      {
        id: "vs-q1",
        type: "single",
        question: "Wie ist die Präsentation einer Ware in einem Online-Shop rechtlich regelmäßig einzuordnen?",
        options: ["Als bindendes Angebot ad incertas personas", "Als invitatio ad offerendum", "Als Annahme im Voraus", "Als Gefälligkeit ohne Rechtsbindungswillen"],
        correct: [1],
        explanation:
          "Der Shopbetreiber will sich nicht gegenüber einer unbestimmten Zahl von Personen binden (Lagerbestand, Bonität). Die Bestellung des Kunden ist das Angebot; die Annahme erfolgt i. d. R. durch Auftragsbestätigung oder Versand.",
        trap: "Die automatische Eingangsbestätigung nach § 312i I 1 Nr. 3 BGB ist meist noch keine Annahme!",
      },
      {
        id: "vs-q2",
        type: "multi",
        question: "Welche Elemente gehören zum subjektiven Tatbestand der Willenserklärung? (Mehrfachauswahl)",
        options: ["Handlungswille", "Rechtsbindungswille aus Empfängersicht", "Erklärungsbewusstsein", "Geschäftswille", "Zugang"],
        correct: [0, 2, 3],
        explanation: "Subjektiv: Handlungswille, Erklärungsbewusstsein, Geschäftswille. Der Rechtsbindungswille aus Empfängersicht gehört zum objektiven Tatbestand, der Zugang zum Wirksamwerden.",
      },
      {
        id: "vs-q3",
        type: "case",
        snippet:
          "A wirft am Freitag um 23 Uhr eine Kündigung des Mietvertrags in den Briefkasten des Vermieters V. V leert den Briefkasten erst am Montag.",
        question: "Wann ist die Kündigung zugegangen? Begründe kurz.",
        solution:
          "Die Kündigung ist eine empfangsbedürftige WE und wird unter Abwesenden mit Zugang wirksam (§ 130 I 1 BGB). Zugegangen ist sie, wenn sie in den Machtbereich des Empfängers gelangt ist und dieser unter gewöhnlichen Umständen die Möglichkeit der Kenntnisnahme hat. Mit Einwurf um 23 Uhr gelangt sie zwar in den Machtbereich; mit einer Leerung ist aber erst am nächsten Tag (Samstag, da Postzustellung auch samstags erfolgt) zu rechnen. Zugang daher am Samstag – nicht erst am Montag, da es auf die tatsächliche Kenntnisnahme nicht ankommt.",
        keyPoints: [
          { label: "§ 130 I 1 BGB / empfangsbedürftige WE unter Abwesenden", keywords: ["130", "abwesend", "empfangsbedürftig"] },
          { label: "Definition Zugang: Machtbereich + Möglichkeit der Kenntnisnahme", keywords: ["machtbereich", "kenntnisnahme", "gewöhnlich", "normal"] },
          { label: "Zugang am Samstag (nächste übliche Leerung)", keywords: ["samstag"] },
          { label: "Tatsächliche Kenntnisnahme unerheblich", keywords: ["tatsächlich", "unerheblich", "nicht an", "nicht erst"] },
        ],
        traps: [
          "Nicht auf die tatsächliche Kenntnisnahme (Montag) abstellen.",
          "Einwurf zur Nachtzeit führt nicht zum sofortigen Zugang.",
        ],
      },
    ],
    flashcards: [
      { id: "fc-vs-1", front: "Definition: Willenserklärung", back: "Äußerung eines auf die Herbeiführung einer Rechtsfolge gerichteten Willens." },
      { id: "fc-vs-2", front: "Wann geht eine WE unter Abwesenden zu?", back: "Wenn sie so in den Machtbereich des Empfängers gelangt, dass dieser unter gewöhnlichen Umständen die Möglichkeit der Kenntnisnahme hat (§ 130 I 1 BGB)." },
      { id: "fc-vs-3", front: "Rechtsfolge einer verspäteten Annahme?", back: "Sie gilt als neues Angebot, § 150 I BGB." },
      { id: "fc-vs-4", front: "Fehlendes Erklärungsbewusstsein – h. M.?", back: "WE liegt vor, wenn der Erklärende hätte erkennen können, dass sein Verhalten als WE verstanden wird; Anfechtung analog § 119 I BGB, Schadensersatz § 122 BGB." },
    ],
  },
  {
    id: "anfechtung",
    areaId: "zivilrecht",
    subareaId: "bgb-at",
    title: "Anfechtung",
    summary: "Anfechtungsgründe (§§ 119, 120, 123 BGB), Erklärung, Frist und Rechtsfolgen (§§ 142, 122 BGB).",
    norms: ["§§ 119–124 BGB", "§ 142 BGB", "§ 122 BGB"],
    difficulty: 2,
    schemata: [
      {
        id: "anfechtung-schema",
        title: "Anfechtung (rechtsvernichtende Einwendung)",
        norm: "§ 142 I BGB",
        steps: [
          { title: "Anfechtbare Willenserklärung", hint: "Wirksame WE; bei Nichtigkeit aus anderen Gründen Lehre von der Doppelwirkung beachten." },
          {
            title: "Anfechtungsgrund",
            children: [
              { title: "Inhaltsirrtum", norm: "§ 119 I Alt. 1 BGB", hint: "Irrtum über Bedeutung der Erklärung." },
              { title: "Erklärungsirrtum", norm: "§ 119 I Alt. 2 BGB", hint: "Versprechen, Verschreiben, Vergreifen." },
              { title: "Eigenschaftsirrtum", norm: "§ 119 II BGB", hint: "Verkehrswesentliche Eigenschaft der Person oder Sache.", problems: ["Wert selbst ist keine Eigenschaft", "Vorrang der §§ 434 ff. BGB nach Gefahrübergang"] },
              { title: "Übermittlungsfehler", norm: "§ 120 BGB" },
              { title: "Arglistige Täuschung / Drohung", norm: "§ 123 BGB", problems: ["Dritter i. S. d. § 123 II BGB"] },
            ],
          },
          { title: "Anfechtungserklärung", norm: "§ 143 BGB", hint: "Gegenüber dem Anfechtungsgegner; Wort „Anfechtung“ nicht erforderlich." },
          { title: "Anfechtungsfrist", norm: "§§ 121, 124 BGB", hint: "§ 119/120: unverzüglich; § 123: ein Jahr." },
          { title: "Kein Ausschluss", hint: "Bestätigung, § 144 BGB." },
          { title: "Rechtsfolge", norm: "§ 142 I BGB", hint: "Nichtigkeit ex tunc; ggf. Schadensersatz § 122 BGB (nicht bei § 123)." },
        ],
      },
    ],
    definitions: [
      { term: "Verkehrswesentliche Eigenschaft", text: "Alle wertbildenden Faktoren, die der Sache unmittelbar und für eine gewisse Dauer anhaften und nach der Verkehrsanschauung für die Wertschätzung bedeutsam sind." },
      { term: "Unverzüglich", text: "Ohne schuldhaftes Zögern.", source: "§ 121 I 1 BGB" },
      { term: "Arglist", text: "Vorsatz bezüglich der Täuschung und der Irrtumserregung; bedingter Vorsatz genügt (auch Angaben „ins Blaue hinein“)." },
    ],
    disputes: [
      {
        title: "Kalkulationsirrtum",
        problem: "Berechtigt ein Rechenfehler bei der Preiskalkulation zur Anfechtung?",
        views: [
          { name: "Verdeckter Kalkulationsirrtum (h. M.)", content: "Unbeachtlicher Motivirrtum; keine Anfechtung.", argument: "Kalkulationsrisiko trägt der Erklärende" },
          { name: "Offener Kalkulationsirrtum", content: "Teilweise erweiterter Inhaltsirrtum angenommen; BGH: Auslegung, ggf. § 242 BGB (unzulässige Rechtsausübung bei positiver Kenntnis des Gegners).", argument: "Kalkulation wurde Gegenstand der Verhandlungen" },
        ],
        decision: "Grundsätzlich unbeachtlicher Motivirrtum; Korrektur über Auslegung, § 313 BGB oder § 242 BGB in Ausnahmefällen.",
      },
    ],
    structures: [
      {
        title: "Klausurtaktik",
        points: [
          "Anfechtung immer beim Prüfungspunkt „Anspruch untergegangen“ (§ 142 I BGB).",
          "Bei § 119 II BGB nach Gefahrübergang: Vorrang des Gewährleistungsrechts prüfen.",
          "§ 122 BGB als eigenen Anspruch des Anfechtungsgegners nicht vergessen.",
        ],
      },
    ],
    quiz: [
      {
        id: "anf-q1",
        type: "single",
        question: "K kauft ein Bild für 500 €, weil er glaubt, es sei 5.000 € wert. Kann er nach § 119 II BGB anfechten?",
        options: ["Ja, der Wert ist eine verkehrswesentliche Eigenschaft", "Nein, der Wert selbst ist keine Eigenschaft", "Ja, aber nur nach § 123 BGB", "Nein, weil Kaufverträge nicht anfechtbar sind"],
        correct: [1],
        explanation: "Der Marktwert ist keine Eigenschaft i. S. d. § 119 II BGB, sondern Ergebnis der wertbildenden Faktoren. Ein Irrtum über die Urheberschaft (wertbildender Faktor) wäre dagegen beachtlich.",
        trap: "Wertirrtum ≠ Eigenschaftsirrtum. Auf wertbildende Faktoren abstellen!",
      },
      {
        id: "anf-q2",
        type: "single",
        question: "Innerhalb welcher Frist muss bei arglistiger Täuschung angefochten werden?",
        options: ["Unverzüglich", "Zwei Wochen", "Ein Jahr ab Entdeckung", "Drei Jahre ab Jahresende"],
        correct: [2],
        explanation: "§ 124 I, II BGB: Ein Jahr ab Entdeckung der Täuschung; Höchstfrist zehn Jahre (§ 124 III BGB).",
      },
    ],
    flashcards: [
      { id: "fc-anf-1", front: "Rechtsfolge der Anfechtung?", back: "Nichtigkeit ex tunc, § 142 I BGB." },
      { id: "fc-anf-2", front: "Frist bei § 119 BGB?", back: "Unverzüglich (ohne schuldhaftes Zögern), § 121 I BGB." },
      { id: "fc-anf-3", front: "Wann kein Anspruch aus § 122 BGB?", back: "Bei Anfechtung nach § 123 BGB und wenn der Geschädigte den Grund kannte oder kennen musste (§ 122 II BGB)." },
    ],
  },

  // ───────────────────────────── Schuldrecht ─────────────────────────────
  {
    id: "kaufrecht-gewaehrleistung",
    areaId: "zivilrecht",
    subareaId: "schuldrecht",
    title: "Kaufrecht – Mängelgewährleistung",
    summary: "Sachmangel (§ 434 BGB), Nacherfüllung, Rücktritt, Minderung und Schadensersatz nach § 437 BGB.",
    norms: ["§§ 434 ff. BGB", "§§ 280 ff. BGB", "§§ 323 ff. BGB"],
    difficulty: 2,
    schemata: [
      {
        id: "nacherfuellung",
        title: "Anspruch auf Nacherfüllung",
        norm: "§§ 437 Nr. 1, 439 I BGB",
        steps: [
          { title: "Wirksamer Kaufvertrag", norm: "§ 433 BGB" },
          {
            title: "Sachmangel",
            norm: "§ 434 BGB",
            children: [
              { title: "Subjektive Anforderungen", norm: "§ 434 II BGB", hint: "Vereinbarte Beschaffenheit, vorausgesetzte Verwendung, Zubehör/Anleitungen." },
              { title: "Objektive Anforderungen", norm: "§ 434 III BGB", hint: "Gewöhnliche Verwendung, übliche Beschaffenheit, öffentliche Äußerungen." },
              { title: "Montageanforderungen", norm: "§ 434 IV BGB" },
              { title: "aliud / Mindermenge", norm: "§ 434 V BGB" },
            ],
          },
          { title: "Bei Gefahrübergang", norm: "§§ 446, 447 BGB", problems: ["Beweislastumkehr beim Verbrauchsgüterkauf, § 477 BGB (ein Jahr)"] },
          { title: "Kein Ausschluss", hint: "§ 442 BGB (Kenntnis), § 444 BGB, § 377 HGB, vertraglicher Ausschluss (§ 476 BGB beachten)." },
          { title: "Kein Ausschluss der Nacherfüllung", norm: "§§ 275, 439 IV BGB", problems: ["Unverhältnismäßigkeit der gewählten Art"] },
          { title: "Durchsetzbarkeit", norm: "§ 438 BGB", hint: "Verjährung grds. zwei Jahre ab Ablieferung." },
        ],
      },
      {
        id: "se-statt-leistung",
        title: "Schadensersatz statt der Leistung (behebbarer Mangel)",
        norm: "§§ 437 Nr. 3, 280 I, III, 281 BGB",
        steps: [
          { title: "Schuldverhältnis (Kaufvertrag)" },
          { title: "Pflichtverletzung", hint: "Lieferung einer mangelhaften Sache, § 433 I 2 BGB, bei Gefahrübergang." },
          { title: "Fristsetzung zur Nacherfüllung erfolglos", norm: "§ 281 I 1 BGB", problems: ["Entbehrlichkeit, §§ 281 II, 440 BGB", "Selbstvornahme ohne Fristsetzung → kein Ersatz"] },
          { title: "Vertretenmüssen", norm: "§ 280 I 2 BGB", hint: "Vermutet; Bezugspunkt: Nichtleistung trotz Frist." },
          { title: "Schaden", norm: "§§ 249 ff. BGB", hint: "Kleiner oder großer Schadensersatz (§ 281 I 3 BGB: Erheblichkeit)." },
        ],
      },
    ],
    definitions: [
      { term: "Gefahrübergang", text: "Grundsätzlich mit Übergabe der Kaufsache, § 446 S. 1 BGB; beim Versendungskauf mit Auslieferung an die Transportperson, § 447 I BGB (nicht beim Verbrauchsgüterkauf, § 475 II BGB)." },
      { term: "Mangelfolgeschaden", text: "Schaden an anderen Rechtsgütern des Käufers, der durch den Mangel verursacht wird; ersatzfähig über §§ 437 Nr. 3, 280 I BGB ohne Fristsetzung." },
    ],
    disputes: [
      {
        title: "Ein- und Ausbaukosten",
        problem: "Muss der Verkäufer im Rahmen der Nacherfüllung die Kosten für Ausbau der mangelhaften und Einbau der neuen Sache tragen?",
        views: [
          { name: "Gesetzliche Lösung seit 2018", content: "§ 439 III BGB: Verkäufer hat Ersatz der erforderlichen Aufwendungen für Aus- und Einbau zu leisten – auch im B2B-Verhältnis.", argument: "Umsetzung der EuGH-Rspr. (Weber/Putz)" },
        ],
        decision: "Der Streit ist durch § 439 III BGB gesetzlich entschieden; in der Klausur nur kurz darstellen.",
      },
    ],
    structures: [
      {
        title: "Abgrenzung der Schadensarten",
        points: [
          "Schadensersatz statt der Leistung: §§ 280 I, III, 281 BGB (Fristsetzung nötig).",
          "Schadensersatz neben der Leistung (Mangelfolgeschaden): § 280 I BGB.",
          "Verzögerungsschaden: §§ 280 I, II, 286 BGB.",
          "Abgrenzungsformel: Wäre der Schaden bei gedachter ordnungsgemäßer Nacherfüllung im letztmöglichen Zeitpunkt entfallen?",
        ],
      },
    ],
    quiz: [
      {
        id: "kr-q1",
        type: "single",
        question: "K repariert ein mangelhaftes Fahrrad selbst, ohne V eine Frist zu setzen. Kann er die Reparaturkosten ersetzt verlangen?",
        options: ["Ja, aus § 280 I BGB", "Ja, aus § 326 II 2 BGB analog", "Nein, das Recht zur zweiten Andienung des Verkäufers wurde umgangen", "Ja, aus GoA"],
        correct: [2],
        explanation: "Nach st. Rspr. (BGH) scheidet ein Anspruch bei eigenmächtiger Selbstvornahme aus; die §§ 437 ff. BGB sind abschließend und sichern das Recht des Verkäufers zur zweiten Andienung.",
        trap: "Keine Analogie zu § 326 II 2 BGB und keine Umgehung über GoA oder Bereicherungsrecht!",
      },
      {
        id: "kr-q2",
        type: "case",
        snippet:
          "Verbraucher K kauft bei Händler V einen Laptop. Nach vier Monaten fällt das Display aus. V behauptet, K habe das Gerät fallen lassen. Der Grund des Defekts ist nicht aufklärbar.",
        question: "Wer trägt die Beweislast für das Vorliegen eines Mangels bei Gefahrübergang?",
        solution:
          "Es handelt sich um einen Verbrauchsgüterkauf (§ 474 I BGB). Nach § 477 I BGB wird vermutet, dass ein Sachmangel, der sich innerhalb eines Jahres seit Gefahrübergang zeigt, bereits bei Gefahrübergang vorlag. Der Defekt zeigt sich nach vier Monaten. Die Vermutung greift daher; V muss beweisen, dass der Mangel erst später (durch Sturz) entstanden ist. Kann er das nicht, trägt er das Risiko der Unaufklärbarkeit.",
        keyPoints: [
          { label: "Verbrauchsgüterkauf, § 474 BGB", keywords: ["474", "verbrauchsgüterkauf", "verbraucher"] },
          { label: "Beweislastumkehr § 477 BGB", keywords: ["477", "vermutung", "beweislastumkehr"] },
          { label: "Frist: ein Jahr", keywords: ["ein jahr", "1 jahr", "zwölf monate", "12 monate"] },
          { label: "Ergebnis: V trägt die Beweislast", keywords: ["v muss", "verkäufer muss", "v trägt", "zulasten des v", "zu lasten des v"] },
        ],
        traps: ["Alte Sechs-Monats-Frist (bis 2021) nicht mehr verwenden.", "Vermutung betrifft den Zeitpunkt, nach BGH auch den Grundmangel."],
      },
    ],
    flashcards: [
      { id: "fc-kr-1", front: "Rangverhältnis der Mängelrechte?", back: "Vorrang der Nacherfüllung: Rücktritt, Minderung und SE statt der Leistung setzen grds. erfolglose Fristsetzung voraus." },
      { id: "fc-kr-2", front: "Verjährung der Mängelansprüche bei beweglichen Sachen?", back: "Zwei Jahre ab Ablieferung, § 438 I Nr. 3, II BGB." },
      { id: "fc-kr-3", front: "Beweislastumkehr beim Verbrauchsgüterkauf?", back: "§ 477 I BGB: Zeigt sich ein Mangel innerhalb eines Jahres, wird vermutet, dass er bei Gefahrübergang vorlag." },
    ],
  },
  {
    id: "delikt-823",
    areaId: "zivilrecht",
    subareaId: "schuldrecht",
    title: "Deliktsrecht – § 823 I BGB",
    summary: "Haftung für die Verletzung absoluter Rechtsgüter, Verkehrssicherungspflichten, haftungsbegründende und -ausfüllende Kausalität.",
    norms: ["§ 823 I BGB", "§ 823 II BGB", "§ 831 BGB"],
    difficulty: 2,
    schemata: [
      {
        id: "823-schema",
        title: "Schadensersatz aus § 823 I BGB",
        norm: "§ 823 I BGB",
        steps: [
          {
            title: "Haftungsbegründender Tatbestand",
            children: [
              { title: "Rechtsgutsverletzung", hint: "Leben, Körper, Gesundheit, Freiheit, Eigentum, sonstiges Recht.", problems: ["Recht am eingerichteten und ausgeübten Gewerbebetrieb (subsidiär)", "Allgemeines Persönlichkeitsrecht", "Weiterfresserschaden"] },
              { title: "Verletzungshandlung", hint: "Tun oder Unterlassen trotz Verkehrssicherungspflicht." },
              { title: "Haftungsbegründende Kausalität", hint: "Äquivalenz, Adäquanz, Schutzzweck der Norm." },
            ],
          },
          { title: "Rechtswidrigkeit", hint: "Indiziert bei unmittelbaren Eingriffen; bei mittelbaren Verletzungen/Unterlassen positiv festzustellen. Rahmenrechte: Güter- und Interessenabwägung." },
          { title: "Verschulden", norm: "§ 276 BGB", hint: "Deliktsfähigkeit §§ 827, 828 BGB." },
          {
            title: "Haftungsausfüllender Tatbestand",
            children: [
              { title: "Schaden", norm: "§§ 249 ff. BGB" },
              { title: "Haftungsausfüllende Kausalität" },
              { title: "Mitverschulden", norm: "§ 254 BGB" },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Sonstiges Recht", text: "Absolutes Recht, das wie das Eigentum Zuweisungs- und Ausschlussfunktion hat und gegenüber jedermann wirkt (z. B. Anwartschaftsrecht, berechtigter Besitz)." },
      { term: "Verkehrssicherungspflicht", text: "Pflicht dessen, der eine Gefahrenquelle schafft oder unterhält, die notwendigen und zumutbaren Vorkehrungen zum Schutz anderer zu treffen." },
    ],
    disputes: [
      {
        title: "Weiterfresserschaden",
        problem: "Liegt eine Eigentumsverletzung vor, wenn sich ein Mangel eines Einzelteils auf die gesamte Sache ausdehnt?",
        views: [
          { name: "BGH: Stoffgleichheit", content: "Eigentumsverletzung (+), wenn der Schaden mit dem ursprünglichen Mangelunwert nicht stoffgleich ist (abgrenzbares, funktionell begrenztes Teil).", argument: "Integritätsinteresse vs. Äquivalenzinteresse" },
          { name: "Teile der Literatur", content: "Ablehnung; Vorrang des Vertragsrechts, sonst Umgehung der kaufrechtlichen Verjährung.", argument: "Systematik der §§ 437 ff. BGB" },
        ],
        decision: "Mit dem BGH ist auf Stoffgleichheit abzustellen; § 823 I BGB schützt das Integritätsinteresse unabhängig von vertraglichen Ansprüchen.",
      },
    ],
    structures: [
      {
        title: "Abgrenzung § 823 I / II BGB",
        points: [
          "§ 823 I: Schutz absoluter Rechtsgüter – reine Vermögensschäden nicht ersatzfähig.",
          "§ 823 II: Verletzung eines Schutzgesetzes (z. B. § 263 StGB) – auch Vermögensschäden.",
          "§ 826: vorsätzliche sittenwidrige Schädigung.",
        ],
      },
    ],
    quiz: [
      {
        id: "dl-q1",
        type: "single",
        question: "Ist das Vermögen als solches ein „sonstiges Recht“ i. S. d. § 823 I BGB?",
        options: ["Ja", "Nein", "Nur bei Kaufleuten", "Nur bei vorsätzlicher Schädigung"],
        correct: [1],
        explanation: "Das Vermögen hat keine Zuweisungs- und Ausschlussfunktion; reine Vermögensschäden sind nur über § 823 II oder § 826 BGB ersatzfähig.",
      },
    ],
    flashcards: [
      { id: "fc-dl-1", front: "Prüfungsstruktur § 823 I BGB?", back: "Haftungsbegründender Tatbestand → Rechtswidrigkeit → Verschulden → haftungsausfüllender Tatbestand (Schaden, Kausalität, § 254)." },
      { id: "fc-dl-2", front: "Ab welchem Alter ist man deliktsfähig?", back: "Grds. ab 7 Jahren eingeschränkt (§ 828 I, III BGB), im Straßenverkehr bei Fahrlässigkeit erst ab 10 Jahren (§ 828 II BGB)." },
    ],
  },

  // ───────────────────────────── Sachenrecht ─────────────────────────────
  {
    id: "eigentumserwerb-beweglich",
    areaId: "zivilrecht",
    subareaId: "sachenrecht",
    title: "Eigentumserwerb an beweglichen Sachen",
    summary: "Rechtsgeschäftlicher Erwerb vom Berechtigten (§ 929 S. 1 BGB) und gutgläubiger Erwerb vom Nichtberechtigten (§§ 932 ff. BGB).",
    norms: ["§§ 929–936 BGB", "§ 366 HGB"],
    difficulty: 2,
    schemata: [
      {
        id: "929-schema",
        title: "Eigentumserwerb nach § 929 S. 1 BGB",
        norm: "§ 929 S. 1 BGB",
        steps: [
          { title: "Einigung", hint: "Dinglicher Vertrag über den Eigentumsübergang; Abstraktionsprinzip!", problems: ["Bedingte Einigung (Eigentumsvorbehalt, § 449 BGB)"] },
          { title: "Übergabe", hint: "Vollständiger Besitzverlust des Veräußerers, Besitzerwerb des Erwerbers auf Veranlassung des Veräußerers.", problems: ["Geheißerwerb", "Besitzdiener / -mittler"] },
          { title: "Einigsein im Zeitpunkt der Übergabe" },
          {
            title: "Berechtigung des Veräußerers",
            hint: "Eigentümer mit Verfügungsbefugnis oder Ermächtigung (§ 185 BGB).",
            children: [
              {
                title: "Falls (–): Gutgläubiger Erwerb",
                norm: "§§ 932 ff. BGB",
                children: [
                  { title: "Rechtsgeschäft im Sinne eines Verkehrsgeschäfts" },
                  { title: "Rechtsschein des Besitzes" },
                  { title: "Guter Glaube", norm: "§ 932 II BGB", hint: "Weder Kenntnis noch grob fahrlässige Unkenntnis vom fehlenden Eigentum." },
                  { title: "Kein Abhandenkommen", norm: "§ 935 BGB", problems: ["Ausnahme: Geld, Inhaberpapiere, öffentliche Versteigerung (§ 935 II BGB)"] },
                ],
              },
            ],
          },
        ],
      },
    ],
    definitions: [
      { term: "Abhandenkommen", text: "Unfreiwilliger Verlust des unmittelbaren Besitzes durch den Eigentümer (oder seinen Besitzmittler)." },
      { term: "Grobe Fahrlässigkeit", text: "Die im Verkehr erforderliche Sorgfalt wird in ungewöhnlich hohem Maße verletzt; es wird unbeachtet gelassen, was jedem hätte einleuchten müssen." },
      { term: "Abstraktionsprinzip", text: "Das dingliche Verfügungsgeschäft ist in seiner Wirksamkeit unabhängig vom zugrunde liegenden schuldrechtlichen Verpflichtungsgeschäft." },
    ],
    disputes: [
      {
        title: "Gebrauchtwagenkauf ohne Zulassungsbescheinigung Teil II",
        problem: "Ist der Erwerber grob fahrlässig, wenn er sich den Fahrzeugbrief nicht vorlegen lässt?",
        views: [
          { name: "St. Rspr.", content: "Ja, regelmäßig grobe Fahrlässigkeit; bei Vorlage zusätzlich Prüfung auf Fälschungsanzeichen erforderlich.", argument: "Der Brief dient dem Schutz des Eigentums" },
        ],
        decision: "Fehlende Vorlage begründet i. d. R. grobe Fahrlässigkeit (§ 932 II BGB).",
      },
    ],
    structures: [
      {
        title: "Übergabesurrogate",
        points: [
          "§ 929 S. 2 BGB: Erwerber ist bereits im Besitz (brevi manu traditio).",
          "§ 930 BGB: Besitzkonstitut – gutgläubig erst mit Übergabe (§ 933 BGB).",
          "§ 931 BGB: Abtretung des Herausgabeanspruchs – gutgläubig nach § 934 BGB.",
        ],
      },
    ],
    quiz: [
      {
        id: "ew-q1",
        type: "single",
        question: "Dieb D verkauft und übergibt ein gestohlenes Fahrrad an den gutgläubigen G. Wird G Eigentümer?",
        options: ["Ja, nach § 932 BGB", "Nein, wegen § 935 I BGB", "Ja, nach § 366 HGB", "Ja, wenn G den Kaufpreis gezahlt hat"],
        correct: [1],
        explanation: "Die Sache ist dem Eigentümer abhandengekommen (§ 935 I BGB); ein gutgläubiger Erwerb ist ausgeschlossen.",
      },
      {
        id: "ew-q2",
        type: "multi",
        question: "Welche Voraussetzungen hat der gutgläubige Erwerb nach §§ 929 S. 1, 932 BGB? (Mehrfachauswahl)",
        options: ["Verkehrsgeschäft", "Kaufpreiszahlung", "Rechtsschein des Besitzes", "Guter Glaube an das Eigentum", "Kein Abhandenkommen"],
        correct: [0, 2, 3, 4],
        explanation: "Die Kaufpreiszahlung betrifft das Verpflichtungsgeschäft und ist wegen des Abstraktionsprinzips irrelevant.",
        trap: "Abstraktionsprinzip! Das schuldrechtliche Geschäft spielt für den dinglichen Erwerb keine Rolle.",
      },
    ],
    flashcards: [
      { id: "fc-ew-1", front: "Voraussetzungen § 929 S. 1 BGB?", back: "Einigung, Übergabe, Einigsein bei Übergabe, Berechtigung des Veräußerers." },
      { id: "fc-ew-2", front: "Maßstab des guten Glaubens, § 932 II BGB?", back: "Nicht gutgläubig ist, wem bekannt oder infolge grober Fahrlässigkeit unbekannt ist, dass die Sache nicht dem Veräußerer gehört." },
      { id: "fc-ew-3", front: "Ausnahmen von § 935 I BGB?", back: "Geld, Inhaberpapiere und Sachen, die im Wege öffentlicher Versteigerung veräußert werden (§ 935 II BGB)." },
    ],
  },
  {
    id: "ebv",
    areaId: "zivilrecht",
    subareaId: "sachenrecht",
    title: "Herausgabeanspruch & EBV",
    summary: "Vindikation nach § 985 BGB, Recht zum Besitz (§ 986 BGB) und die Nebenfolgen des Eigentümer-Besitzer-Verhältnisses (§§ 987 ff. BGB).",
    norms: ["§§ 985–1003 BGB"],
    difficulty: 3,
    schemata: [
      {
        id: "985-schema",
        title: "Herausgabeanspruch § 985 BGB",
        norm: "§ 985 BGB",
        steps: [
          { title: "Anspruchsteller ist Eigentümer", hint: "Historische Prüfung des Eigentums (Ausgangslage → Erwerbs-/Verlusttatbestände)." },
          { title: "Anspruchsgegner ist Besitzer", hint: "Unmittelbarer oder mittelbarer Besitz." },
          { title: "Kein Recht zum Besitz", norm: "§ 986 BGB", problems: ["Abgeleitetes Besitzrecht (§ 986 I 1 Alt. 2)", "Zurückbehaltungsrecht als Besitzrecht?"] },
        ],
      },
    ],
    definitions: [
      { term: "Vindikationslage", text: "Situation, in der der Eigentümer gegen den Besitzer einen Anspruch aus § 985 BGB hat; Voraussetzung für die §§ 987 ff. BGB." },
    ],
    disputes: [
      {
        title: "Nicht-mehr-berechtigter Besitzer",
        problem: "Sind die §§ 987 ff. BGB anwendbar, wenn das Besitzrecht nachträglich entfällt?",
        views: [
          { name: "H. M.", content: "Ja, sofern zum Zeitpunkt der schädigenden Handlung eine Vindikationslage bestand.", argument: "Wortlaut, Zeitpunktbezogenheit" },
          { name: "A. A.", content: "Vertragsrecht verdrängt EBV auch nach Beendigung, soweit Abwicklungsregeln bestehen.", argument: "Sachnähere Regelung im Vertrag" },
        ],
        decision: "Im Zweifel h. M.; Vertragsansprüche bestehen daneben.",
      },
    ],
    structures: [
      {
        title: "Sperrwirkung des EBV (§ 993 I a. E. BGB)",
        points: [
          "Redlicher, unverklagter Besitzer haftet nicht auf Schadensersatz oder Nutzungsersatz außerhalb der §§ 987 ff. BGB.",
          "Ausnahmen: Fremdbesitzerexzess, § 826 BGB, Delikt durch Fremdbesitzer über Besitzrecht hinaus.",
        ],
      },
    ],
    quiz: [
      {
        id: "ebv-q1",
        type: "single",
        question: "Welche Funktion hat § 993 I Hs. 2 BGB?",
        options: ["Er gewährt einen Herausgabeanspruch", "Er begründet eine Sperrwirkung zugunsten des redlichen, unverklagten Besitzers", "Er regelt den Verwendungsersatz", "Er schließt § 985 BGB aus"],
        correct: [1],
        explanation: "Der gutgläubige unverklagte Besitzer soll grds. nicht weiter haften als nach §§ 987 ff. BGB vorgesehen (Privilegierung).",
      },
    ],
    flashcards: [
      { id: "fc-ebv-1", front: "Voraussetzungen § 985 BGB?", back: "Eigentum des Anspruchstellers, Besitz des Anspruchsgegners, kein Recht zum Besitz (§ 986 BGB)." },
      { id: "fc-ebv-2", front: "Was ist die Sperrwirkung des EBV?", back: "§ 993 I a. E. BGB: Der redliche, unverklagte Besitzer haftet nur nach §§ 987 ff. BGB, nicht aus Delikt oder Bereicherung." },
    ],
  },

  // ─────────────────────── Handels- & Gesellschaftsrecht ───────────────────────
  {
    id: "handelsregister",
    areaId: "zivilrecht",
    subareaId: "handels-gesellschaftsrecht",
    title: "Kaufmann & Publizität des Handelsregisters",
    summary: "Kaufmannsbegriff (§§ 1 ff. HGB) und Vertrauensschutz durch das Handelsregister (§ 15 HGB).",
    norms: ["§§ 1–6 HGB", "§ 15 HGB"],
    difficulty: 2,
    schemata: [
      {
        id: "15-1-hgb",
        title: "Negative Publizität, § 15 I HGB",
        norm: "§ 15 I HGB",
        steps: [
          { title: "Eintragungspflichtige Tatsache", hint: "Z. B. Erlöschen der Prokura, Ausscheiden eines Gesellschafters." },
          { title: "Fehlende Eintragung oder Bekanntmachung" },
          { title: "Geschäftlicher Verkehr", hint: "Nicht bei unerlaubter Handlung oder Unrechtsverkehr." },
          { title: "Gutgläubigkeit des Dritten", hint: "Keine positive Kenntnis; abstrakter Vertrauensschutz (Kausalität nicht erforderlich)." },
          { title: "Rechtsfolge", hint: "Tatsache kann dem Dritten nicht entgegengesetzt werden; Wahlrecht des Dritten (Rosinentheorie str.)." },
        ],
      },
    ],
    definitions: [
      { term: "Handelsgewerbe", text: "Jeder Gewerbebetrieb, es sei denn, dass das Unternehmen nach Art oder Umfang einen in kaufmännischer Weise eingerichteten Geschäftsbetrieb nicht erfordert.", source: "§ 1 II HGB" },
      { term: "Gewerbe", text: "Selbständige, planmäßige, auf Dauer angelegte, nach außen erkennbare Tätigkeit am Markt, die keinen freien Beruf darstellt (Gewinnerzielungsabsicht nach h. M. str.)." },
    ],
    disputes: [
      {
        title: "Rosinentheorie",
        problem: "Darf sich der Dritte bei § 15 I HGB teils auf die Registerlage und teils auf die wahre Rechtslage berufen?",
        views: [
          { name: "BGH / h. M.", content: "Ja, der Dritte darf sich für jede Tatsache gesondert entscheiden.", argument: "Wortlaut, Schutzzweck" },
          { name: "Teile der Lit.", content: "Nein, nur einheitliche Berufung, sonst unbillige Besserstellung.", argument: "Wertungswiderspruch" },
        ],
        decision: "Mit der h. M. ist die Rosinentheorie anzuerkennen.",
      },
    ],
    structures: [
      {
        title: "Kaufmannsarten",
        points: [
          "Istkaufmann, § 1 HGB",
          "Kannkaufmann, §§ 2, 3 HGB",
          "Formkaufmann, § 6 HGB (GmbH, AG)",
          "Fiktivkaufmann, § 5 HGB; Scheinkaufmann (Rechtsscheingrundsätze)",
        ],
      },
    ],
    quiz: [
      {
        id: "hr-q1",
        type: "single",
        question: "Muss der Dritte bei § 15 I HGB das Handelsregister tatsächlich eingesehen haben?",
        options: ["Ja, sonst fehlt die Kausalität", "Nein, der Vertrauensschutz ist abstrakt", "Nur bei Kaufleuten", "Nur bei Erlöschen der Prokura"],
        correct: [1],
        explanation: "§ 15 I HGB schützt abstrakt: Es kommt nicht darauf an, ob der Dritte das Register eingesehen hat.",
      },
    ],
    flashcards: [
      { id: "fc-hr-1", front: "Unterschied § 15 I und § 15 III HGB?", back: "§ 15 I: Schutz des Vertrauens auf das Schweigen des Registers. § 15 III: Schutz des Vertrauens auf eine unrichtige Bekanntmachung." },
      { id: "fc-hr-2", front: "Wann ist die GmbH Kaufmann?", back: "Als Formkaufmann kraft Rechtsform, § 6 I HGB i. V. m. § 13 III GmbHG." },
    ],
  },
  {
    id: "personengesellschaften",
    areaId: "zivilrecht",
    subareaId: "handels-gesellschaftsrecht",
    title: "Haftung in Personengesellschaften (nach MoPeG)",
    summary: "Rechtsfähigkeit der GbR (§ 705 II BGB) und akzessorische Gesellschafterhaftung (§ 721 BGB, § 126 HGB).",
    norms: ["§§ 705 ff. BGB", "§§ 721 ff. BGB", "§§ 126 ff. HGB"],
    difficulty: 3,
    schemata: [
      {
        id: "126-hgb",
        title: "Gesellschafterhaftung, § 126 HGB (OHG)",
        norm: "§ 126 S. 1 HGB",
        steps: [
          { title: "Verbindlichkeit der Gesellschaft", hint: "Zurechnung von Verträgen über Vertretung (§ 124 HGB), Delikt über § 31 BGB analog." },
          { title: "Gesellschafterstellung des Anspruchsgegners", problems: ["Eintritt: § 127 HGB", "Ausscheiden: § 137 HGB (Nachhaftung 5 Jahre)"] },
          { title: "Keine Einwendungen", norm: "§ 128 HGB", hint: "Gesellschafter kann Einwendungen der Gesellschaft geltend machen." },
        ],
      },
    ],
    definitions: [
      { term: "Akzessorische Haftung", text: "Die Haftung des Gesellschafters richtet sich in Bestand und Umfang nach der Verbindlichkeit der Gesellschaft." },
      { term: "Rechtsfähige GbR", text: "Gesellschaft, die nach dem gemeinsamen Willen der Gesellschafter am Rechtsverkehr teilnehmen soll, § 705 II BGB." },
    ],
    disputes: [
      {
        title: "Erfüllungs- oder Haftungstheorie",
        problem: "Haftet der Gesellschafter auf Erfüllung in Natur oder nur auf Geldersatz?",
        views: [
          { name: "Erfüllungstheorie (h. M.)", content: "Gesellschafter schuldet grds. dasselbe wie die Gesellschaft, soweit ihm die Leistung zumutbar ist.", argument: "Wortlaut „haften … für die Verbindlichkeiten“" },
          { name: "Haftungstheorie", content: "Nur Einstehen in Geld.", argument: "Schutz der Privatsphäre des Gesellschafters" },
        ],
        decision: "Vermittelnde h. M.: Erfüllung, soweit zumutbar und nicht in die Privatsphäre eingreifend.",
      },
    ],
    structures: [
      {
        title: "Wichtige Normen nach dem MoPeG (seit 1.1.2024)",
        points: [
          "GbR-Gesellschafterhaftung: § 721 BGB (früher § 128 HGB analog).",
          "OHG-Gesellschafterhaftung: § 126 HGB (früher § 128 HGB).",
          "Nachhaftung ausgeschiedener Gesellschafter: § 728b BGB / § 137 HGB.",
        ],
      },
    ],
    quiz: [
      {
        id: "pg-q1",
        type: "single",
        question: "Nach welcher Norm haften Gesellschafter einer rechtsfähigen GbR seit dem 1.1.2024 persönlich?",
        options: ["§ 128 HGB analog", "§ 721 BGB", "§ 427 BGB", "§ 31 BGB"],
        correct: [1],
        explanation: "Durch das MoPeG wurde die Gesellschafterhaftung in der GbR in § 721 BGB kodifiziert.",
        trap: "Alte Normzitate (§ 128 HGB analog) wirken in der Klausur veraltet!",
      },
    ],
    flashcards: [
      { id: "fc-pg-1", front: "Haftung des eintretenden OHG-Gesellschafters?", back: "Auch für Altverbindlichkeiten, § 127 HGB." },
      { id: "fc-pg-2", front: "Zurechnung deliktischen Handelns eines Gesellschafters zur GbR?", back: "§ 31 BGB analog." },
    ],
  },
];
