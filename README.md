# cc-dataset-newkey-repro

Minimal, standalone reproduction — **no Rosey, no RCC connector**. The single
question under test:

> Can the CloudCannon Visual Editor JS API add a **new top-level key** to a
> `data_config` data file and have it survive **Save**?

## Setup

- Astro + `@cloudcannon/editable-regions` (the same known-good integration used
  by our real sites).
- One data file: [`data/test.json`](data/test.json), exposed via
  `data_config.test` in [`cloudcannon.config.yml`](cloudcannon.config.yml).
- One page ([`src/pages/index.astro`](src/pages/index.astro)) with four buttons
  that call the API directly and log results on-page + to the console.

## Run it

1. `pnpm install` (npm is broken in this workspace — use pnpm).
2. Push to a GitHub repo and create a CloudCannon site from it (Astro is
   auto-detected; the build is `astro build`).
3. Open the site in the **Visual Editor**.
4. Click each button, read the logged key, then open the **Save modal** and
   check whether that key appears in the `data/test.json` diff. **Discard** —
   don't commit.

## The four tests

| Button | Write path | Expected if the API works as the team believes |
| --- | --- | --- |
| **D (control)** | `data.set` on an **existing** key (`existing_key.value`) | Appears in diff (proves the plumbing works) |
| **A** | `data.set` on a **new** top-level key (dataset handle) | Appears in diff |
| **B** | `content.set` full-file rewrite adding a **new** key (dataset handle) | Appears in diff |
| **C** | `data.set` on a **new** key (file-by-path handle) | Appears in diff |

## What we observed in the real site (to be confirmed here)

- **D persists** (existing-key edits save fine).
- **A, B, C did NOT persist** — Save showed only a newline, the new key absent.

If this minimal repro shows the same (D persists, A/B/C don't), it's a clean
CloudCannon save-layer case to hand to the editable-regions team. If A/B/C
persist here, the bug is specific to our real setup (Rosey key shape, connector
flow, echo overwrite) and we go back to that.
