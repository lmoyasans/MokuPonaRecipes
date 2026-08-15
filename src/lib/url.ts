/**
 * Prefixes a root-relative path with the site's base path (astro.config.mjs `base`),
 * so internal links and asset references still work when the site is served from a
 * subpath (e.g. lmoyasans.github.io/MokuPonaRecipes/) instead of a domain root.
 */
export function withBase(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path; // leave absolute URLs (https:, mailto:, ...) untouched
  const base = import.meta.env.BASE_URL || '/';
  return (base.replace(/\/$/, '') + '/' + path.replace(/^\//, '')).replace(/\/{2,}/g, '/');
}
