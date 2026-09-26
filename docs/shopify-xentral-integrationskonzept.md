# Shopify ↔ Xentral: Integrationskonzept für einen Lampen- & Leuchten-Shop (DACH)

> **Hinweis zur Gültigkeit:** Menüpfade und Bezeichnungen (v. a. Prozessstarter-Namen in Xentral und
> App-Erstellung in Shopify) ändern sich zwischen Versionen. Vor der Umsetzung gegen die aktuelle
> Xentral-Hilfe (help.xentral.com) und die Shopify-Dev-Doku prüfen. Rechtliche Punkte (Abschnitt 3)
> ersetzen keine Rechtsberatung.

---

## 1. Schnittstellen-Einrichtung (Shopify ↔ Xentral-Konnektor)

### 1.1 Grundprinzip

| Datenfluss | Richtung | Mechanik |
|---|---|---|
| Artikelstammdaten, Preise, Metafelder | Xentral → Shopify | Artikelübertragung (manuell / Prozessstarter) |
| Lagerbestände | Xentral → Shopify | Lagerzahlen-Sync (Prozessstarter, Delta) |
| Aufträge, Kunden, Zahlungsinfo | Shopify → Xentral | Auftragsabholung (Pull per Prozessstarter) |
| Versandstatus + Trackingnummer | Xentral → Shopify | Status-Rückmeldung → Fulfillment in Shopify |
| Stornos / Erstattungen | bidirektional, bewusst definieren | teils manuell, siehe 3.3 |

### 1.2 Schritt 1 – App/Zugang in Shopify anlegen

**Variante A (bevorzugt, falls verfügbar):** Offizielle Xentral-App aus dem Shopify App Store bzw. den
OAuth-Flow aus dem Xentral-Backend nutzen. Scopes werden dann automatisch angefragt – trotzdem
gegen die Liste unten prüfen.

**Variante B: eigene App (Custom App)**
Seit 01.01.2026 lassen sich *neue* Legacy-Custom-Apps nicht mehr direkt im Shopify-Admin anlegen;
neue Apps werden über das **Shopify Dev Dashboard** erstellt und im eigenen Shop installiert
(Client-ID/Client-Secret bzw. Admin-API-Access-Token). Bestehende Custom Apps laufen weiter.

1. Dev Dashboard → *App erstellen* → Name z. B. `Xentral ERP Connector`.
2. Admin-API-Version: aktuelle stabile Version wählen und im Kalender vormerken
   (Shopify-API-Versionen werden ca. 12 Monate unterstützt).
3. Scopes (Minimum für den vollen Kreislauf):

| Scope | Wofür |
|---|---|
| `read_products`, `write_products` | Artikel, Varianten, **Produkt-/Varianten-Metafelder**, Medien |
| `read_inventory`, `write_inventory` | Bestände pro Location setzen |
| `read_locations` | Location-ID des Xentral-Lagers ermitteln |
| `read_orders`, `write_orders` | Aufträge abholen, Tags/Notizen/Status setzen |
| `read_all_orders` | nur nötig, wenn Aufträge älter als 60 Tage (Erstimport/Nachimport) geholt werden (muss bei Shopify beantragt werden) |
| `read_fulfillments`, `write_fulfillments` | Tracking zurückmelden |
| `read_merchant_managed_fulfillment_orders`, `write_merchant_managed_fulfillment_orders` | Fulfillment-Orders (Pflicht bei aktueller Fulfillment-API) |
| `read_customers` | Kundendaten / B2B-Kunden |
| `read_shipping` | Versandarten für das Mapping |
| `read_metaobjects`, `write_metaobjects`, `read_metaobject_definitions`, `write_metaobject_definitions` | nur falls Filter-Werte (z. B. Fassung) als Metaobjekte geführt werden |
| `read_returns` (optional) | Retouren in Xentral nachziehen |
| `read_translations`, `write_translations` (optional) | wenn EN/FR/IT-Texte aus Xentral übertragen werden |

4. App installieren → **Admin-API-Access-Token** (bzw. Client-Credentials) sicher im Passwortmanager
   ablegen; wird nur einmal angezeigt.
