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
    title: "UI experiment",
    summary: "Compact card — placeholder.",
    date: "2024-11-03",
    description:
      "Component exploration (cards, tags, micro-interactions) for a dashboard. Goal: validate a visual direction before build-out. Figma + comfortable/compact density variants.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p2/960/1200",
      alt: "Preview of the UI experiment project",
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
    title: "Side project",
    summary: "Standard cell.",
    date: "2025-03-02",
    description:
      "Small learning-focused side project: reusable components, dark theme by default, and lightweight documentation in the repo.",
    coverImage: {
      src: "https://picsum.photos/seed/portfolio-p6/960/1200",
      alt: "Preview of the Side project",
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
