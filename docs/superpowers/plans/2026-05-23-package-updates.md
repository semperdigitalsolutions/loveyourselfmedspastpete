# Dependency Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update all six outdated dependencies to their latest versions, including the two major bumps (Astro 5→6, TypeScript 5→6), with the Astro 6 Content Layer migration done safely.

**Architecture:** Sequenced commits, lowest-risk first. The drop-in updates land first and are each verified by `pnpm build` (which runs `astro check && astro build`). The Astro 6 work is split into two isolated commits: first migrate the content-collections API to the Content Layer loaders *while still on Astro 5* (so the migration is verified independently of the version bump), then bump Astro to 6 and verify. A Netlify Node pin is added before the Astro 6 bump because Astro 6 requires Node ≥22.12.

**Tech Stack:** Astro 6, Tailwind CSS 4.3, TypeScript 6, pnpm, Netlify.

**Verification command (used throughout):** `pnpm build`
- This runs `astro check && astro build`.
- Expected on success: `astro check` prints `Result (NN files): 0 errors` and the build prints `[build] NN page(s) built` followed by `[build] Complete!`.

**Target versions:**
| Package | From | To |
|---|---|---|
| prettier (dev) | 3.8.1 | 3.8.3 |
| @astrojs/check | 0.9.6 | 0.9.9 |
| tailwindcss | 4.2.2 | 4.3.0 |
| @tailwindcss/vite | 4.2.2 | 4.3.0 |
| typescript | 5.9.3 | 6.0.3 |
| astro | 5.18.1 | 6.3.7 |

---

### Task 1: Drop-in minor/patch batch (prettier, @astrojs/check, tailwindcss, @tailwindcss/vite)

These four carry no breaking changes for this codebase. `tailwindcss` and `@tailwindcss/vite` MUST move together (their versions must match).

**Files:**
- Modify: `package.json` (dependency versions — written by pnpm)
- Modify: `pnpm-lock.yaml` (written by pnpm)

- [ ] **Step 1: Establish a green baseline before changing anything**

Run: `pnpm build`
Expected: `astro check` reports `0 errors`; build prints `[build] Complete!`. If this fails, STOP — the tree is not green before we start, and that must be resolved first.

- [ ] **Step 2: Update the four packages to latest**

Run:
```bash
pnpm up --latest prettier @astrojs/check tailwindcss @tailwindcss/vite
```
Expected: pnpm reports these packages updated. `package.json` now shows `prettier ^3.8.3`, `@astrojs/check ^0.9.9`, `tailwindcss ^4.3.0`, `@tailwindcss/vite ^4.3.0`.

- [ ] **Step 3: Verify the build is still green**

Run: `pnpm build`
Expected: `astro check` reports `0 errors`; build prints `[build] Complete!` with the same page count as the Step 1 baseline.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): update prettier, @astrojs/check, tailwindcss to latest"
```

---

### Task 2: TypeScript 5.9 → 6.0 (major)

TypeScript 6.0 is API-compatible with 5.9. The breaking changes (removal of `moduleResolution: classic`, disallowing `esModuleInterop: false`) do not apply here — `tsconfig.json` extends `astro/tsconfigs/strict` and sets none of those flags.

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml` (written by pnpm)

- [ ] **Step 1: Update TypeScript to latest**

Run:
```bash
pnpm up --latest typescript
```
Expected: `package.json` shows `typescript ^6.0.3`.

- [ ] **Step 2: Verify the build and type-check pass under TS 6**

Run: `pnpm build`
Expected: `astro check` reports `0 errors`; build prints `[build] Complete!`.

If `astro check` reports new errors here, they will be concrete type errors. Read each one and fix it in the file/line it names; do not suppress with `// @ts-ignore`. Re-run `pnpm build` until `0 errors`.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): upgrade TypeScript to 6.0"
```

---

### Task 3: Pin Node version for Netlify (Astro 6 prerequisite)

Astro 6 requires Node ≥22.12.0. The repo has no `netlify.toml`, `.nvmrc`, or `.node-version`, so Netlify currently uses its platform default — which may be Node 18/20 and would fail the Astro 6 build. Pin Node 22 (current LTS, well above 22.12) via `.nvmrc`, which both Netlify and local tooling respect.

**Files:**
- Create: `.nvmrc`

- [ ] **Step 1: Create the `.nvmrc` file**

Create `.nvmrc` with exactly this content (single line):
```
22
```

- [ ] **Step 2: Verify the file contents**

Run: `cat .nvmrc`
Expected output: `22`

- [ ] **Step 3: Commit**

```bash
git add .nvmrc
git commit -m "chore: pin Node 22 via .nvmrc for Astro 6 (Netlify build)"
```

---

### Task 4: Migrate content collections to the Content Layer API (still on Astro 5)

Astro 6 removes the legacy `type: "content"` / `type: "data"` collection definitions and the `entry.render()` method, and requires the config at `src/content.config.ts` (not `src/content/config.ts`). The Content Layer `glob()` loader and the standalone `render()` function both already exist in Astro 5, so we do this migration first and verify it on the current Astro version — isolating the API change from the version bump.

The dynamic routes already use `entry.id` (e.g. `post.id.replace(/\.md$/, '')`). Under the `glob()` loader, a markdown id has no extension, so `.replace(/\.md$/, '')` becomes a harmless no-op and produces the same slugs as today — routes are unchanged. Leave that code as-is.

**Files:**
- Create: `src/content.config.ts`
- Delete: `src/content/config.ts`
- Modify: `src/pages/blog/[slug].astro:2` and `:18`
- Modify: `src/pages/services/[slug].astro:2` and `:16`

- [ ] **Step 1: Create `src/content.config.ts` with glob loaders**

Create `src/content.config.ts` with this exact content (schemas are unchanged from the old config; only the `type:` lines are replaced with `loader:` and the `glob` import is added):
```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog collection
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(300),
    author: z.string().default("Shari"),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum(["Skincare", "Nutrition", "Treatments", "Wellness"]),
    featuredImage: z.string(),
    featuredImageAlt: z.string().optional(),
    readTime: z.number().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Services collection
