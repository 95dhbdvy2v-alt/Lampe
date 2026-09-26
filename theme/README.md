# LUMEN – Theme-Erweiterung für Premium-Leuchten (Shopify Dawn / Online Store 2.0)

Getestet gegen **Dawn 16.0**: Alle Einstellungen in den JSON-Templates wurden gegen die Dawn-Schemas geprüft,
und Shopify Theme Check meldet keine Fehler. Die Metafelder (`lamp.*`, `compliance.*`) entsprechen dem
Mapping aus [`docs/shopify-xentral-integrationskonzept.md`](../docs/shopify-xentral-integrationskonzept.md).

```
theme/
├── assets/
│   ├── lumen-theme.css            Design-Tokens + Styles für Energielabel, Specs, Akkordeons
│   └── lamp-product.js            Energielabel-Dialog + Aktualisierung beim Variantenwechsel
├── sections/
│   ├── lx-usp-bar.liquid          Trust-/USP-Leiste
│   ├── lx-shop-the-look.liquid    Raumbild mit Hotspots
│   └── lx-light-advisor.liquid    Lichtberater / Buying Guide inkl. Lumen-Rechner
├── snippets/
│   ├── lamp-energy-label.liquid   EU-Energielabel (Pfeil A–G, Label-Dialog, Datenblatt-Link)
│   ├── lamp-tech-specs.liquid     „Auf einen Blick“-Kacheln (K, lm, Fassung, Dimmbar, IP …)
│   └── lamp-accordions.liquid     Technische Details · Leuchtmittel & Montage · Versand · GPSR
└── templates/
    ├── index.json                 Startseite
    ├── product.json               Produktseite
    └── page.lichtberater.json     eigene Lichtberater-Seite
```

---

## 1. Design-DNA

### Farbwelt

| Rolle | Name | Hex | Einsatz |
|---|---|---|---|
| Hintergrund | Warm White | `#FAF7F2` | Seitenhintergrund, helle Flächen |
| Hintergrund 2 | Linen | `#F1EBE1` | Wechselnde Sektionen, Karten |
| Linie | Stone | `#E4DCCF` | Rahmen, Trenner |
| Text | Anthracite | `#1F1D1B` | Fließtext, Primärbutton |
| Text sekundär | Graphite | `#5E5A55` | Metadaten, Hinweise |
| Dunkel | Night | `#141312` | Hero-Overlay, dunkle Sektionen, Footer |
| Akzent hell | Champagne | `#D9C3A0` | Buttons auf Dunkel, Flächen |
| Akzent | Brass | `#B08D57` | Icons, Hotspots, Linien (nicht für Fließtext) |
| Akzent Text | Brass Dark | `#8A6A3B` | Links und Akzenttext (Kontrast ≥ 4,5 : 1 auf Warm White) |
| Licht | Glow | `#FFE3B3` | Lichtschein-Effekte |
| Signal | Terracotta | `#A4533A` | Sale, Hinweise |

### Typografie

| Einsatz | Schrift | Schnitt | Bezug |
|---|---|---|---|
| Überschriften | **Cormorant Garamond** | 500 / 600 | selbst gehostet (woff2 unter Assets), DSGVO-konform |
| Alternative ohne Upload | **Playfair Display** | 400 | Shopify-Schriftbibliothek |
| Fließtext, UI, Buttons | **Jost** | 300 / 400 / 500 | Shopify-Schriftbibliothek |

Empfohlene Werte in *Theme-Einstellungen → Typografie*: Überschriften-Skalierung 110–120 %,
Text-Skalierung 100 %. Buttons verwenden Versalien mit 0,12 em Laufweite (in `lumen-theme.css` gesetzt).

### Farbschemata in Dawn (*Theme-Einstellungen → Farben*)

| Schema | Hintergrund | Text | Button | Button-Beschriftung | Sekundärbutton | Schatten | Einsatz |
|---|---|---|---|---|---|---|---|
| scheme-1 | `#FAF7F2` | `#1F1D1B` | `#1F1D1B` | `#FAF7F2` | `#1F1D1B` | `#1F1D1B` | Standard |
| scheme-2 | `#F1EBE1` | `#1F1D1B` | `#1F1D1B` | `#F1EBE1` | `#1F1D1B` | `#1F1D1B` | USP, Bestseller |
| scheme-3 | `#141312` | `#F4EEE4` | `#D9C3A0` | `#141312` | `#F4EEE4` | `#000000` | Hero, Footer |
| scheme-4 | `#D9C3A0` | `#1F1D1B` | `#1F1D1B` | `#D9C3A0` | `#1F1D1B` | `#1F1D1B` | Aktionen |
| scheme-5 | `#1F1D1B` | `#FAF7F2` | `#B08D57` | `#141312` | `#FAF7F2` | `#000000` | Newsletter, Kontrast |

