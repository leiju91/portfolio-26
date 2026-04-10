import type { Project } from "./types";

export const projectsFr: Project[] = [
  {
    id: "p1",
    title: "Featured concept",
    summary:
      "Tuile mise en avant — image hero et lien case study à brancher.",
    date: "2025-02-12",
    description:
      "Prototype d’une page détail e-commerce avec hiérarchie typographique sobre et CTA mis en relief. Les espacements suivent une grille 8px ; les couleurs reprennent la palette de la marque. Prochaine étape : intégration au CMS et tests d’accessibilité (contraste, focus).",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p1/960/1200",
      alt: "Aperçu visuel du projet Featured concept",
    },
    categories: ["code", "design"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    colSpan: 2,
    rowSpan: 2,
    placeholderClass:
      "from-emerald-400/40 via-cyan-400/28 to-fuchsia-400/32",
  },
  {
    id: "p2",
    title: "UI experiment",
    summary: "Carte compacte — placeholder.",
    date: "2024-11-03",
    description:
      "Exploration de composants (cartes, tags, micro-interactions) pour un tableau de bord. L’objectif était de valider une direction visuelle avant développement. Figma + variantes de densité (comfortable / compact).",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p2/960/1200",
      alt: "Aperçu du projet UI experiment",
    },
    categories: ["design"],
    technologies: ["Figma", "CSS", "Design tokens"],
    colSpan: 1,
    rowSpan: 1,
    placeholderClass: "from-cyan-400/35 to-emerald-400/22",
  },
  {
    id: "p3",
    title: "Landing draft",
    summary: "Bloc court pour une landing.",
    date: "2025-01-20",
    description:
      "Ébauche de landing one-page : section hero avec preuve sociale, grille de fonctionnalités et formulaire court. Le texte est indicatif ; les visuels proviendront du design system.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p3/960/1200",
      alt: "Aperçu du projet Landing draft",
    },
    categories: ["code"],
    technologies: ["HTML", "CSS", "React"],
    colSpan: 1,
    rowSpan: 1,
    placeholderClass: "from-fuchsia-400/32 to-cyan-400/18",
  },
  {
    id: "p4",
    title: "Wide showcase",
    summary: "Format horizontal — idéal pour mockups larges.",
    date: "2024-09-15",
    description:
      "Présentation d’un module “feature row” pensée pour des screenshots produit en 16:9. Typographie grande pour le titre, paragraphe court et lien “En savoir plus”. Compatible responsive (stack sur mobile).",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p4/1200/800",
      alt: "Aperçu du projet Wide showcase",
    },
    categories: ["code"],
    technologies: ["HTML", "CSS", "JavaScript"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass: "from-emerald-400/30 via-fuchsia-400/22 to-cyan-400/25",
  },
  {
    id: "p5",
    title: "Tooling / stack",
    summary: "Tuile haute — logos ou stack technique.",
    date: "2024-12-01",
    description:
      "Synthèse des outils utilisés sur le projet (Next.js, design tokens, CI). Cette fiche sert de référence pour l’équipe : versions, liens de doc et conventions de commit.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p5/800/1400",
      alt: "Aperçu du projet Tooling / stack",
    },
    categories: ["code", "design"],
    technologies: ["Next.js", "React", "TypeScript", "Git", "ESLint"],
    colSpan: 1,
    rowSpan: 2,
    placeholderClass: "from-cyan-400/38 to-fuchsia-400/24",
  },
  {
    id: "p6",
    title: "Side project",
    summary: "Cellule standard.",
    date: "2025-03-02",
    description:
      "Petit side project orienté apprentissage : composants réutilisables, thème sombre par défaut et documentation minimaliste dans le dépôt.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p6/960/1200",
      alt: "Aperçu du projet Side project",
    },
    categories: ["design"],
    technologies: ["React", "CSS", "Framer Motion"],
    colSpan: 1,
    rowSpan: 1,
    placeholderClass: "from-fuchsia-400/28 to-emerald-400/20",
  },
  {
    id: "p7",
    title: "Full-bleed idea",
    summary: "Bandeau large sur la grille.",
    date: "2024-10-28",
    description:
      "Concept de section pleine largeur avec image immersive et texte en deux colonnes sur desktop. Sur tablette et mobile, le flux passe en une colonne avec image en premier.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p7/1200/720",
      alt: "Aperçu du projet Full-bleed idea",
    },
    categories: ["design"],
    technologies: ["HTML", "CSS", "Responsive"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass:
      "from-emerald-400/32 via-cyan-400/26 to-fuchsia-400/28",
  },
];
