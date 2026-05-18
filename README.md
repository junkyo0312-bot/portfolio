# Junkyo Seo — Portfolio

A personal portfolio for Junkyo Seo (서준교), BS–MS integrated student
at the Structural Analysis Laboratory, Seoul National University.

Built with React (via in-browser Babel transpilation) on top of the
Orbit editorial design language.

## Local preview
Open `index.html` directly in a browser, or serve the folder with any
static server:

```
python3 -m http.server 8000
# → http://localhost:8000
```

## Project structure
```
index.html              — main shell (also served at root)
colors_and_type.css     — design tokens
components/             — React components (JSX, transpiled in-browser)
  Nav.jsx
  Hero.jsx              — PML wave-decay schematic
  Projects.jsx          — constellation of 3 projects
  Research.jsx          — Current focus + Notes tab
  Publications.jsx      — Talks & seminars
  Education.jsx         — GPA stat strip
  Footer.jsx
tweaks-panel.jsx        — in-design tweak controls
notes/                  — research-note PDFs served by the Notes tab
assets/                 — design-system marks & icons
```

## Deployment

Deployed via GitHub Pages — see Settings → Pages.
The root `index.html` is the only entry point.
