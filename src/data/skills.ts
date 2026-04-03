/**
 * Parcours pro et formations pour la page Skills.
 * Modifie les entrées ici — pas besoin de .env.
 */
export type SkillsTimelineEntry = {
  id: string;
  /** Ex. "2023 — présent" ou "2021 — 2023" */
  period: string;
  title: string;
  organization: string;
  location?: string;
  /** Une ou deux phrases optionnelles */
  summary?: string;
  /** Compétences mises en avant pour ce poste / cursus */
  skills: string[];
};

export const workExperience: SkillsTimelineEntry[] = [
  {
    id: "we-1",
    period: "2023 — présent",
    title: "Développeuse front-end",
    organization: "Agence / entreprise",
    location: "Luxembourg · hybride",
    summary:
      "Mise en page, intégration et évolutions sur des sites et produits web, avec une attention à l’accessibilité et aux performances.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Drupal",
      "WordPress",
      "Accessibilité (a11y)",
      "Figma → HTML/CSS",
      "Git",
    ],
  },
  {
    id: "we-2",
    period: "2021 — 2023",
    title: "Intégratrice web",
    organization: "Structure précédente",
    location: "Moselle · distanciel",
    summary:
      "Templates, thèmes et modules front ; collaboration design / équipe projet.",
    skills: ["HTML/CSS", "JavaScript", "Sass", "Drupal", "Responsive", "SEO de base"],
  },
];

export const education: SkillsTimelineEntry[] = [
  {
    id: "ed-1",
    period: "2024 — 2026",
    title: "Formation développement web front-end",
    organization: "Centre de formation",
    location: "France",
    summary:
      "Conception d’interfaces, frameworks modernes, bonnes pratiques et outils du quotidien.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Accessibilité",
      "UI/UX appliquée",
      "Méthodes agiles",
    ],
  },
  {
    id: "ed-2",
    period: "Avant 2024",
    title: "Parcours précédent / autodidaxie",
    organization: "—",
    skills: ["HTML/CSS", "JavaScript", "Veille technique", "CMS"],
  },
];
