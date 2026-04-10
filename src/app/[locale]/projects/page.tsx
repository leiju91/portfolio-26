import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectsBentoGallery } from "@/components/projects/ProjectsBentoGallery";
import { getProjects } from "@/data/projects";

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
    <main className="flex flex-1 flex-col px-6 pb-16 pt-28">
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="sr-only">{t("headingSr")}</h1>
        <p className="text-sm text-white/55 sm:text-base">{t("intro")}</p>
      </header>
      <div className="mx-auto max-w-5xl">
        <ProjectsBentoGallery items={projects} />
      </div>
    </main>
  );
}
