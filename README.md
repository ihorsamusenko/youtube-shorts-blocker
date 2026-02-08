# YouTube Shorts Blocker

A lightweight Chrome extension that hides YouTube Shorts from your browsing experience. No Shorts shelves, no sidebar links, no suggestions — just regular YouTube.

Direct Shorts URLs (`youtube.com/shorts/...`) still work if you navigate to them explicitly.

## What gets hidden

- Shorts shelves on the homepage, subscriptions, and search results
- "Shorts" link in the sidebar and mini sidebar
- Shorts tab on channel pages
- Shorts navigation chips/pills

## Installation

1. **Download** this repository:
   - Click the green **Code** button above, then **Download ZIP**
   - Or clone it: `git clone https://github.com/ihorsamusenko/youtube-shorts-blocker.git`
2. **Unzip** if you downloaded the ZIP
3. Open **Chrome** and go to `chrome://extensions`
4. Enable **Developer mode** (toggle in the top-right corner)
5. Click **Load unpacked**
6. Select the folder you downloaded/cloned
7. Open [youtube.com](https://youtube.com) — Shorts are gone

## How it works

Two layers of blocking:

- **CSS injection** — injected at `document_start` before the page renders, so there's zero flicker
- **MutationObserver** — catches Shorts elements that YouTube loads dynamically as you navigate (YouTube is a single-page app and doesn't do full page reloads)

No background scripts, no network requests, no data collection. The extension only runs on `youtube.com`.
