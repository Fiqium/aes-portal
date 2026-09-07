# AES Portal — Handoff Notes

Quick orientation doc for whoever is picking up this project. Written from the state of the code at time of transfer.

## What this is

A React + Vite + Tailwind CSS single-page web app for UPTM's Academic Excellence Sector (AES). It's a hub covering the 7 AES units (E-Learning, ODL, SULAM, OBE, APEL, ABL, Micro-Credential), plus About Us, a Pathway Finder quiz, and a Resources page.

## Getting it running

```bash
npm install
npm run dev       # local dev server on port 8080
npm run build      # production build
npm run preview    # preview the production build
```

If `npm run dev` throws errors about missing files, check first that everything in `src/img/` came across in the transfer — several photos and logos are imported directly as ES modules in `App.jsx` and `LeadershipMatrix.jsx`, so a missing file breaks the build, not just the display.

## Where everything lives

Almost the whole app is in **`App.jsx`** — there isn't much component splitting yet. Navigation is driven by an `activeTab` state (`home`, `about`, `units`, `pathway`, `resources`), and each tab is a big conditional block in the JSX.

Key shared data objects to know, since most content changes happen by editing these rather than JSX:

| Object | Purpose |
|---|---|
| `unitsData` | The 7 unit descriptions, taglines, leads, highlights — powers the Core Units tab and the homepage unit grid |
| `sulamProjects` | SULAM community project gallery entries |
| `microCoursesList` | Micro-credential course catalog used by the credit stacker |
| `aboutData` | Vision, mission, strategic pillars, milestones — used in the About tab |
| `feedItems` | The "Latest AES Feed" hero carousel posts (6 slides), drawn from the objects above |

State worth knowing: `likedFeedItems` tracks which feed posts the user has liked (client-side only, resets on refresh), `activeUnit` controls which unit is showing in the Core Units tab, `apelResult`/`obeClos`/`selectedMicroCourses` power the interactive calculators inside each unit panel.

## Known quirks (not urgent, just worth knowing)

- **`LeadershipMatrix.jsx` is unused.** It's imported in both `App.jsx` and `main.jsx` but never rendered — the About tab has its own separately hand-coded (and slightly duplicated) leadership section instead. Either wire the component in and delete the duplicate, or delete the unused file — your call.
- **Duplicate APEL blocks.** There are two nearly identical `{activeUnit === 'apel' && (...)}` sections in `App.jsx` (both titled "Interactive: APEL.A/.C Fast-Entry Calculator") and two matching `useEffect` hooks computing the same `apelResult`. Harmless — they just overwrite the same state — but redundant and worth merging eventually.

## Most recent work

The "Latest AES Feed" hero carousel (top-right of the homepage) was upgraded from 3 hardcoded slides to 6 social-post-style cards: unit-branded avatars, author/category/date, optional photo, and a toggleable like button with live count. It reuses `unitsData`, `sulamProjects`, `aboutData.milestones`, and `microCoursesList` rather than hardcoding new content. The "View" button routes to the relevant unit tab, falling back to Resources for general announcements.

## Contact

[Add your contact info here if you want to stay reachable for questions during the transition.]