5. In Shopify eine **eigene Location** „Xentral Lager“ anlegen (Einstellungen → Standorte) und alle
   Artikel dort mit *Inventar verfolgen* aktivieren. Andere Locations nicht parallel mit Beständen pflegen.

### 1.3 Schritt 2 – Shop-Schnittstelle in Xentral

Pfad (je nach Version): **Administration → Apps → Online-Shops / Shop-Schnittstellen → Neu → Shopify**.

1. **Allgemein:** Bezeichnung, **Projekt** (eigenes Projekt „Shopify-DE“ – steuert Nummernkreise,
   Belegvorlagen, Versandlogik), Shop-URL `xyz.myshopify.com`, Access-Token/Client-Daten, API-Version.
   „Verbindung testen“.
2. **Auftragsimport:**
   - *Aufträge ab Datum / ab Bestellnummer* setzen (verhindert Import historischer Testbestellungen).
   - Nur **bezahlte** bzw. autorisierte Aufträge holen; Vorkasse/Rechnung gesondert behandeln.
   - Zielstatus „freigegeben“ nur für sichere Zahlarten (Shopify Payments, PayPal, Klarna).
   - **Zahlungsweisen-Mapping** (Shopify-Gateway → Xentral-Zahlungsweise).
   - **Versandarten-Mapping** (Shopify-Versandrate → Xentral-Versandart, z. B. DHL Paket, Spedition).
   - Steuer: Brutto-Import, Steuersätze 19 %/7 %/AT 20 %/CH 8,1 % (Drittland!) sauber zuordnen; OSS beachten.
3. **Artikel:** Artikelübertragung aktivieren, Abgleich-Schlüssel = **Artikelnummer ↔ SKU**.
   Festlegen, welche Felder überschrieben werden (Name, Beschreibung, Preise, Bilder, Freifelder).
4. **Lagerzahlen:** Lager/Lagerplätze auswählen, die in die Shopify-Location zählen;
   **Sicherheitsbestand/Pufferbestand** hinterlegen; reservierte Mengen abziehen.
5. **Rückmeldung:** Versandstatus + Trackingnummer an Shopify zurückmelden, *Kunde benachrichtigen*
   (genau **ein** System verschickt die Versandmail – empfehlenswert: Shopify).
6. **Webhooks:** Der Xentral-Shopimporter arbeitet primär per **Pull** (Prozessstarter). Falls eure
   Version Shopify-Webhooks (`orders/create`, `orders/updated`, `orders/cancelled`, `refunds/create`)
   unterstützt, nutzen sie als *Trigger* für einen schnelleren Import – der Cron bleibt als
   Fallback aktiv, weil Webhooks nicht garantiert zugestellt werden.
7. **Prozessstarter** (Administration → Einstellungen → Prozessstarter): die Starter für
   Auftragsabholung, Lagerzahlen, Artikelübertragung und Versand-/Status-Rückmeldung aktivieren.
   Voraussetzung ist der **System-Cronjob** auf dem Xentral-Server (bei Xentral Cloud bereits aktiv),
   der die Prozessstarter jede Minute anstößt.

### 1.4 Best Practices für Synchronisationsintervalle

| Prozess | Intervall | Begründung |
|---|---|---|
| Auftragsimport | **5 min** (ggf. + Webhook-Trigger) | schnelle Auftragsfreigabe, Cut-off für Same-Day-Versand |
| Lagerzahlen (Delta) | **5–15 min** | Überverkauf vermeiden; nur geänderte Artikel übertragen |
| Lagerzahlen (Vollabgleich) | **1× nachts** | korrigiert Drift durch fehlgeschlagene Deltas |
| Tracking/Status-Rückmeldung | **15–30 min** | Versandmail zeitnah, aber gebündelt |
| Artikelstammdaten/Metafelder | **bei Änderung bzw. 1× nachts** | große Payloads, API-Rate-Limit (GraphQL-Kosten) schonen |
| Preise | bei Änderung / nachts | Aktionspreise zeitgesteuert in Xentral pflegen |