Alternativ in `config/settings_data.json` unter `current → color_schemes` einsetzen
(vorher sichern):

```json
"color_schemes": {
  "scheme-1": { "settings": { "background": "#FAF7F2", "background_gradient": "", "text": "#1F1D1B", "button": "#1F1D1B", "button_label": "#FAF7F2", "secondary_button_label": "#1F1D1B", "shadow": "#1F1D1B" } },
  "scheme-2": { "settings": { "background": "#F1EBE1", "background_gradient": "", "text": "#1F1D1B", "button": "#1F1D1B", "button_label": "#F1EBE1", "secondary_button_label": "#1F1D1B", "shadow": "#1F1D1B" } },
  "scheme-3": { "settings": { "background": "#141312", "background_gradient": "", "text": "#F4EEE4", "button": "#D9C3A0", "button_label": "#141312", "secondary_button_label": "#F4EEE4", "shadow": "#000000" } },
  "scheme-4": { "settings": { "background": "#D9C3A0", "background_gradient": "", "text": "#1F1D1B", "button": "#1F1D1B", "button_label": "#D9C3A0", "secondary_button_label": "#1F1D1B", "shadow": "#1F1D1B" } },
  "scheme-5": { "settings": { "background": "#1F1D1B", "background_gradient": "", "text": "#FAF7F2", "button": "#B08D57", "button_label": "#141312", "secondary_button_label": "#FAF7F2", "shadow": "#000000" } }
}
```

Weitere globale Einstellungen: Button-Eckenradius 0 px, Rahmen 1 px; Produktkarten im Stil „Standard“ ohne Rahmen;
Bild-Seitenverhältnis „Hochformat“.

---

## 2. Installation (Shopify-Admin → *Onlineshop → Themes*)

> **Zuerst sichern:** Beim aktiven Theme auf **⋯ → Duplizieren** klicken und alle Schritte an der Kopie
> vornehmen. Erst nach der Kontrolle in der Vorschau veröffentlichen.

Danach bei der Kopie auf **⋯ → Code bearbeiten** klicken.

### Schritt 1 – Assets anlegen
Ordner **assets** → *Neues Asset hinzufügen* → *Leere Datei erstellen*:

| Dateiname | Inhalt |
|---|---|
| `lumen-theme` (Typ `.css`) | `assets/lumen-theme.css` |
| `lamp-product` (Typ `.js`) | `assets/lamp-product.js` |

Optional die Schriftdateien `cormorant-garamond-500.woff2` und `cormorant-garamond-600.woff2` hochladen
(z. B. über google-webfonts-helper erzeugt). Ohne Upload greift die im Theme gewählte Überschriften-Schrift.
Wer Playfair Display aus der Shopify-Bibliothek nutzt, löscht die beiden `@font-face`-Blöcke oben in
`lumen-theme.css`.

### Schritt 2 – Einbinden in `layout/theme.liquid`
Direkt **vor** `</head>` einfügen, also nach `base.css` und `pubsub.js`:

```liquid
{{ 'lumen-theme.css' | asset_url | stylesheet_tag }}
<script src="{{ 'lamp-product.js' | asset_url }}" defer="defer"></script>
```

### Schritt 3 – Snippets anlegen
Ordner **snippets** → *Neues Snippet hinzufügen*:
`lamp-energy-label`, `lamp-tech-specs`, `lamp-accordions` → jeweils den Inhalt der gleichnamigen Datei einfügen.

### Schritt 4 – Sections anlegen
Ordner **sections** → *Neue Section hinzufügen* (Typ Liquid):
`lx-usp-bar`, `lx-shop-the-look`, `lx-light-advisor` → den vorausgefüllten Standardinhalt komplett durch die
gleichnamigen Dateien ersetzen.

### Schritt 5 – Templates
1. `templates/index.json` öffnen, den gesamten Inhalt durch `templates/index.json` aus diesem Ordner ersetzen
   und speichern. Die bisherigen Startseiten-Sections werden dabei ersetzt.
