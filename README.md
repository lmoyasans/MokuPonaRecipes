# moku pona — dinners & recipes archive

A searchable archive of moku pona dinners and the recipes cooked at them —
the seed of a future moku pona cookbook.

Live at: `https://lmoyasans.github.io/MokuPonaRecipes/`

## How it works

- Every dinner and recipe is a small YAML file in `src/content/dinners/` and
  `src/content/recipes/`, committed straight into this repo — there's no
  database or CMS.
- [Astro](https://astro.build) reads those files at build time and generates
  a page for each one automatically from a shared template
  (`src/pages/dinners/[slug].astro`, `src/pages/recipes/[slug].astro`), plus
  browsable, filterable index pages and dinner detail pages.
- [Pagefind](https://pagefind.app) indexes the built site for the search box
  in the header — full-text, no backend required.
- The whole thing is a static site: fast, free to host, and every page has
  a stable, shareable URL (e.g. `/recipes/miso-ramen/`).

## Where the data lives, and how updates go live

The YAML files live in this git repo — there's no server or database holding
them, and the page never queries anything at runtime. Adding a recipe means
adding a file here.

When a change is pushed to `main`, `.github/workflows/deploy.yml` rebuilds
the whole static site (reads all the YAML, generates fresh HTML + a fresh
search index) and republishes it to GitHub Pages — automatically, usually
within a minute or two. So updates aren't instant/live in the sense of a
database query, but they do go out on their own without anyone needing to
run a build by hand.

## Adding a dinner or recipe

You don't need to know how the website works — you just need to add a text
file. The site builds itself from these files automatically.

There are two kinds of files, both plain YAML:

- `src/content/dinners/` — one file per dinner (the event itself: date, theme)
- `src/content/recipes/` — one file per dish (ingredients, steps, which dinner it belongs to)

### Adding a dinner

1. Copy this into a new file in `src/content/dinners/`, named like
   `YYYY-MM-DD-short-title.yaml` (the filename becomes the page's URL, so
   keep it short and use dashes instead of spaces).
2. Fill in the blanks. Only `title` and `date` are required — delete any
   line you don't want to fill in.

```yaml
title: Your Dinner's Title
date: 2026-06-01
theme: One line about the theme, if there was one
description: >
  A short paragraph about how the evening went — what it was for,
  who came, anything worth remembering.
```

### Adding a recipe

1. Copy this into a new file in `src/content/recipes/`, named like
   `dish-name.yaml` (again, this becomes the URL — keep it short, lowercase,
   dashes instead of spaces).
2. Fill in the blanks. Only `title` is required. `dinner` should exactly
   match the filename (without `.yaml`) of the dinner it belongs to — leave
   it out if the recipe isn't tied to a specific dinner (this is also fine
   for cocktails or anything else not linked to one evening).

```yaml
title: Your Recipe's Name
dinner: 2026-06-01-short-title
description: One or two sentences about the dish.
servings: 4
prepTime: 15 min
cookTime: 30 min
difficulty: easy # easy | medium | hard
tags: [vegan, mains]
ingredients:
  - 200g something
  - 1 tbsp something else
steps:
  - First thing you do.
  - Second thing you do.
notes: Optional tip, substitution, or story.
```

Tags are freeform — reuse existing ones where they fit (check the tag
filters on the site's `/recipes` page for the current list) so filtering
stays useful, but feel free to introduce a new one if nothing fits.

### Adding a photo

Drop the image in `public/images/recipes/` or `public/images/dinners/`,
then reference it as `image: /images/recipes/your-file.jpg` (or `photo:` for
dinners). Recipes without a photo get an automatic placeholder, so this is
optional.

### Publishing your change

- **Comfortable with GitHub:** edit the files directly on GitHub
  (use "Add file" → "Create new file" in the relevant folder) and open a
  pull request, or push a commit if you have write access.
- **Prefer email/chat:** send the filled-in template and a photo if you
  have one to anyone on the team with GitHub access, and it'll get added
  for you.

Once merged into `main`, the site rebuilds and publishes automatically —
see [Where the data lives](#where-the-data-lives-and-how-updates-go-live)
above for how long that takes.

### Checking your work locally (optional)

If you want to preview before publishing:

```sh
npm install
npm run dev
```

Then open the URL it prints. If your YAML has a typo or a missing required
field, the terminal will tell you exactly which file and what's wrong.

## Project structure

```text
src/
  content/
    dinners/*.yaml     # one file per dinner
    recipes/*.yaml     # one file per recipe
  content.config.ts    # schema/validation for the YAML above
  components/          # RecipeCard, DinnerCard, Header, etc.
  layouts/             # BaseLayout wraps every page
  pages/
    index.astro
    dinners/[slug].astro   # auto-generated per-dinner page
    recipes/[slug].astro   # auto-generated per-recipe page
public/
  images/dinners/, images/recipes/   # photos referenced from YAML
```

## Deployment

This site is deployed under the `lmoyasans` GitHub Pages account, but as its
own project — not the account's main page. `lmoyasans.github.io` (the
account's root site) is untouched; this lives at
`lmoyasans.github.io/MokuPonaRecipes/`, matching this repo's name, which is
how GitHub Pages serves any repo that isn't itself named
`<username>.github.io`.

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
To enable it: in the repo's Settings → Pages, set **Source** to
"GitHub Actions".

If this ever moves to a different host or path, update `site` and `base` in
`astro.config.mjs` to match — `base` in particular must match whatever
subpath (if any) the site is served under, since every internal link is
built from it.

## Roadmap

- ~~Searchable archive of past dinners and recipes~~
- Idea collection + voting for future dinners (Zurich Storytellers-style),
  once the archive is in regular use