Weitere Regeln:
- Prozessstarter **zeitlich versetzen** (z. B. Import :00/:05, Lager :02/:07), damit sie sich nicht blockieren.
- Rate-Limits: Shopify drosselt bei zu vielen Requests (HTTP 429 / GraphQL-Throttling) – große
  Artikelupdates nie tagsüber im Minutentakt.
- Protokoll/Logfile in Xentral täglich prüfen (Fehlerliste „Shopimporter“), Alarm per E-Mail einrichten.

---

## 2. Datenarchitektur & Feld-Mapping

### 2.1 Single Source of Truth

| Datum | Führend | Bemerkung |
|---|---|---|
| Artikelnummer/SKU, EAN/GTIN | **Xentral** | SKU = Xentral-Artikelnummer, niemals in Shopify ändern |
| Name, Kurz-/Langbeschreibung (Basis) | **Xentral** | Übersetzungen ebenfalls in Xentral |
| Technische Attribute (Fassung, K, lm, W, IP …) | **Xentral** (Freifelder) | → Shopify-Metafelder |
| Compliance (EPREL, Datenblatt, GPSR, WEEE-Kat.) | **Xentral** | → Metafelder |
| Einkaufs-/Verkaufspreise, Streichpreise | **Xentral** | Shopify-Preise nie manuell editieren |
| Bestände | **Xentral** | Shopify-Bestand ist nur Spiegel |
| Gewicht, Maße, Versandklasse (Paket/Sperrgut/Spedition) | **Xentral** | steuert Versandart |
| Varianten-Struktur | **Xentral** (Matrixprodukt) | |
| SEO-Titel/-Beschreibung, URL-Handle | **Shopify** | Handle nach Go-Live nicht mehr überschreiben |
| Kollektionen, Navigation, Filter-Konfiguration | **Shopify** | automatisierte Kollektionen auf Metafelder/Tags |
| Theme-Texte, Landingpages, Blog, Raum-/Stimmungsbilder | **Shopify** | |
| Produktbilder | Xentral *oder* Shopify – **eins** festlegen | Empfehlung: Freisteller aus Xentral, Mood-Bilder in Shopify nur, wenn der Import Bilder nicht überschreibt |
| Aufträge, Rechnungen, Gutschriften | Shopify erzeugt, **Xentral** verbucht | Rechnung (mit WEEE-Nr.) aus Xentral |

### 2.2 Lampenspezifische Attribute: Xentral-Freifeld → Shopify-Metafeld

Freifelder in Xentral unter *Administration → Einstellungen → Grundeinstellungen → Freifelder*
benennen (Artikel-Freifelder 1–n). Metafeld-Definitionen in Shopify unter
*Einstellungen → Benutzerdefinierte Daten → Produkte/Varianten* **vor** dem ersten Sync anlegen,
damit die Typen validiert werden und die Felder im Theme/Filter nutzbar sind.

Namespace-Empfehlung: `lamp` für Technik, `compliance` für Rechtliches.

