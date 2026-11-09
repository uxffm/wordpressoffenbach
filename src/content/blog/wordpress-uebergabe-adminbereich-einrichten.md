---
title: 'WordPress-Übergabe ohne Chaos: So richten wir den Adminbereich für unsere Kunden ein'
description: 'Vor jeder Website-Übergabe räumen wir das WordPress-Dashboard auf: Benutzerrollen, Admin-Menü, Block-Editor, Mediathek und Dokumentation. So pflegen Sie Ihre Inhalte selbstständig, ohne etwas kaputtzumachen.'
date: 2026-11-09
---

Ob die Zusammenarbeit nach dem Launch einer WordPress-Website entspannt läuft, entscheidet sich selten im Frontend, sondern im Backend. Deshalb räumen wir vor jeder Website-Übergabe das WordPress-Dashboard gezielt auf: Benutzerrollen, Admin-Menü, Block-Editor, Mediathek und Dokumentation werden so eingerichtet, dass Sie Ihre Inhalte selbstständig pflegen können, ohne versehentlich etwas kaputtzumachen.

In diesem Artikel zeigen wir, welche Schritte zu unserem Übergabe-Prozess gehören, warum wir sie machen und welchen Nutzen Sie als Website-Betreiber davon haben. Für Entwickler und technisch Interessierte gibt es an einigen Stellen kurze Code-Beispiele.

## 1. Benutzerrollen und Berechtigungen: die eigentliche Schutzschicht

Der wichtigste Schritt passiert unsichtbar: Wir legen fest, wer im WordPress-Backend was darf. WordPress steuert Zugriffsrechte über Benutzerrollen (Administrator, Redakteur, Autor, Shop-Manager) und die dahinterliegenden Berechtigungen, sogenannte Capabilities.

Wichtig zu wissen: Einen Menüpunkt auszublenden ist noch keine Sicherheitsmaßnahme. Wer die URL einer Admin-Seite kennt, kann sie trotzdem direkt aufrufen, solange die Rolle die nötige Berechtigung hat. Deshalb entfernen wir kritische Capabilities wirklich und nutzen das Aufräumen des Menüs nur für die Benutzerfreundlichkeit.

So gehen wir typischerweise vor:

- **Eigene Kundenrolle statt Standard-Administrator:** Eine Rolle, die fast alles kann wie ein Admin, aber keine Plugins installieren oder bearbeiten, keine Theme-Dateien ändern und keine Benutzer verwalten darf.
- **Datei-Editor deaktivieren:** Mit `DISALLOW_FILE_EDIT` in der `wp-config.php` verschwindet der Theme- und Plugin-Editor komplett. Ein falsch eingefügter Code-Schnipsel kann so nicht mehr die ganze Seite lahmlegen.
- **Getrennte Konten für Alltag und Technik:** Auf Wunsch richten wir ein Redakteurs-Konto für die tägliche Content-Pflege und ein separates Administrator-Konto für strukturelle Änderungen ein. Ein anderes Admin-Farbschema macht sofort sichtbar, in welchem Modus Sie gerade arbeiten.
- **Entwickler sehen Standard-WordPress:** Alle Anpassungen gelten nur für Kundenrollen. Wer später technisch an der Seite arbeitet, findet ein vertrautes, unverändertes Backend vor.

## 2. Admin-Menü aufräumen und in Ihre Sprache übersetzen

Eine frische WordPress-Installation zeigt in der Seitenleiste Dutzende Menüpunkte: Werkzeuge, Einstellungen, Plugin-Seiten, Kommentare. Für die tägliche Arbeit brauchen Sie davon meist nur wenige. Jeder überflüssige Menüpunkt ist eine Gelegenheit, sich zu verklicken.

Wir passen die Admin-Navigation deshalb pro Benutzerrolle an:

