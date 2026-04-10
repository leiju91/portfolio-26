import type { SkillsBundle } from "./types";
import { skillsFr } from "./fr";
import { skillsEn } from "./en";

export type {
  SkillsTimelineEntry,
  LanguageSkill,
  ChatbotCareerContext,
  SkillsBundle,
} from "./types";

const bundles: Record<"fr" | "en", SkillsBundle> = {
  fr: skillsFr,
  en: skillsEn,
};

export function getSkillsBundle(locale: string): SkillsBundle {
  return locale === "en" ? bundles.en : bundles.fr;
}
