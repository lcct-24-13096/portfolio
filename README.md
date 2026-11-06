# Jena Benisse Redondo — The Living Canvas (interactive portfolio)

Multi-view portfolio (no endless scrolling). Hash routes: `#/home`, `#/about`, `#/education`, `#/skills`,
`#/projects/2`, `#/certificates/3`, `#/experience`, `#/resume`, `#/contact`.

## What's new in this redesign
- **Cinematic intro "Enter Jena's World"** (`js/intro.js`): gate ("Wake the canvas" seed + a live sound line you tap to tune in; sound is off by default) → first spark → cartoon world with Sprig → name reveal → your real photograph revealed in the centre → "Welcome to my world." + a **slide-to-open** control (drag the knob, or tap / press Enter). Skippable (button or Esc). Shown on first visit only (`localStorage jbr-seen`); replay from the Discovery Portal or the sound panel. Add `?intro` to the URL to force it.
- **Original sound** (`js/audio.js`): every sound and the music are synthesized live with Web Audio — no audio files, no licensing. Never autoplays; music, effects, volume, mute, visualizer; preferences saved (`jbr-audio`).
- **Centered portrait hero** (photo enlarged ~15–20% in this version, still fits 1366×768 without extra scrolling) with oversized layered type, floating stickers, 3D tilt and light (`css/living.css`).
- **Discovery Portal** (`js/portal.js`) replaces the terminal and command palette: a map of rooms plus a shelf of projects, certificates, skills and quick actions. Press **P** or Ctrl+K.
- **Cross-section transitions**: a sticker travels across the wipe and the next page's big word settles into its backdrop.
- **Cinematic polish** (`css/pages.css`): letterbox bars, light trail, film grain, rays, cartoon-Jena → real photo reveal with flash and riser sound, mouse parallax, progress line.
- **Inside the site**: drifting aurora backdrops, grain, handwritten asides per page, staggered page entrances, scrapbook About, exhibition-style Projects, gallery-style Certificates, custom cursor ring.
- **Sprig** companion, **achievements**, magnetic typography, easter eggs, About field-note card.
- Your own cartoon pictures: see `images/cartoon/README.txt` (none were found in the original zip, so Sprig and the stickers are original SVG drawings, not likenesses).

## Run / deploy
- **Laragon:** copy to `C:\laragon\www\portfolio` → `http://portfolio.test/`.
- **GitHub Pages:** push to `main`; workflow in `.github/workflows/github-pages.yml`.
- Content lives in `js/data.js`. Original files are in `_original-backup/` (previous index.html, style.css, main.js).
- Shortcuts: P portal · [ ] prev/next · 1–9 jump · G visual index · T theme · ? tour.
- Photographs, certificates (PDF + images), resume and all text are unchanged.
