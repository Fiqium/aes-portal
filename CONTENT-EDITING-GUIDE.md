# AES Portal — Content Editing Guide (No Coding Experience Needed)

This guide is for making small text updates to the AES Portal website — things like fixing a name, updating an announcement, or adding a new community project — **without needing to install anything or learn to code.**

## Before you start

You'll edit files directly on the GitHub website. No downloads, no terminal, no "npm install."

1. Go to the repository on github.com and sign in.
2. Open the file `src/App.jsx` (that's where nearly everything you'll need to change lives).
3. Click the **pencil icon** (top right of the file) to start editing.
4. Make your change (see examples below).
5. Scroll to the bottom, write a short note describing what you changed (e.g. "Updated SULAM lead's name"), and click **Commit changes**.

That's it — no separate "save" step, no build process for you to run.

⚠️ **One rule above all else: change ONE small thing at a time**, then commit. If something ever looks broken afterward, it's easy to tell exactly which edit caused it — and easy to undo (see "If Something Breaks" at the bottom).

## The parts of the file you'll actually touch

Near the top of `App.jsx`, you'll find several lists that hold all the website's content. Everything else below them is just the visual layout — **you should never need to touch that part.**

### 1. Updating a unit's info (`unitsData`)

Look for a block that starts like this:

```
elearning: {
    title: "E-Learning Unit",
    tagline: "Empowering digital classrooms, flexible modules...",
    description: "UPTM's e-Learning Unit drives the frontier...",
    lead: "Pn. Sharifah Nadia Binti Syed Khastudin",
    ...
```

To change the unit lead's name, tagline, or description, just replace the text **between the quote marks** — leave the quote marks (`"`) and comma (`,`) at the end exactly where they are.

✅ Safe:
```
lead: "Pn. Jane Doe",
```
❌ Don't do this (missing closing quote):
```
lead: "Pn. Jane Doe,
```

### 2. Adding a new SULAM project (`sulamProjects`)

Find the list that starts with `const sulamProjects = [`. Each project looks like this:

```
{ id: 4, title: 'Legal Literacy and Consumer Rights Webinar Series', category: 'Social', impact: '350 Live Stream Observers', unit: 'SULAM', img: 'https://...' },
```

To add a new one, copy an existing line, paste it right below, and change:
- `id` — must be a new number nobody else is using
- `title`, `category`, `impact` — your new project's details
- `img` — a link to a photo (must start with `https://`)

Make sure your new line **ends with a comma** if it's not the last one in the list, and keep the curly braces `{ }` at the start and end.

### 3. Adding an FAQ (`faqItems`)

Same pattern — find `const faqItems = [`, copy an existing `{ q: "...", a: "..." }` line, and edit the question (`q`) and answer (`a`) text.

### 4. Updating milestones, contact info, or announcements

- **Milestones** (About Us timeline): look for `aboutData.milestones` — each has a `year` and an `event`.
- **Contact details**: search for "aes@uptm.edu.my" near the bottom of the file — the email, phone, and address are plain text right there.
- **The top announcement banner**: search for "New Announcement" near the top of the file — the message is the plain text right after it.

## What NOT to touch

- Anything starting with `<` (like `<div className=...>`) — that's layout code, not content.
- The curly braces `{ }` and square brackets `[ ]` themselves — only change what's *inside* the quote marks.
- Anything inside `useState`, `useEffect`, or `function` — that's logic, not content.

If you're ever unsure whether something is safe to edit, stop and ask rather than guess.

## If something breaks

1. Go to the file on GitHub and click **History** (top right).
2. Find the commit right before things went wrong.
3. Click it, then use **Revert** to undo just that change — nothing else is affected.

## When to ask for help instead

- Adding a brand-new page or feature
- Anything about how the site *looks* (colors, layout, buttons)
- Uploading new image files
- Anything that isn't plain text inside quote marks

For those, reach out to [add your contact / IT support contact here].
