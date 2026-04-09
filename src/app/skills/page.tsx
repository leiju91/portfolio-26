import type { Metadata } from "next";

import { SkillsBoard } from "@/components/skills/SkillsBoard";
import { education, hobbies, languageSkills, workExperience } from "@/data/skills";

export const metadata: Metadata = {
  title: "Compétences · Portfolio Julie",
  description:
    "Parcours professionnel et formations, avec les compétences acquises à chaque étape.",
};

export default function SkillsPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pb-8 pt-28">
      <SkillsBoard
        workExperience={workExperience}
        education={education}
        languages={languageSkills}
        hobbies={hobbies}
      />
    </main>
  );
}
