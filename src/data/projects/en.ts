import type { Project } from "./types";

export const projectsEn: Project[] = [
  {
    id: "p1",
    title: "idemaquapro",
    summary:
      "One-page HTML/CSS website with a contact form.",
    date: "2025-11-01",
    description:
      "One-page front-end project for idemaquapro built with HTML/CSS and a contact form. The goal was a clear, fast, and maintainable website.",
    coverImage: {
      src: "/projects/code/idemaquapro-website.webp",
      alt: "Screenshot of the idemaquapro one-page website",
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
    summary: "React app connected to The Movie Database API.",
    date: "2026-04-14",
    description:
      "React application that calls The Movie Database API to display movies, search titles, and view details. The UI is built with Tailwind CSS and shadcn/ui components for a clean and modern experience.",
    coverImage: {
      src: "/projects/code/movies.webp",
      alt: "Movie Explorer project interface displaying movie cards",
    },
    categories: ["code"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "TMDB API"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass: "from-sky-400/35 via-indigo-400/28 to-violet-400/30",
  },
  {
    id: "p3",
    title: "Tippex Advertising Poster (A3)",
    summary: "A3 print advertising poster designed for Tippex.",
    date: "2016-06-01",
    description:
      "Design of an A3 advertising poster for the Tippex brand. The visual highlights the product with a clear composition, strong typographic hierarchy, and impactful messaging while meeting print-production and distance-readability constraints.",
    coverImage: {
      src: "/projects/prints/mariage-tippex.webp",
      alt: "A3 advertising poster created for the Tippex brand",
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
    summary: "Printed materials for a wellness practice.",
    date: "2025-02-06",
    description:
      "Creation of printed assets for a Reiki practitioner: service flyer, appointment card, and local communication variants. The design work emphasizes calm visual tone, clear hierarchy, and production-ready files.",
    coverImage: {
      src: "/projects/prints/reiki.webp",
      alt: "Print design for the Reiki project",
    },
    categories: ["design"],
    technologies: ["Photoshop", "InDesign", "Print design"],
    colSpan: 1,
    rowSpan: 1,
    placeholderClass: "from-fuchsia-400/28 to-emerald-400/20",
  },
];
