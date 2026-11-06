# Jena Benisse Redondo — The Living Canvas (interactive portfolio)

A nine-page, multi-view portfolio built with plain **HTML, CSS and vanilla JavaScript** (no framework, no build step).

Pages: Home · About · Education · Skills · Projects · Certificates · Experience · Resume · Contact.

## Project structure

```
index.html          single entry point (all nine pages + overlays)
css/style.css       base layout, components, responsive rules
css/living.css      Living Canvas layer (intro, Sprig, backdrops, transitions)
css/pages.css       page polish + final fit rules (laptop heights, Sprig bubble)
js/data.js          all content: projects, certificates, experience, skills
js/main.js          routing, pages, viewers, forms, keyboard shortcuts
js/intro.js         cinematic intro (skip / slide-to-open / replay)
js/audio.js         opt-in sound system (no autoplay)
js/living.js, art.js, pages.js, portal.js   transitions, illustrations, page logic, Discovery Portal
images/  certificates/  resume/             real assets
_original-backup/   untouched copies of the earlier files
```

## Run locally (Laragon or any static server)

1. Copy the folder into `C:\laragon\www\portfolio`.
2. Start Laragon → open `http://portfolio.test/` (or `http://localhost/portfolio/`).
3. Any static server also works, e.g. `python -m http.server 8000` then open `http://localhost:8000`.

Open it through a server rather than double-clicking `index.html`, so the PDF previews load correctly.
Fonts and icons load from Google Fonts / Font Awesome CDNs, so an internet connection is needed for the intended look.

## Deploy to GitHub Pages

1. Create a repository and push this folder to the `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The included workflow (`.github/workflows/github-pages.yml`) publishes the site on every push.
   All paths are relative, so it works under `https://<user>.github.io/<repo>/`.

## Useful URLs and shortcuts

- Pages: `#/home`, `#/about`, `#/education`, `#/skills`, `#/projects/3`, `#/certificates/5`, `#/experience`, `#/resume`, `#/contact`
- Replay the intro: add `?intro` to the URL, or use the Discovery Portal.
- Keys: `[` `]` previous/next · `1`–`9` jump to a page · `P` portal · `G` directory · `T` theme · `Esc` close.
- Preferences (theme, sound, effects, intro seen) are stored in `localStorage`.

## Updating content

Projects, certificates, skills and experience live in `js/data.js`. Replace files in `certificates/` and `resume/` keeping the same filenames, or update the paths in `data.js`.
