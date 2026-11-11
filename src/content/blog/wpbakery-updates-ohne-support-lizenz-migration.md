---
title: 'WPBakery 2026: Updates ohne Support-Lizenz, Probleme lösen und sauber migrieren'
description: 'Mit einer WPBakery-Lifetime-Lizenz gibt es weiterhin alle Updates, aber ohne Support-Abo nur manuell. So spielen Sie Updates sauber ein, betreuen viele Seiten effizient und migrieren langfristig weg von WPBakery.'
date: 2026-11-11
---

Mit einer WPBakery-Lifetime-Lizenz bekommst du weiterhin alle Updates, aber ohne aktives Support-Abo nur noch manuell. Das ist lästig, lässt sich aber in wenigen Minuten sauber erledigen. Und für viele Seiten ist es ein guter Anlass, über einen Umstieg nachzudenken.

In einer aktuellen Diskussion auf Reddit (r/Wordpress) berichtet ein Entwickler, dass er über die Jahre 21 „Lifetime“-Lizenzen gekauft hat und jedes Update nun umständlich per ZIP-Download einspielen muss. Dutzende Kommentare zeigen: Er ist nicht allein. Dieser Artikel fasst zusammen, was sich geändert hat, wie du Updates stressfrei einspielst und wie du WPBakery-Seiten langfristig loswirst.

## Was sich bei den Lizenzen geändert hat

Seit Version 8.1 brauchen automatische Updates im WordPress-Dashboard ein aktives Support-Abo. Die Lizenz selbst bleibt lebenslang gültig, und manuelle Updates sind laut WPBakery für alle Lizenzinhaber dauerhaft kostenlos.

| Leistung | Lifetime-Lizenz ohne Support | Mit aktivem Support („Support Plus“) |
| --- | --- | --- |
| Plugin-Updates | Ja, manuell per ZIP | Ja, automatisch im Dashboard |
| Ticket-Support | Nein | Ja |
| Template-Bibliothek, KI-Funktionen | Nein | Ja |
| Kosten | einmalig | erstes Jahr inklusive, danach jährlich |

**Wichtig:** Lizenzen über CodeCanyon oder als Theme-Bundle (z. B. Salient, Woodmart) werden unterschiedlich behandelt. Bei gebündelten Versionen kommt das Update oft über das Theme selbst. Die aktuellen Preise stehen auf der WPBakery-Preisseite.

Ist das Abzocke? Darüber wird heiß gestritten. Kritiker sagen, eine Lifetime-Lizenz sollte Ein-Klick-Updates einschließen, wie bei fast allen anderen Plugins. Befürworter halten dagegen, dass lebenslange Updates für einen zweistelligen Einmalbetrag ohnehin selten sind und der Update-Server laufende Kosten verursacht. Für die Praxis zählt vor allem: Sicherheitsupdates bekommst du weiterhin, du musst sie nur selbst einspielen.

## Anleitung: WPBakery manuell richtig updaten

Der häufigste Fehler: Die ZIP-Datei wird entpackt und per FTP über den alten Ordner kopiert. Das ist unnötig und riskant. WordPress kann die ZIP-Datei direkt verarbeiten und ersetzt das Plugin dabei sauber.

1. **Backup anlegen.** Datenbank und Dateien sichern, z. B. mit UpdraftPlus oder über das Backup deines Hosters.
2. **ZIP herunterladen.** Im WPBakery-Kundenkonto (bzw. bei CodeCanyon unter „Downloads“) die aktuelle Version laden. Die Datei nicht entpacken.
3. **Plugin hochladen.** Im WordPress-Backend unter *Plugins → Installieren → Plugin hochladen* die ZIP-Datei auswählen und auf *Jetzt installieren* klicken.
4. **„Aktuelle Version durch hochgeladene ersetzen“ bestätigen.** WordPress zeigt alte und neue Versionsnummer an. Ein Klick, fertig.
5. **Seite prüfen.** Startseite, ein paar Unterseiten und den Editor kurz testen, Cache leeren.

Die offizielle Beschreibung findest du in der WPBakery Knowledge Base.

Falls du doch per FTP updaten musst: Den alten Ordner `/wp-content/plugins/js_composer/` vorher komplett löschen (oder umbenennen) und erst dann den neuen hochladen. Wer einfach überschreibt, behält Dateien, die in der neuen Version entfernt wurden. Das kann zu Fehlern führen.

**Kurze Ausfallzeit vermeiden:** Wer die Wartungsseite während des Austauschs nicht live zeigen will, testet das Update zuerst auf einer Staging-Kopie und spielt es danach auf der Live-Seite ein.

## Viele Kundenseiten? So sparst du Zeit

Wer 10, 20 oder mehr WPBakery-Seiten betreut, sollte das Update zentral verteilen statt jede Seite einzeln anzufassen.

- **MainWP oder ManageWP:** ZIP einmal im Plugin-Manager hochladen, Zielseiten auswählen, auf Installieren/Update klicken. Das Plugin landet auf allen Seiten gleichzeitig.
- **WP-CLI:** Mit `wp plugin install js_composer.zip --force` lässt sich das Update per SSH skripten, auch über mehrere Server hinweg.
- **Eigener Update-Server:** Fortgeschrittene legen die ZIP an einer privaten URL ab und lassen ihre Seiten per kleinem Update-Checker-Plugin danach suchen. So erscheint das Update wieder ganz normal im Dashboard.
- **Staging zuerst:** Vor allem bei alten Themes mit gebündeltem WPBakery lohnt sich ein Test auf einer Kopie. Ein erzwungenes Update kann bei veralteten Themes Layouts zerschießen.

