import type { Project } from "./types";

export const projectsFr: Project[] = [
  {
    id: "p1",
    title: "idemaquapro",
    summary:
      "Site web one page en HTML/CSS avec formulaire de contact.",
    date: "2025-11-01",
    description:
      "Projet front-end one page pour idemaquapro en HTML/CSS avec integration d'un formulaire de contact. Le but etait de proposer un site clair, rapide et facilement administrable.",
    coverImage: {
      src: "/projects/code/idemaquapro-website.webp",
      alt: "Capture du site one page idemaquapro",
    },
    categories: ["code"],
    technologies: ["HTML", "CSS"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass: "from-cyan-400/35 via-emerald-400/24 to-sky-400/30",
  },
  {
    id: "p2",
    title: "Movie Explorer (TMDB)",
    summary: "Application React connectee a The Movie Database API.",
    date: "2026-04-14",
    description:
      "Application React qui interroge l'API The Movie Database pour afficher des films, rechercher des titres et consulter des details. L'interface est construite avec Tailwind CSS et des composants shadcn/ui pour un rendu moderne et coherent.",
    coverImage: {
      src: "/projects/code/movies.webp",
      alt: "Interface du projet Movie Explorer avec une grille de films",
    },
    categories: ["code"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "TMDB API"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass: "from-sky-400/35 via-indigo-400/28 to-violet-400/30",
  },
  {
    id: "p3",
    title: "Affiche publicitaire Tippex (A3)",
    summary: "Affiche print A3 concue pour la marque Tippex.",
    date: "2016-06-01",
    description:
      "Conception d'une affiche publicitaire au format A3 pour la marque Tippex. Le visuel met en avant le produit avec une composition claire, une hierarchie typographique forte et un message impactant, tout en respectant les contraintes d'impression et de lisibilite a distance.",
    coverImage: {
      src: "/projects/prints/mariage-tippex.webp",
      alt: "Affiche publicitaire A3 realisee pour la marque Tippex",
    },
    categories: ["design"],
    technologies: ["Photoshop", "InDesign", "Print design"],
    colSpan: 1,
    rowSpan: 1,
    placeholderClass: "from-cyan-400/35 to-emerald-400/22",
  },
  {
    id: "p4",
    title: "Reiki",
    summary: "Supports print pour une activite bien-etre.",
    date: "2025-02-06",
    description:
      "Realisation de visuels imprimes pour une praticienne Reiki : flyer de presentation, carte de rendez-vous et declinaisons de communication locale. Le travail met l'accent sur une ambiance douce, une lisibilite immediate et des formats prets a l'impression.",
    coverImage: {
      src: "/projects/prints/reiki.webp",
      alt: "Creation print pour le projet Reiki",
    },
    categories: ["design"],
    technologies: ["Photoshop", "InDesign", "Print design"],
    colSpan: 1,
    rowSpan: 1,
    placeholderClass: "from-fuchsia-400/28 to-emerald-400/20",
  },
];