| Xentral-Freifeld | Beispielwert | Shopify-Metafeld | Typ | Ebene | Filter? |
|---|---|---|---|---|---|
| FF1 Fassung/Sockel | `E27` | `lamp.socket` | single_line_text (Auswahlliste: E27, E14, GU10, GU5.3, G9, G4, GX53, R7s, integriert LED) | Produkt/Variante | ✔ |
| FF2 Farbtemperatur (K) | `2700` | `lamp.color_temperature_k` | number_integer | Variante | ✔ (Bereich) |
| FF3 Lichtfarbe | `warmweiß` | `lamp.light_color` | single_line_text (Liste: warmweiß ≤3300 K, neutralweiß 3300–5300 K, tageslichtweiß >5300 K, RGB, Tunable White) | Variante | ✔ |
| FF4 Lichtstrom (lm) | `806` | `lamp.luminous_flux_lm` | number_integer | Variante | ✔ |
| FF5 Leistung (W) | `7.5` | `lamp.power_w` | number_decimal | Variante | |
| FF6 Dimmbar | `ja` | `lamp.dimmable` | boolean | Variante | ✔ |
| FF7 Dimm-Art | `Phasenabschnitt; Casambi` | `lamp.dimming_type` | list.single_line_text | Variante | |
| FF8 Schutzart | `IP44` | `lamp.ip_rating` | single_line_text (Liste IP20, IP44, IP54, IP65, IP67) | Produkt | ✔ |
| FF9 Schutzklasse | `II` | `lamp.protection_class` | single_line_text (I/II/III) | Produkt | |
| FF10 Farbwiedergabe | `90` | `lamp.cri_ra` | number_integer | Variante | |
| FF11 Leuchtmittel inkl. | `nein` | `lamp.bulb_included` | boolean | Variante | ✔ |
| FF12 Leuchtmittel austauschbar | `ja` | `lamp.bulb_replaceable` | boolean | Produkt | |
| FF13 Max. Leistung Fassung | `60` | `lamp.max_wattage_w` | number_integer | Produkt | |
| FF14 Anzahl Flammen | `3` | `lamp.number_of_lights` | number_integer | Produkt | ✔ |
| FF15 Montageart / Raum | `Pendel; Esszimmer` | `lamp.mounting` / `lamp.room` | list.single_line_text | Produkt | ✔ |
| FF16 Material | `Messing` | `lamp.material` | single_line_text | Variante (wenn Variantenoption) | ✔ |
| FF17 Kabellänge / Abhängung (cm) | `150` | `lamp.cable_length_cm` | number_integer | Produkt | |
| FF18 Smart-Home | `Zigbee; Matter` | `lamp.smart_protocol` | list.single_line_text | Variante | ✔ |
| FF20 Energieeffizienzklasse | `F` | `compliance.energy_class` | single_line_text (A–G) | Variante | |
| FF21 EPREL-Registriernummer | `1234567` | `compliance.eprel_id` | single_line_text | Variante | |
| FF22 URL Energielabel | `https://…/label.png` | `compliance.energy_label` | **file_reference** oder url | Variante | |
| FF23 URL Produktdatenblatt | `https://eprel.ec.europa.eu/…` | `compliance.product_fiche` | url | Variante | |
| FF24 Klasse enthaltene Lichtquelle | `E` | `compliance.contained_light_source_class` | single_line_text | Produkt | |
| FF25 WEEE-Kategorie | `5` | `compliance.weee_category` | single_line_text | Produkt | |
| FF26 Hersteller (GPSR) | Name + Anschrift + E-Mail | `compliance.gpsr_manufacturer` | multi_line_text | Produkt | |
| FF27 Verantwortliche Person EU | … | `compliance.gpsr_responsible_person` | multi_line_text | Produkt | |
| FF28 Sicherheitshinweise | `Nur vom Elektrofachmann …` | `compliance.safety_notes` | multi_line_text / rich_text | Produkt | |
| FF29 Anleitung-PDF | URL | `compliance.manual` | url / file_reference | Produkt | |

**Mapping-Regeln, damit es sauber bleibt:**
1. **Werte normalisieren** – in Xentral nur Zahlen ohne Einheit (`2700`, nicht `2.700 K`); Einheit
   rendert das Theme. Dezimaltrenner: Punkt.
2. **Kontrollierte Listen** – Fassung, IP, Lichtfarbe als feste Werteliste (Xentral: Freifeld als
   Auswahl, Shopify: Metafeld-Validierung „Auswahlliste“). Tippfehler zerstören sonst die Filter.
3. **Variantenebene** für alles, was sich je Variante ändert (Material, K, lm, Energieklasse).
4. **Standard-Taxonomie nutzen:** Shopify-Produktkategorie (z. B. *Lighting* bzw. *Leuchtmittel*)
   setzen und, wo passend, die Kategorie-Metafelder (Farbe, Material, Leuchtmitteltyp …) zusätzlich
   befüllen – verbessert Google-Shopping/Marketplaces.
5. **Übertragungsweg:** Unterstützt euer Xentral-Shopimporter das Freifeld→Metafeld-Mapping
   (Einstellungen der Shop-Schnittstelle, Bereich Artikel/Freifelder), dort `Freifeld n` →
   `namespace.key` eintragen. Falls nicht oder nicht für Varianten: kleine Middleware
   (Xentral-API lesen → Shopify GraphQL `metafieldsSet`, max. 25 Metafelder pro Call) per nächtlichem Job.
