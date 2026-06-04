# UP Baguio Mountaineers — Website

A free, static website for the UP Baguio Mountaineers (UPBM) with three core features:

1. **Calendar of Events** — climbs, training, advocacy drives (`events.html`)
2. **Interactive Map of Cordillera Mountains** — topographic, clickable peaks (`map.html`)
3. **About the Organization + Batch Directory** (`about.html`)

Everything here uses **100% free and open-source tools**. No paid software or services are required.

---

## 1. What you need (all free)

| Purpose | Tool | Cost | Link |
|---|---|---|---|
| Code editor | **Visual Studio Code** | Free | https://code.visualstudio.com |
| Languages | **HTML, CSS, JavaScript** | Free | (built into every browser) |
| Map | **Leaflet** + **OpenStreetMap / OpenTopoMap** | Free | https://leafletjs.com |
| Calendar | **FullCalendar** | Free (MIT) | https://fullcalendar.io |
| Fonts | **Google Fonts** (Fraunces, Archivo, Space Mono) | Free | https://fonts.google.com |
| Hosting | **GitHub Pages** (or Netlify / Cloudflare Pages) | Free | https://pages.github.com |
| Version control | **Git** | Free | https://git-scm.com |

> The map and calendar libraries load from a free CDN, so an internet connection is needed when the site is viewed. No installation of those libraries is required.

---

## 2. Project structure

```
upbm-website/
├── index.html        ← Home
├── about.html        ← About + batch directory
├── events.html       ← Calendar of events
├── map.html          ← Interactive Cordillera map
├── css/
│   └── style.css
├── js/
│   ├── main.js        ← shared nav
│   ├── calendar.js    ← calendar logic
│   └── map.js         ← map logic
├── data/              ← EDIT THESE to update content
│   ├── events.json
│   ├── mountains.json
│   └── batches.json
└── assets/            ← put logos/photos here
```

---

## 3. How to run it on your computer

Because the pages load data from `.json` files, you must open them through a small **local web server** (opening the HTML file directly with `file://` will block the data from loading).

**Easiest way — VS Code Live Server:**
1. Open the `upbm-website` folder in VS Code.
2. Install the extension **"Live Server"** (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **"Open with Live Server"**. Your browser opens the site.

**Alternative — Python (already on most computers):**
```bash
cd upbm-website
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 4. How to edit the content (no coding needed)

All the content lives in the `data/` folder as plain text JSON files.

- **Add/change events** → edit `data/events.json`. Each event needs a `title`, a `start` date (`YYYY-MM-DD`), and a `category` (`climb`, `training`, `advocacy`, `social`, or `meeting`). Add `end` for multi-day climbs.
- **Add/change mountains** → edit `data/mountains.json`. Each needs `name`, `elevation_m`, `location`, `lat`, `lng`, `difficulty`, and `notes`.
- **Add/change batches** → edit `data/batches.json`. Replace the placeholder `batch_name`, `tagline`, and `members`.
- **About text** → edit the paragraphs directly in `about.html`.
- **Photos** → drop image files in `assets/` and reference them, e.g. `<img src="assets/photo.jpg">`.

> ⚠️ Keep the JSON formatting valid (commas, quotes, brackets). Paste your file into https://jsonlint.com to check it if unsure.

---

## 5. How to publish it online for free (GitHub Pages)

1. Create a free account at https://github.com.
2. Create a new **public** repository, e.g. `upbm-website`.
3. Upload all the files (drag-and-drop in the browser works, or use Git).
4. Go to the repo's **Settings → Pages**.
5. Under "Build and deployment", set **Source = Deploy from a branch**, **Branch = main**, **Folder = / (root)**, then Save.
6. Wait ~1 minute. Your site goes live at:
   `https://<your-username>.github.io/upbm-website/`

**Even simpler (drag-and-drop):** go to https://app.netlify.com/drop and drag the whole `upbm-website` folder onto the page. It deploys instantly and gives you a free URL. You can set a custom name in the site settings.

---

## 6. Connecting the Facebook page

Facebook blocks automated copying of page content, so the text/photos must be added by hand:
- Copy the org's description, event posts, and photos from
  https://www.facebook.com/UPBaguioMountaineers
- Paste descriptions into `about.html` and event details into `data/events.json`.
- Save photos to the `assets/` folder and reference them in the pages.
- The footer and About page already link back to the Facebook page.

---

## 7. Credits & licenses

- Leaflet — BSD-2-Clause · OpenStreetMap — ODbL · OpenTopoMap — CC-BY-SA
- FullCalendar — MIT
- Google Fonts: Fraunces, Archivo, Space Mono — Open Font License

All free for non-commercial and organizational use. Built for the UP Baguio Mountaineers.
