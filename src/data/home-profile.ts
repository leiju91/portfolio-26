/**
 * Profile shown on the home page (badge under the title).
 * Edit these values here — no .env required.
 */
export const homeProfile = {
  /** `null` = show initials only. Otherwise absolute URL or `/file` path in `public/`. */
  avatarSrc: "/avatar.webp" as string | null,
  name: "Julie Lacresse",
  title: "Creative Web Developer | Design & Code 💻🎨",
  /**
   * Drives the navbar availability badge and the avatar status dot (green vs red).
   * Set to `false` when you are not open to work.
   */
  openToWork: true,
};