const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string().max(200),
    image: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    duration: z.string().optional(),
    priceRange: z.string().optional(),
    bookingServiceId: z.number().optional(),
  }),
});

// Gallery collection (before/after results)
const gallery = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      "Body Contouring",
      "Facials",
      "Injectables",
      "Holistic Wellness",
    ]),
    beforeImage: z.string(),
    afterImage: z.string(),
    sessions: z.number(),
    description: z.string(),
    testimonial: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, services, gallery };
```

- [ ] **Step 2: Delete the old config file**

Run:
```bash
git rm src/content/config.ts
```
Expected: `rm 'src/content/config.ts'`. Having both files present causes a conflict, so the old one must go.

- [ ] **Step 3: Update `src/pages/blog/[slug].astro` to use the `render()` function**

Change the import on line 2 from:
```astro
import { getCollection } from 'astro:content';
```
to:
```astro
import { getCollection, render } from 'astro:content';
```

Change the render call on line 18 from:
```astro
const { Content } = await post.render();
```
to:
```astro
const { Content } = await render(post);
```

- [ ] **Step 4: Update `src/pages/services/[slug].astro` to use the `render()` function**

Change the import on line 2 from:
```astro
import { getCollection } from 'astro:content';
```
to:
```astro
import { getCollection, render } from 'astro:content';
```

Change the render call on line 16 from:
```astro
const { Content } = await service.render();
```
to:
```astro
const { Content } = await render(service);
```

- [ ] **Step 5: Verify the build is green on Astro 5 with the migrated API**

Run: `pnpm build`
Expected: `astro check` reports `0 errors`; build prints `[build] Complete!` with the same page count as the Task 1 baseline (1 blog post page, 29 service pages, plus the static pages and gallery). Spot-check the output mentions blog and services pages were built.

If pages are missing or counts dropped, the glob `base` paths are the likely cause — confirm `src/content/blog`, `src/content/services`, and `src/content/gallery` are the correct directories and re-run.

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/pages/blog/[slug].astro src/pages/services/[slug].astro
git commit -m "refactor(content): migrate collections to Content Layer API (glob loaders + render())"
```

---

### Task 5: Bump Astro 5 → 6 (major)

With the content API already migrated and verified, and Node pinned, the version bump itself should be clean. Astro 6 brings Vite 7, Node 22+, Zod 4, Shiki 4, stable Content Layer, and improved default image handling. No `getImage()` or `import.meta.env` usage exists in `src/`, so those v6 breaking changes don't apply.

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml` (written by pnpm)

- [ ] **Step 1: Confirm local Node satisfies Astro 6**

Run: `node --version`
Expected: `v22.12.0` or higher (local is v26 — fine). If somehow below 22.12, switch Node (`nvm use 22`) before continuing.

- [ ] **Step 2: Update Astro to latest**

Run:
```bash
pnpm up --latest astro
```
Expected: `package.json` shows `astro ^6.3.7` (or newer 6.x). pnpm may also adjust transitive deps (Vite 7, etc.) in the lockfile.

- [ ] **Step 3: Verify the production build under Astro 6**

Run: `pnpm build`
Expected: `astro check` reports `0 errors`; build prints `[build] Complete!` with the same page count as Task 4 Step 5.

If `astro check` or the build reports errors, read each one against the [Astro v6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/) and fix in the file it names. Most likely none, given the prerequisites are done. Re-run `pnpm build` until green.

- [ ] **Step 4: Smoke-test the dev server and key pages**

Run: `pnpm dev` (starts at localhost:4321), then in another shell verify the migrated content routes respond:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/blog/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/services/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/gallery
```
Expected: each prints `200`. Stop the dev server afterward (Ctrl-C).

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): upgrade Astro to 6"
```

---

## Post-completion notes

- After merging, confirm the first Netlify deploy uses Node 22 (check the build log header for the Node version) — this validates the `.nvmrc` pin took effect in CI, which local builds cannot prove.
- `@tailwindcss/typography` is already at the latest (0.5.19) and is intentionally out of scope.
