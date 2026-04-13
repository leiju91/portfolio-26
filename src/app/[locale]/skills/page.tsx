import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SkillsBoard } from "@/components/skills/SkillsBoard";
import { getSkillsBundle } from "@/data/skills";
import { localizedAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "skillsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/skills`,
      languages: localizedAlternates("/skills"),
    },
  };
}

export default async function SkillsPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const {
    workExperience,
    education,
    languageSkills,
    hobbies,
  } = getSkillsBundle(locale);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col px-6 pb-8 pt-28"
    >
      <SkillsBoard
        workExperience={workExperience}
        education={education}
        languages={languageSkills}
        hobbies={hobbies}
      />
    </main>
  );
}
