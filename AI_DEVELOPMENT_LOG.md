# AI Development Log — Task Board (Week 3, Frontend AI Engineering)

## What this is
A small React + Vite task board (To Do / In Progress / Done), built using Claude as a
development assistant end-to-end: scaffolding, components, state, styling, and verification
in a live browser preview.

## Prompts used during development

1. **Scaffold**
   `npm create vite@latest week3-react-app -- --template react`, then install deps.

2. **Define the feature set**
   "Build a task board app: three columns (To Do, In Progress, Done), add/edit/delete tasks,
   move a task to the next column, a priority field (low/medium/high) with a visual indicator,
   a search box that filters by title, a priority filter dropdown, and persistence via
   localStorage so state survives a reload."

3. **Component breakdown**
   "Split this into a `useLocalStorage` hook, a `TaskForm` for add/edit, a `TaskCard` for a
   single task with its actions, and a `Column` that groups cards by status. Keep `App.jsx`
   as the state owner — it holds the task list and passes handlers down."

4. **Styling**
   "Give it a dark theme (matches the FlyRank dashboard aesthetic), a 3-column CSS grid that
   collapses to 1 column under 760px, and color-coded priority dots/borders (red/amber/green)."

5. **Verification prompt**
   "Run the dev server, open it in a browser, and actually exercise every flow: add a task,
   move it between columns, edit an existing task, search, filter by priority, delete, and
   reload the page to confirm localStorage persistence actually works — don't just eyeball
   the code."

## How AI assisted throughout

- Generated the initial component structure and the `useLocalStorage` hook (read-on-mount,
  write-on-change, wrapped in try/catch for private-browsing/storage-disabled cases).
- Wrote the CRUD logic in `App.jsx` (`handleSave`, `handleMove`, `handleDelete`) and the
  derived `filteredTasks` memo combining the search query and priority filter.
- Wrote the CSS from a plain description of the look (dark theme, grid, priority colors)
  rather than me hand-tuning every value.
- Drove the actual browser (not just static review) to click through add/edit/move/search/
  filter/delete and reload-to-check-persistence, catching one real bug this way (see below).

## Manual review / corrections after reviewing AI-generated code

- **Dead starter assets**: Vite's template left `hero.png`, `react.svg`, `vite.svg`, and an
  unused `icons.svg` sprite wired into `App.jsx`. Removed the unused imports and files instead
  of leaving them in — AI-generated scaffolds tend to carry template cruft forward if you
  don't prune it.
- **Edit-form reset bug caught live**: while clicking through the UI, clicking "Edit" right
  after a "Move" action initially appeared to do nothing — the coordinates had shifted because
  the previous action reordered the column. Confirmed in a second pass that the edit form
  itself was populating correctly (title/notes/priority all loaded, Save/Cancel swapped in);
  the miss was a stale click target in my test script, not an app bug. Verified by re-running
  the click and reading the resulting form state.
- **Confirmed persistence manually**: reloaded the page after adding/moving tasks and checked
  the board reflected the same state from `localStorage`, rather than trusting the hook's code
  looked correct.
- **Kept the move action single-purpose**: the first draft of `TaskCard` considered a full
  drag-and-drop implementation; scoped it down to a "Move to <next column>" button instead,
  since drag-and-drop added real complexity (DnD library, touch support) without changing what
  the assignment is actually testing (AI-assisted build quality, not drag interactions).

## Stack
React 19, Vite, plain CSS (no UI framework), `localStorage` for persistence. No backend.