**Faustregel:** Sicherheitsupdates zeitnah einspielen. Reine Feature-Updates auf einer Seite, die ohnehin bald neu gebaut wird, kannst du auch auslassen.

## Lohnt sich WPBakery 2026 noch?

Für neue Projekte kaum, für bestehende Seiten oft schon, solange sie laufen. Die meisten WPBakery-Seiten sind heute Altprojekte, bei denen der Builder mit einem Theme mitgeliefert wurde.

| Pro | Contra |
| --- | --- |
| Einmalzahlung, Updates lebenslang | Ein-Klick-Updates nur mit Abo |
| Schnell, wenn man den Builder seit Jahren kennt | Inhalte als Shortcodes gespeichert („Lock-in“) |
| Für einfache Layouts ausreichend | Schwerer Code, oft schlechtere Ladezeiten |
| Mit vielen Kauf-Themes gebündelt | Responsive-Einstellungen nur begrenzt |

Nicht jeder ist unzufrieden: Einige Entwickler arbeiten seit zehn Jahren damit und finden es für ihre Kunden einfach zu pflegen. Die Mehrheit in der Diskussion rät für neue Seiten aber zum Block-Editor (Gutenberg) oder zu modernen Buildern wie Bricks.

## Migration weg von WPBakery

Ein Umstieg bedeutet fast immer, die Seiten neu aufzubauen. WPBakery speichert jede Seite als Shortcodes wie `[vc_row][vc_column]…`. Deaktivierst du das Plugin, siehst du statt deines Layouts nur noch diesen „Shortcode-Salat“.

Die gute Nachricht: Bei Shops kommen Produkt- und Kategorieseiten meist aus Theme-Vorlagen, nicht aus dem Builder. Die eigentliche Arbeit steckt also in Startseite und Landingpages.

### So gehst du vor

1. **Bestandsaufnahme:** Welche Seiten nutzen WPBakery wirklich? Eine Suche nach `vc_row` in der Datenbank zeigt es.
2. **Lokale Kopie oder Staging anlegen,** nie direkt auf der Live-Seite migrieren.
3. **Ziel wählen** (siehe Tabelle unten).
4. **Seiten nachbauen,** wichtigste zuerst. Texte und Bilder bleiben in der Mediathek erhalten.
5. **Reste aufräumen:** Verbliebene Shortcodes entfernen, WPBakery deaktivieren, Weiterleitungen und Ladezeit prüfen.

### Mögliche Ziele

| Ziel | Geeignet für | Hinweis |
| --- | --- | --- |
| Block-Editor (Gutenberg) + Block-Theme | Langfristig schlanke Seiten | Kostenlos, WordPress-Standard, beste Performance |
| Bricks | Agenturen, individuelle Designs | Kostenpflichtig, Lernkurve, sehr leichtgewichtig |
| Elementor | Sanfter Umstieg, wenn das Theme es unterstützt (z. B. Woodmart) | Weit verbreitet, aber selbst nicht schlank |
| Beaver Builder, GeneratePress | Solide Allrounder | Stabil und gut gepflegt |
| Eigenes Theme mit ACF | Kunden, die nur Texte und Bilder tauschen | Kunden können weniger „kaputt machen“ |

**KI als Helfer:** Mehrere Entwickler berichten, dass sie WPBakery-Seiten mit KI-Coding-Assistenten wie Claude in ein Block-Theme überführt haben. Das Prinzip: Seite lokal laufen lassen, die bestehende Seite als Vorlage vorgeben und den Assistenten ein Theme aus Core-Blocks nachbauen lassen. Das spart viel Handarbeit. Das Ergebnis solltest du trotzdem gründlich prüfen, bevor es live geht.

## Fazit

Das manuelle Update ist ärgerlich, aber mit ZIP-Upload im Dashboard eine Sache von zwei Minuten. Wer viele Seiten betreut, automatisiert es mit MainWP oder WP-CLI. Langfristig ist der Umstieg auf den Block-Editor oder einen modernen Builder für die meisten Seiten die bessere Investition. Am besten dann, wenn ohnehin ein Relaunch ansteht.

## Checkliste

- Backup vor jedem Update
- ZIP direkt hochladen, nicht entpacken
- Bei FTP: alten Plugin-Ordner vorher löschen
- Bei vielen Seiten: MainWP, ManageWP oder WP-CLI nutzen
- Sicherheitsupdates zeitnah einspielen
- Migrationsplan für Seiten mit anstehendem Relaunch erstellen

## Quellen

- WPBakery: Preise und Lizenzen
- WPBakery Knowledge Base: Plugin aktualisieren
- WPBakery Knowledge Base: Manuelles Update ohne aktiven Support
- CodeCanyon: Antworten des WPBakery-Teams zu Auto-Updates ab Version 8.1
- Diskussion „Anyone else getting increasingly fed up with WPBakery?“ auf r/Wordpress