- **Ausblenden, was Sie nicht brauchen:** Werkzeuge, technische Einstellungen und Plugin-Konfigurationen verschwinden für Redakteure.
- **Wichtiges nach oben:** Seiten, Blog, Produkte oder Veranstaltungen stehen dort, wo Sie sie zuerst suchen.
- **Verständliche Bezeichnungen:** Aus „Beiträge“ wird zum Beispiel „Blog“ oder „News“. Solche Umbenennungen binden wir immer an die Kundenrolle, damit Entwickler weiterhin die Standardbegriffe sehen.

Ein vereinfachtes Beispiel, wie Menüpunkte für Nicht-Administratoren ausgeblendet werden:

```php
add_action('admin_menu', function () {
    if (current_user_can('manage_options')) return; // Admins behalten alles
    remove_menu_page('tools.php');         // Werkzeuge
    remove_menu_page('edit-comments.php'); // Kommentare
}, 999);
```

## 3. Ein Dashboard, das wirklich hilft

Nach dem Login landen Sie auf dem WordPress-Dashboard. Standardmäßig zeigt es WordPress-News, Veranstaltungen, einen Schnellentwurf und Aktivitätsprotokolle, für die meisten Website-Betreiber vor allem Rauschen.

Wir entfernen diese Standard-Widgets und ersetzen sie durch ein eigenes Willkommens-Widget mit:

- Ihrem direkten Ansprechpartner und dem Weg zum Support, idealerweise ein Kontaktformular, das direkt in unser Ticketsystem läuft. So geht keine Anfrage im Posteingang verloren.
- Einer Anleitung „So bearbeiten Sie Ihre Website“ mit Links zu den häufigsten Aufgaben: Text auf einer Seite ändern, ein Bild austauschen, einen Blogbeitrag veröffentlichen.
- Kurzen Erklärvideos statt reiner Screenshots. Sie sehen einmal, wie es geht, und können es jederzeit nachschauen.

Der Grund ist einfach: Ein großer Teil der Support-Anfragen nach einem Launch lautet „Wo war nochmal der Button?“. Wenn die Hilfe genau dort steht, wo Sie sich ohnehin einloggen, lösen sich viele Fragen von selbst.

```php
add_action('wp_dashboard_setup', function () {
    remove_meta_box('dashboard_primary', 'dashboard', 'side');     // WordPress-News
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side'); // Schnellentwurf
    wp_add_dashboard_widget('kunden_hilfe', 'So bearbeiten Sie Ihre Website', function () {
        echo '<p>Anleitungen und Kontakt zu Ihrem Ansprechpartner</p>';
    });
});
```

## 4. Den Block-Editor absichern, damit das Layout hält

Ein aufgeräumtes Menü bringt Sie zur richtigen Seite. Damit Sie dort nur einen Absatz ändern und nicht versehentlich das ganze Seitenlayout zerlegen, richten wir den Gutenberg-Block-Editor gezielt ein:

- **Erlaubte Blöcke begrenzen:** Über den Filter `allowed_block_types_all` stehen nur die Blöcke zur Auswahl, die Sie wirklich brauchen, etwa Absatz, Überschrift, Bild und unsere eigenen Vorlagen.
- **Layouts sperren:** Mit Template-Locking und dem Modus `contentOnly` können Sie Texte und Bilder bearbeiten, die Struktur der Seite bleibt aber geschützt.
- **Design-Vorgaben über `theme.json`:** Wir deaktivieren freie Farbwähler, beliebige Schriftgrößen und Verläufe. So bleibt jede Seite im Corporate Design, ohne dass Sie darauf achten müssen.
- **Wiederverwendbare Block-Vorlagen (Patterns):** Für typische Abschnitte wie Testimonials, Teammitglieder oder Call-to-Action-Bereiche bekommen Sie fertige Bausteine.

Bei den Patterns unterscheiden wir bewusst: Nicht synchronisierte Vorlagen sind Bausteine, die Sie einfügen und individuell befüllen. Synchronisierte Vorlagen eignen sich für Elemente, die überall gleich sein sollen, etwa ein Kontaktbanner: einmal ändern, überall aktualisiert.

Das Ziel ist, dass Sie die Einschränkungen kaum bemerken. Sie bearbeiten Inhalte, und das Design bleibt einfach stabil.