6. **Shopify-Filter** (App *Search & Discovery*) auf die Metafelder mit ✔ anlegen.

### 2.3 Varianten-Handling

**Xentral:** Modul **Matrixprodukt** – ein Hauptartikel (Vater) mit Gruppen (= Optionen) und
Optionen (= Werte); jede Kombination ist ein eigener Artikel mit eigener Artikelnummer, EAN,
Bestand, Gewicht und eigenen Freifeldern.

**Shopify:** ein Produkt mit Optionen (max. 3 Optionen, bis zu 2.048 Varianten).

| Xentral | Shopify |
|---|---|
| Vaterartikel `PL-ORBIT` (kein Lagerartikel) | Produkt „Pendelleuchte Orbit“ |
| Matrix-Gruppe „Material“ | Option 1 „Material“ |
| Matrix-Gruppe „Schirmgröße“ | Option 2 „Schirmdurchmesser“ |
| Kindartikel `PL-ORBIT-MS-40` | Variante „Messing / 40 cm“, SKU `PL-ORBIT-MS-40` |
| Kindartikel `PL-ORBIT-SM-60` | Variante „Schwarz matt / 60 cm“, SKU `PL-ORBIT-SM-60` |

Regeln:
- **SKU-Schema** sprechend und stabil: `<Modell>-<Material>-<Größe>` – nie nachträglich umnummerieren.
- **Gruppen- und Optionsnamen identisch** in Xentral und Shopify (inkl. Reihenfolge und Schreibweise),
  sonst entstehen Dubletten-Optionen.
- **Max. 3 Dimensionen.** Alles Weitere (z. B. Baldachin-Farbe, Kabellänge) als eigene Produkte,
  als Zubehör (Cross-Selling) oder über Stücklisten/Sets in Xentral lösen.
- **Unterschiedliche Technik pro Variante** (z. B. 60-cm-Version mit 2.000 lm) → Varianten-Metafelder.
- **Energielabel pro Variante**, wenn die Varianten unterschiedliche Lichtquellen/EPREL-Nummern haben.
- **Swatch-Bilder:** Material-Option in Shopify mit Farbfeld/Metaobjekt verknüpfen (optional).
- **Leuchtmittel als Bundle:** Leuchte + passendes Leuchtmittel als Xentral-Stückliste/Set; Bestand
  ergibt sich aus Komponenten, in Shopify als eigene Variante oder eigenes Produkt.

---

## 3. Compliance & Logistik (DACH)

### 3.1 Energieeffizienzlabel & Produktdatenblatt

Rechtsrahmen: Energieverbrauchskennzeichnung **VO (EU) 2019/2015** (Lichtquellen) und
Ökodesign **VO (EU) 2019/2020**; Label-Skala A–G seit 01.09.2021.

Wichtige Unterscheidung für euer Sortiment:
- **Lichtquellen** (Leuchtmittel, aber auch Leuchten mit fest verbautem, nicht abtrennbarem LED-Modul,
  die als Lichtquelle gelten) → **Energielabel + Produktdatenblatt Pflicht** im Onlineshop.
- **Leuchten** („enthaltende Produkte“) mit austauschbarem Leuchtmittel → **kein eigenes Label**;
  wird eine Lichtquelle mitgeliefert, muss deren Energieklasse in der Dokumentation/Produktinfo angegeben werden.

Anzeigepflichten im Fernabsatz (VO (EU) 2019/2015 i. V. m. 2017/1369):
- Pfeil mit Effizienzklasse (Farbe + Buchstabe, Skala A–G) **in der Nähe des Preises**
  (auch in Kategorie-/Suchlisten), per Klick/Hover/Zoom **Anzeige des vollständigen Labels**.
- Link zum **Produktdatenblatt** (i. d. R. aus der EPREL-Datenbank).
- Pflicht auch in Werbung/Google Shopping (dort Energieklasse-Attribute pflegen).

