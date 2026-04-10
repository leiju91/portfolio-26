import type { Project } from "./types";
import { projectsFr } from "./fr";
import { projectsEn } from "./en";

export type { ProjectCategory, ProjectCoverImage, Project } from "./types";

export function getProjects(locale: string): Project[] {
  return locale === "en" ? projectsEn : projectsFr;
}

/** French copy — useful for scripts or the chatbot knowledge base. */
export const projects = projectsFr;
