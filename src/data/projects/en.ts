import type { Project } from "./types";

export const projectsEn: Project[] = [
  {
    id: "p1",
    title: "Featured concept",
    summary: "Highlighted tile — hero visual and case-study link to wire up.",
    date: "2025-02-12",
    description:
      "Prototype of an e-commerce detail page with restrained typography and a prominent CTA. Spacing follows an 8px grid; colors match the brand palette. Next steps: CMS integration and accessibility checks (contrast, focus).",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p1/960/1200",
      alt: "Preview of the Featured concept project",
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
    id: "p3",
    title: "Landing draft",
    summary: "Short block for a landing page.",
    date: "2025-01-20",
    description:
      "One-page landing sketch: hero with social proof, feature grid, and a short form. Copy is indicative; visuals will come from the design system.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p3/960/1200",
      alt: "Preview of the Landing draft project",
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
    summary: "Horizontal format — great for wide mocks.",
    date: "2024-09-15",
    description:
      "A “feature row” module meant for 16:9 product screenshots. Large title type, short paragraph, and a “Learn more” link. Responsive: stacks on small screens.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p4/1200/800",
      alt: "Preview of the Wide showcase project",
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
    summary: "Tall tile — logos or technical stack.",
    date: "2024-12-01",
    description:
      "Snapshot of project tooling (Next.js, design tokens, CI). A team reference for versions, doc links, and commit conventions.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p5/800/1400",
      alt: "Preview of the Tooling / stack project",
    },
    categories: ["code", "design"],
    technologies: ["Next.js", "React", "TypeScript", "Git", "ESLint"],
    colSpan: 1,
    rowSpan: 2,
    placeholderClass: "from-cyan-400/38 to-fuchsia-400/24",
  },
  {
    id: "p6",
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
  {
    id: "p7",
    title: "Full-bleed idea",
    summary: "Full-width band on the grid.",
    date: "2024-10-28",
    description:
      "Full-bleed section concept with an immersive image and two text columns on desktop. On tablet/mobile it becomes a single column with the image first.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p7/1200/720",
      alt: "Preview of the Full-bleed idea project",
    },
    categories: ["design"],
    technologies: ["HTML", "CSS", "Responsive"],
    colSpan: 2,
    rowSpan: 1,
    placeholderClass:
      "from-emerald-400/32 via-cyan-400/26 to-fuchsia-400/28",
  },
];
