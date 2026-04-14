import type { Project } from "./types";

export const projectsEn: Project[] = [
  {
    id: "p1",
    title: "Olivier Minaire",
    summary: "One-page showcase website built with HTML/CSS, Builder, and Gulp.",
    date: "2026-04-14",
    description:
      "One-page website project created for Olivier Minaire using an HTML/CSS foundation. The front-end workflow relies on Builder and Gulp to organize assets, optimize files, and speed up production.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-olivier-minaire/1200/900",
      alt: "Temporary preview of the Olivier Minaire project",
    },
    categories: ["code"],
    technologies: ["HTML", "CSS", "Builder", "Gulp"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass:
      "from-emerald-400/40 via-cyan-400/28 to-fuchsia-400/32",
  },
  {
    id: "p2",
    title: "idemaquapro",
    summary:
      "One-page HTML/CSS website with contact form sending via PHPMailer.",
    date: "2026-04-14",
    description:
      "One-page front-end project for idemaquapro built with HTML/CSS and a contact form integrated with PHPMailer. The goal was a clear, fast, and maintainable website.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-idemaquapro/1200/900",
      alt: "Temporary preview of the idemaquapro project",
    },
    categories: ["code"],
    technologies: ["HTML", "CSS", "PHPMailer"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass: "from-cyan-400/35 via-emerald-400/24 to-sky-400/30",
  },
  {
    id: "p3",
    title: "Movie Explorer (TMDB)",
    summary:
      "React app connected to The Movie Database API (temporary image).",
    date: "2026-04-14",
    description:
      "React application that calls The Movie Database API to display movies, search titles, and view details. The UI is built with Tailwind CSS and shadcn/ui components for a clean and modern experience. The final project image will be added later.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p8/1200/900",
      alt: "Temporary preview for the Movie Explorer project (final image coming soon)",
    },
    categories: ["code"],
    technologies: ["React", "Tailwind CSS", "shadcn/ui", "TMDB API"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass: "from-sky-400/35 via-indigo-400/28 to-violet-400/30",
  },
  {
    id: "p4",
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
    technologies: ["Illustrator", "InDesign", "Print design"],
    colSpan: 1,
    rowSpan: 1,
    placeholderClass: "from-cyan-400/35 to-emerald-400/22",
  },
  {
    id: "p5",
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
