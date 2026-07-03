// Builds the URL for a public API endpoint.
//
// When NEXT_PUBLIC_API_BASE_URL is set, requests go to the external backend
// (e.g. https://api.yourdomain.com). When it's empty/unset, the path stays
// relative so the built-in Next.js routes under /app/api/public keep working.
//
// NOTE: NEXT_PUBLIC_ vars are inlined at build time, so changing this value
// requires a rebuild/redeploy, not just a restart.
export function apiUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