Umsetzung im Datenfluss:
1. Hersteller liefert EPREL-Registriernummer → Xentral FF21.
2. Label-PNG/-PDF und Datenblatt-URL aus EPREL (öffentliche Seite `https://eprel.ec.europa.eu/qr/<ID>`)
   in FF22/FF23; alternativ Label-Datei im Xentral-Dateimanager.
3. Übertragung als Metafelder. Label bevorzugt als **Datei in Shopify hochladen** (`file_reference`),
   damit es nicht von einem externen Server abhängt.
4. Theme: Snippet `energy-label.liquid`, das bei gefülltem `compliance.energy_class` den farbigen
   Pfeil neben Preis und Produktkarten rendert und Label/Datenblatt in einem Modal öffnet.
5. Prüf-Regel in Xentral: Artikel mit Artikelkategorie „Leuchtmittel“ ohne EPREL-Nr. dürfen nicht
   online gestellt werden (Pflichtfeld/Report).

### 3.2 ElektroG / WEEE, Batterien, Verpackung, GPSR

| Thema | Xentral | Shopify |
|---|---|---|
| **WEEE-Reg.-Nr. (stiftung ear)** eigene Nummer als Hersteller/Importeur | Firmendaten → Briefkopf/Belegvorlagen (Rechnung, Lieferschein, Angebot) | Impressum, Footer, Rechtstexte-Seite |
| Artikelbezug (Gerätekategorie, Marke, Hersteller-WEEE-Nr.) | Freifelder FF25 + Hersteller-Stammdaten; Report für ear-Mengenmeldungen | optional Metafeld (nur Info) |
| **Rücknahmepflicht/Informationspflicht** Vertreiber (§ 17/18 ElektroG) | – | Seite „Altgeräte-Rücknahme“, Hinweis im Checkout/Bestellbestätigung; bei ≥ 400 m² Lager-/Versandfläche kostenlose Rücknahme anbieten |
| **Durchgestrichene-Mülltonne-Hinweis** | Hinweis auf Rechnung/Lieferschein | Produktseite/Rechtstexte |
| **Batterien** (Akku-/Solarleuchten; BattG → EU-BattVO 2023/1542) | Kennzeichen „enthält Batterie“ | Hinweisseite, Registrierung |
| **Verpackung** (VerpackG, LUCID-Nr.) | Firmendaten | Impressum optional |
| **GPSR** (VO (EU) 2023/988) – Hersteller, EU-Verantwortlicher, Sicherheitshinweise | FF26–28 | Metafelder auf Produktseite anzeigen – **Pflicht im Onlinehandel** |
| **Österreich** (EAG-VO, EAG-Registrierung/Bevollmächtigter) | eigenes Projekt/Belegvorlage AT | Rechtstexte je Markt |
| **Schweiz** (VREG, vorgezogene Recyclinggebühr vRG über SENS/SLRS) | vRG als eigene Position/Artikel | Preisausweis inkl. vRG, Markt CH |

Wer Leuchten aus Nicht-EU-Ländern importiert oder unter eigener Marke vertreibt, ist selbst
**Hersteller** i. S. d. ElektroG und braucht vor dem ersten Verkauf die ear-Registrierung
(Lampen: Kategorie 3, Leuchten i. d. R. Kategorie 5 bzw. 4 bei Großgeräten).
Plattformen/Fulfillment-Dienstleister prüfen die Nummer.

### 3.3 Versand-Workflow: Bestellung → Kommissionierung → Tracking

```
Shopify                         Xentral                                   Versanddienstleister
───────                         ───────                                   ────────────────────
Bestellung bezahlt ──(Import 5 min)──► Auftrag (Projekt Shopify-DE)
                                     │ Auto-Versand-Prüfung: Zahlung ok,
                                     │ Adresse ok, Ware verfügbar
                                     ▼
                                   Autoversand → Lieferschein + Rechnung
                                     │ (Rechnung mit WEEE-Nr.)
                                     ▼
                                   Kommissionierliste / Pickliste
                                   (Batch-Picking; Glas & Schirme gesondert)
                                     ▼
                                   Versandzentrum: Scan, Gewicht,
                                   Paketmarke erzeugen ─────────────────────► DHL/DPD/GLS/Spedition
                                     │  ◄──────────── Trackingnummer ─────────┘
                                     ▼
                                   Versand abgeschlossen
Fulfillment + Tracking ◄──(Rückmeldung 15 min)──┘
Versandmail an Kunde (Shopify)
```