2. `templates/product.json` genauso ersetzen.
3. Ordner **templates** → *Neue Vorlage hinzufügen* → Typ `page`, JSON, Name `lichtberater` → Inhalt aus
   `templates/page.lichtberater.json` einfügen.

### Schritt 6 – Energielabel auf Produktkarten (Pflicht in Kategorie- und Suchlisten)
`snippets/card-product.liquid` öffnen, die **erste** Zeile
`{% render 'price', product: card_product, price_class: '', show_compare_at_price: true %}` suchen
(in Dawn 16 etwa Zeile 209) und direkt darunter einfügen:

```liquid
{% render 'lamp-energy-label', product: card_product, compact: true %}
```

### Schritt 7 – Inhalte im Admin verbinden
| Was | Wo | Wert |
|---|---|---|
| Kollektionen | *Produkte → Kollektionen* | Handles `pendelleuchten`, `stehleuchten`, `smart-lighting`, `bestseller`, `leuchtmittel` |
| Lichtberater-Seite | *Onlineshop → Seiten → Seite hinzufügen* | Titel „Lichtberater“, Vorlage `page.lichtberater`, Handle `lichtberater` |
| Versandtexte (optional) | Seite mit Handle `versand-bruchsicherheit` | Inhalt ersetzt den Standardtext im Akkordeon |
| Altgeräte-Rücknahme | Seite mit Handle `altgeraete-ruecknahme` | Pflichtinformationen nach ElektroG |
| Metafeld-Definitionen | *Einstellungen → Benutzerdefinierte Daten* | Namespaces `lamp` / `compliance` wie im Integrationskonzept |
| Menü | *Onlineshop → Navigation* | Link „Lichtberater“ auf `/pages/lichtberater` |

### Schritt 8 – Theme-Editor (*Anpassen*)
- **Startseite:** Hero-Bild hochladen (mind. 2400 px breit, eingeschaltete Leuchten in der Abenddämmerung).
  Bei *Shop the Look* das Raumbild und je Hotspot das Produkt wählen, dann X/Y so verschieben, dass der Punkt auf der Leuchte sitzt.
- **Produktseite:** Bei Bedarf die Reihenfolge der Blöcke ändern; Energielabel, technische Daten und Akkordeons sind *Benutzerdefiniertes Liquid*.
- **Produktbilder:** Bild 1 als Freisteller, Bild 2 als Leuchte **eingeschaltet** in Szene.
  Die Einstellung *Zweites Bild beim Hover* zeigt dann auf Karten die Lichtwirkung.

### Alternative: Shopify CLI
```bash
shopify theme pull --store <dein-shop>.myshopify.com          # Dawn-Kopie lokal holen
cp -r theme/{assets,sections,snippets,templates} <theme-ordner>/
# Schritt 2 + 6 (theme.liquid, card-product.liquid) lokal ergänzen
shopify theme push --unpublished                               # als neues, unveröffentlichtes Theme hochladen
```

---

## 3. Funktionsweise und Hinweise

- **Variantenwechsel:** Dawn 12+ lädt beim Variantenwechsel das Section-HTML neu und meldet das per
  `PUB_SUB_EVENTS.variantChange`. `lamp-product.js` tauscht daraufhin alle Elemente mit `[data-lamp-swap]` aus
  (Energielabel, technische Daten, Akkordeons). Geöffnete Akkordeons bleiben dabei offen.
- **Energielabel:** Der Pfeil erscheint nur bei gültiger Klasse A–G. Ein Klick öffnet das Label als Dialog;
  PDF-Labels öffnen sich in einem neuen Tab. Ohne Datenblatt-URL wird `https://eprel.ec.europa.eu/qr/<EPREL-ID>` verlinkt.
  Bei Leuchten ohne eigenes Label erscheint stattdessen der Hinweis zur Klasse der enthaltenen Lichtquelle.
- **Barrierefreiheit:** Native `<details>`/`<dialog>`, Tastaturbedienung, `aria-pressed`/`aria-expanded`,
  sichtbare Fokusrahmen, `prefers-reduced-motion` wird berücksichtigt.
- **Leistung:** Keine externen Bibliotheken; Bilder responsiv über `image_url` + `image_tag` mit `widths`/`sizes` und Lazy-Loading.
- **Rechtstexte:** Die Standardtexte (Versand, Montage, Altgeräte) sind Vorlagen. Bitte mit euren Rechtstexten abgleichen.