## 5. Die Mediathek ordnen, bevor sie überläuft

Die WordPress-Mediathek kennt von Haus aus keine echten Ordner. Bilder, PDFs und Videos landen in einer langen Liste, sortiert nach Upload-Datum. Ab einigen hundert Dateien findet man dort kaum noch etwas wieder, und aufgeräumt wird erfahrungsgemäß nie.

Deshalb legen wir die Struktur an, bevor Sie die erste Datei hochladen:

- **Aussagekräftige Dateinamen:** `startseite-hero.jpg` statt `IMG_4821.jpg`. Die Suche der Mediathek durchsucht Titel, Dateinamen und Alternativtexte, gute Namen sind also der Schlüssel zur Auffindbarkeit.
- **Alt-Texte pflegen:** Sie helfen bei der Suche im Backend, verbessern die Barrierefreiheit und sind ein Pluspunkt für die Suchmaschinenoptimierung (SEO) Ihrer Bilder.
- **Ordnerstruktur in der Mediathek:** Mit einem schlanken Ordner-Plugin richten wir Ordner per Drag-and-drop ein, zum Beispiel nach Seiten, Projekten oder Produktkategorien. Ist die Struktur vorbereitet, landen neue Dateien automatisch am richtigen Ort.
- **Upload-Ordner nach Monat und Jahr:** Diese Einstellung unter Einstellungen › Medien hilft nicht beim Suchen, verhindert aber, dass auf dem Server ein einziger Ordner mit zehntausenden Dateien entsteht, was Backups und manche Hosting-Umgebungen ausbremst.
- **Bilder vor dem Upload optimieren:** Richtig skalierte und komprimierte Bilder halten die Ladezeit niedrig.

Gut zu wissen: Viele Ordner-Plugins speichern die Ordner nur als Zuordnung in der Datenbank. Die Bild-URLs ändern sich dadurch nicht, die Struktur hängt aber am Plugin. Wir achten deshalb auf Exportmöglichkeiten, damit eine spätere Migration nichts durcheinanderbringt.

## 6. Feinschliff: Branding und übersichtliche Listen

Kleine Details sorgen dafür, dass sich die Übergabe fertig anfühlt und nicht nach einer Standardinstallation aussieht:

- **Gebrandete Login-Seite:** Ihr Logo und Ihre Markenfarben auf der WordPress-Anmeldeseite statt des WordPress-Logos.
- **Dezentes Admin-Branding:** Ein passendes Farbschema im Backend, ohne die gewohnte Bedienung zu verändern.
- **Zusätzliche Spalten in Beitrags- und Seitenlisten:** Eine Spalte mit dem Beitragsbild und dem Autor macht die Übersicht deutlich schneller erfassbar.
- **Sinnvolle Weiterleitung nach dem Login:** Redakteure landen direkt dort, wo sie am häufigsten arbeiten, zum Beispiel in der Beitragsliste.

## 7. Saubere Technik hinter den Kulissen

Ein individuell angepasstes Backend darf für niemanden zur Blackbox werden, weder für Sie noch für einen späteren Dienstleister. Deshalb halten wir uns an feste Regeln:

- **Alles an einem Ort:** Sämtliche Admin-Anpassungen liegen in einem eigenen, klar benannten Must-Use-Plugin (mu-plugin) statt verteilt in der `functions.php` des Themes. Sie überstehen damit einen Theme-Wechsel und können nicht versehentlich deaktiviert werden.
- **Kommentierter Code und Dokumentation:** Am Anfang der Datei steht, was geändert wurde und warum. Zusätzlich erhält jede Website eine technische Dokumentation.
- **Plugin-Diet:** Nicht benötigte Plugins werden gelöscht, nicht nur deaktiviert. Jedes inaktive Plugin ist eine mögliche Sicherheitslücke und erzeugt unnötige Update-Hinweise.
- **Performance im Blick:** Manche Admin- und Branding-Plugins legen große Datenmengen in der Tabelle `wp_options` ab, die bei jedem Seitenaufruf geladen werden (Autoload). Wir prüfen das regelmäßig, damit Backend und Website schnell bleiben.
- **Test auf der Staging-Umgebung:** Alle Anpassungen testen wir zuerst auf einer Kopie der Website, bevor sie live gehen.

