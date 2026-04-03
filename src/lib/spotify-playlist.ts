/**
 * Public playlist utilisée tant que `.env.local` ne définit pas la tienne.
 * Remplace via `NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID` ou `NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL`.
 */
const FALLBACK_PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M";

/** Copier-coller d’un `.env` peut inclure des guillemets parasites sur la valeur. */
function envPlaylistId(raw: string | undefined): string {
  return (raw ?? "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .trim();
}

function buildEmbedSrc(playlistId: string) {
  return `https://open.spotify.com/embed/playlist/${encodeURIComponent(playlistId)}?utm_source=generator&theme=0`;
}

/** `true` si une playlist personnalisée est configurée dans l’environnement. */
export function isSpotifyPlaylistConfigured(): boolean {
  const id = envPlaylistId(process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID);
  if (id) return true;
  const url = envPlaylistId(process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL);
  return Boolean(url.match(/playlist\/([a-zA-Z0-9]+)/));
}

/**
 * URL d’embed Spotify — toujours définie (fallback public si pas de `.env`).
 */
export function getSpotifyPlaylistEmbedSrc(): string {
  const id = envPlaylistId(process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID);
  if (id) {
    return buildEmbedSrc(id);
  }
  const url = envPlaylistId(process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL);
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  if (match?.[1]) {
    return buildEmbedSrc(match[1]);
  }
  return buildEmbedSrc(FALLBACK_PLAYLIST_ID);
}
