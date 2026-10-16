# Repository Guidelines

## Project Structure & Module Organization

This is Lancern's personal website, built with Astro, TypeScript, and MDX.

- `src/pages/` defines routes; articles live in `posts/YYYY/MM/` as Markdown or MDX.
- `src/components/` contains reusable Astro components, grouped into `activities/`, `posts/`, and `icon/` where appropriate.
- `src/layouts/` provides page and article layouts; `src/scripts/` holds post filtering and GitHub activity logic.
- `src/styles/global.css` contains shared styles. `public/` holds static assets, with article images under `images/posts/YYYY/MM/<slug>/`.
- `astro.config.mjs` configures MDX, Mermaid, math rendering, and the Vercel adapter. Most pages are static; the activities route renders on demand.

## Build, Test, and Development Commands

- `npm ci`: install dependencies from the lockfile.
- `npm run dev`: start the local Astro development server.
- `npm run build`: run Astro's type and template checks, then build the site.
- `npm run preview`: preview the production build locally.
- `npm run check-fmt`: check repository formatting with Prettier.
- `npm run fmt`: apply Prettier formatting; review the resulting diff for unrelated changes.
- `python3 x.py new my-post`: scaffold an MDX article with dated directories and frontmatter. Use `--date YYYY-MM-DD` or `--no-mdx` as needed.

## Coding Style & Naming Conventions

Follow Prettier's configuration: two-space indentation, a 100-character print width, and Astro formatting through `prettier-plugin-astro`. TypeScript uses strict Astro settings; prefer explicit types for shared interfaces. Use PascalCase component filenames, camelCase functions, and descriptive lowercase, hyphen-separated article slugs. Prefer configured import aliases such as `@components/`, `@layouts/`, and `@scripts/`.

## Testing Guidelines

No automated test framework, test naming convention, or coverage threshold is configured. Run `npm run build` and `npm run check-fmt` before submitting changes. Check affected routes locally, including responsive layouts, article images, math, and diagrams when relevant. Confirm draft articles remain excluded from listings and RSS.

## Commit & Pull Request Guidelines

Recent commits use prefixes such as `feat:` and `chore:` with short, imperative descriptions. Follow that pattern and keep changes focused. Pull requests should describe the change, link relevant issues, report validation performed, and include screenshots for visual changes.

## Configuration & Licensing

GitHub activities optionally use `GITHUB_TOKEN`; keep credentials out of commits and client-side code. Preserve the licensing distinction: source code uses MIT, while articles and page content use CC BY 4.0.
