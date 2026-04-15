/**
 * Profile shown on the home page (badge under the title).
 * Edit these values here — no .env required.
 */
function parseOpenToWork(rawValue: string | undefined): boolean {
  if (!rawValue) {
    return true;
  }

  const normalized = rawValue.trim().toLowerCase();
  if (["false", "0", "off", "no"].includes(normalized)) {
    return false;
  }
  if (["true", "1", "on", "yes"].includes(normalized)) {
    return true;
  }

  return true;
}

export const homeProfile = {
  /** `null` = show initials only. Otherwise absolute URL or `/file` path in `public/`. */
  avatarSrc: "/avatar.webp" as string | null,
  name: "Julie Lacresse",
  /**
   * Drives the navbar availability badge and the avatar status dot (green vs red).
   * Controlled by NEXT_PUBLIC_OPEN_TO_WORK (`true` / `false`) in `.env.local`.
   * Defaults to `true` if unset or invalid.
   */
  openToWork: parseOpenToWork(process.env.NEXT_PUBLIC_OPEN_TO_WORK),
};