Ein Beispiel für die Autoload-Prüfung, die wir bei Wartungsterminen durchführen:

```sql
SELECT option_name, LENGTH(option_value) AS size
FROM wp_options
WHERE autoload = 'yes'
ORDER BY size DESC
LIMIT 20;
```

## 8. Ihre Website gehört Ihnen: Zugang, Lizenzen und Backups

Bei aller Vereinfachung gilt für uns ein Grundsatz: Sie bleiben Eigentümer Ihrer Website. Wir möchten Sie durch gute Arbeit und zuverlässige Betreuung überzeugen, nicht dadurch, dass Sie ohne uns nicht mehr an Ihre eigene Seite kommen.

Konkret heißt das:

- **Vollständiger Zugang:** Sie erhalten immer einen Administrator-Zugang zu Ihrer Website, auch wenn Sie im Alltag mit dem vereinfachten Redakteurs-Konto arbeiten. Wenn Sie lieber gar nichts selbst machen möchten, respektieren wir das, die Wahl bleibt aber Ihre.
- **Zugänge gehören Ihnen:** Hosting, Domain, Google-Dienste und weitere Konten laufen auf Ihren Namen. Bei Premium-Plugins klären wir transparent, welche Lizenzen auf Sie übertragen werden.
- **Übergabe-Paket:** Sie erhalten eine Zusammenstellung aller Zugangsdaten, Lizenzen und verbundenen Dienste, eine Art Eigentumsurkunde für Ihre Website.
- **Backups und Revisionen:** Regelmäßige, externe Backups und eine sinnvolle Anzahl gespeicherter Seitenrevisionen sorgen dafür, dass ein Fehler schnell rückgängig gemacht werden kann. Die Wiederherstellung testen wir regelmäßig, denn ein ungetestetes Backup ist nur eine Hoffnung.
- **Updates und Wartung:** Im Rahmen unserer Wartungsverträge halten wir WordPress-Core, Themes und Plugins aktuell und behalten Sicherheit und Performance im Blick.

Unser Maßstab: Sollten Sie irgendwann den Dienstleister wechseln wollen, können Sie das jederzeit sauber tun.

## Unsere Übergabe-Checkliste auf einen Blick

| Bereich | Was wir tun | Ihr Nutzen |
| --- | --- | --- |
| Benutzerrollen | Eigene Kundenrolle, Datei-Editor aus, getrennte Konten | Volle Kontrolle ohne Risiko für die Technik |
| Admin-Menü | Unnötiges ausblenden, Begriffe vereinfachen | Schnelle Orientierung im Backend |
| Dashboard | Hilfe-Widget, Anleitungen, Support-Kontakt | Antworten genau dort, wo Sie arbeiten |
| Block-Editor | Blöcke begrenzen, Layouts sperren, Patterns | Inhalte pflegen, Design bleibt stabil |
| Mediathek | Ordner, Dateinamen, Alt-Texte | Bilder schnell wiederfinden, besseres SEO |
| Branding | Login-Seite und Backend im eigenen Look | Professioneller Gesamteindruck |
| Technik | mu-plugin, Doku, Plugin-Diet, Autoload-Check | Wartbar, schnell und sicher |
| Eigentum | Admin-Zugang, Lizenzen, Backups | Unabhängigkeit und Sicherheit |

## Fazit

Ein gut vorbereitetes WordPress-Backend ist kein Extra, sondern der Unterschied zwischen einer Website, die Sie gerne pflegen, und einer, vor der Sie Respekt haben. Wir richten den Adminbereich so ein, dass er zu Ihrer Arbeitsweise passt, schützen die technischen Grundlagen und lassen Ihnen dabei die volle Kontrolle über Ihre Website.

Sie planen einen Relaunch oder möchten Ihr bestehendes WordPress-Backend aufräumen lassen? Sprechen Sie uns an, wir beraten Sie gerne.
