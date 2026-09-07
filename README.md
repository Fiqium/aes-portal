# AES Portal

A web portal for the **Academic Excellence Sector (AES)** at Universiti Poly-Tech Malaysia (UPTM) — a hub covering AES's core academic units, community projects, micro-credentials, and student resources.

## Overview

AES coordinates seven academic units at UPTM. This portal brings them together in one place with interactive tools for each:

- **E-Learning** — digital readiness self-assessment quiz
- **ODL (Open & Distance Learning)** — degree program planner and study-load overview
- **SULAM (Community Relations)** — filterable gallery of student community projects
- **OBE (Outcome-Based Education)** — CLO-to-PLO mapping matrix builder
- **APEL (Prior Experiential Learning)** — eligibility calculator based on age/experience
- **ABL (Activity-Based Learning)** — sample lesson activity sandbox
- **Micro-Credentials** — stackable course selector with credit/fee tracking

It also includes a homepage feed carousel of unit updates, a Pathway Finder quiz that recommends a unit based on the visitor's profile, a Resources/FAQ/contact page, and a simple rule-based chat helpdesk widget.

## Tech Stack

- [React 19](https://react.dev/) (functional components + hooks)
- [Vite 8](https://vite.dev/) as the build tool/dev server
- [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [Font Awesome 6](https://fontawesome.com/) (loaded via CDN in `index.html`)

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (required by the Vite 8 / Rolldown toolchain)
- npm

## Getting Started

```bash
# install dependencies
npm install

# start the local dev server (http://localhost:8080)
npm run dev

# build for production
npm run build

# preview the production build locally
npm run preview
```

## Project Structure

```
├── index.html          # HTML entry point, loads Google Fonts + Font Awesome CDN
├── src/
│   ├── main.jsx         # React root, mounts <App />
│   ├── App.jsx           # Main application — all tabs, data, and interactive tools
│   ├── LeadershipMatrix.jsx  # Standalone leadership grid component
│   ├── style.css          # Tailwind import + custom theme tokens/utilities
│   └── img/                # Local image assets (photos, logos), imported as ES modules
├── vite.config.js       # Vite config — relative asset paths, port 8080
└── package.json
```

Most content (unit descriptions, SULAM projects, micro-courses, milestones, feed posts) lives in plain JS objects near the top of `App.jsx` rather than being hardcoded into the JSX — update those objects to change what's displayed.

## Notes

- Asset paths are set to relative (`base: './'` in `vite.config.js`) so the build can be deployed from any subdirectory.
- Images in `src/img/` are imported directly as modules (not referenced by string path), so they must be committed to version control or the build will fail.

## Maintained by

UPTM Academic Excellence Sector (AES) Department