Konfigurationspunkte:
1. **Auftragsfreigabe:** Autoversand nur bei Zahlstatus „bezahlt“; Vorkasse erst nach
   Zahlungseingang (Kontoabgleich in Xentral).
2. **Versandarten-Mapping** abhängig von Versandklasse: Stehleuchten/große Pendelleuchten als
   Sperrgut oder Spedition; in Shopify eigene Versandprofile je Versandklasse.
3. **Verpackung:** Bruchgefahr – Pack-Hinweise im Artikel (Xentral „Interner Hinweis“/Packhinweis),
   ggf. Versicherung/Premiumversand für Glas.
4. **Teillieferungen:** Xentral erzeugt pro Paket einen Versand; jede Trackingnummer wird als eigenes
   Fulfillment mit den gelieferten Positionen zurückgemeldet (Shopify-Fulfillment-Orders).
5. **Mehrere Pakete pro Auftrag:** mehrere Trackingnummern → Rückmeldung prüfen (alle übertragen?).
6. **Benachrichtigung:** Shopify-Versandbestätigung aktiv, Xentral-Versandmail für dieses Projekt aus.
7. **Storno:** Storno in Shopify vor Versand → Webhook/Import-Status → Xentral-Auftrag stornieren;
   nach Versand → Retoure über Xentral-Retourenmodul, Gutschrift, Erstattung in Shopify (Zahlungsanbieter).
   Genau festlegen, **wo** erstattet wird (empfohlen: Shopify, Gutschrift-Beleg in Xentral).
8. **Monitoring:** täglicher Report „Aufträge älter als 24 h ohne Versand“ und „Versand ohne Rückmeldung“.

---

## 4. Sofortiger Aktionsplan – die 5 wichtigsten Einstellungen vor dem ersten Testabgleich

- [ ] **1. Shopify-Zugang & Location:** App (Xentral-App oder Dev-Dashboard-App) mit allen Scopes aus
      1.2 installieren, Token sicher ablegen; Location „Xentral Lager“ anlegen, *Inventar verfolgen*
      aktiv, andere Locations ohne Bestand. Shopify-Zahlungen im **Testmodus**.
- [ ] **2. Artikel-Schlüssel & Testdaten:** 3–5 Testartikel in Xentral inkl. **einem Matrixprodukt**
      (Material × Schirmgröße) – Artikelnummer = SKU, EAN, Gewicht, Preis, Lagerbestand, Freifelder
      befüllt. In Shopify vorher die **Metafeld-Definitionen** (Namespace `lamp`/`compliance`) anlegen.
- [ ] **3. Xentral-Shop-Schnittstelle:** eigenes Projekt, Zugangsdaten + „Verbindung testen“,
      **Aufträge ab Datum = heute**, Zahlungsweisen-, Versandarten- und Steuer-Mapping, Lager für
      Bestandsübertragung, Freifeld→Metafeld-Mapping.
- [ ] **4. Prozessstarter vorbereiten, aber noch nicht automatisch laufen lassen:** Starter für
      Import, Lagerzahlen, Artikel, Rückmeldung anlegen (inaktiv), System-Cron prüfen. Erster Durchlauf
      **manuell**: Artikel übertragen → in Shopify kontrollieren (Varianten, Metafelder, Bestand).
- [ ] **5. End-to-End-Testbestellung:** Testbestellung in Shopify (Bogus Gateway/Testmodus) →
      manueller Import → Auftrag/Rechnung (WEEE-Nr. auf Beleg?) → Lieferschein → Testlabel →
      Trackingrückmeldung → Versandmail in Shopify + Bestand korrekt reduziert. Erst danach
      Intervalle aus 1.4 aktivieren und Protokoll-Alarm einrichten.
