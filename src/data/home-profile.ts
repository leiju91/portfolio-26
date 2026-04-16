export type AvailabilityStatus = "available" | "unavailable" | "training";

function parseAvailabilityStatus(rawValue: string | undefined): AvailabilityStatus {
  const normalized = rawValue?.trim().toLowerCase();
  if (!normalized) {
    return "available";
  }

  if (["available", "open", "true", "1", "on", "yes"].includes(normalized)) {
    return "available";
  }
  if (["unavailable", "closed", "false", "0", "off", "no"].includes(normalized)) {
    return "unavailable";
  }
  if (["training", "formation", "learning", "in-training"].includes(normalized)) {
    return "training";
  }

  return "available";
}

export const homeProfile = {
  /** `null` = show initials only. Otherwise absolute URL or `/file` path in `public/`. */
  avatarSrc: "/avatar.webp" as string | null,
  name: "Julie Lacresse",
  /**
   * Controls availability UI state.
   * Use NEXT_PUBLIC_AVAILABILITY_STATUS in `.env.local`:
   * - available | unavailable | training
   *
   * Backward-compatible with NEXT_PUBLIC_OPEN_TO_WORK (true/false).
   * Defaults to `available`.
   */
  availabilityStatus: parseAvailabilityStatus(
    process.env.NEXT_PUBLIC_AVAILABILITY_STATUS ?? process.env.NEXT_PUBLIC_OPEN_TO_WORK
  ) as AvailabilityStatus,
};
