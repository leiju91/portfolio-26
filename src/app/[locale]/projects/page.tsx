import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectsBentoGallery } from "@/components/projects/ProjectsBentoGallery";
import { getProjects } from "@/data/projects";

import { ProjectsScrollLock } from "./ProjectsScrollLock";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function ProjectsPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const projects = getProjects(locale);

  return (
    <ProjectsScrollLock>
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-6 pt-28">
        <h1 className="sr-only">{t("headingSr")}</h1>
        <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
          <ProjectsBentoGallery items={projects} />
        </div>
      </main>
    </ProjectsScrollLock>
  );
}
