import type { SkillsBundle } from "./types";

export const skillsEn: SkillsBundle = {
  workExperience: [
    {
      id: "we-1",
      period: "June 2021 — present",
      title: "Digital Coach",
      organization: "Nvision",
      location: "Luxembourg",
      contractType: "Permanent (CDI)",
      summary:
        "Web development, customer support, creating and managing newsletters.",
      skills: [
        "Web integration",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Next.js",
        "Drupal",
        "WordPress",
        "Customer support",
        "Email marketing",
        "Git",
      ],
    },
    {
      id: "we-2",
      period: "September 2020 — February 2021",
      title: "Web Developer",
      organization: "Banque Internationale à Luxembourg",
      location: "Luxembourg",
      contractType: "Internship",
      summary:
        "Built web modules and helped roll out front-end components.",
      skills: ["PHP", "SQL", "HTML", "CSS", "JavaScript", "AJAX", "Git"],
    },
  ],
  education: [
    {
      id: "ed-1",
      period: "February 2020 — May 2020",
      title: "Web Developer (490 hours)",
      organization: "NumericALL",
      location: "Esch-sur-Alzette, Luxembourg",
      level: "Vocational training (France Bac+2 level)",
      summary:
        "Intensive program focused on web integration and development fundamentals.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "SQL",
        "Web integration",
        "WordPress",
      ],
    },
    {
      id: "ed-2",
      period: "2014 — 2016",
      title:
        "BTS Graphic Design — Printed Communication & Media (French technical degree)",
      organization: "Lycée Le Corbusier",
      location: "Illkirch-Graffenstaden",
      level: "Bac+2",
      summary:
        "In-depth training on the graphic production chain, from identity design to editorial execution.",
      content: [
        "Foundations of visual communication and semiotics.",
        "Full visual identities: concept research, logotypes, and brand guidelines.",
        "Print constraints (prepress, color management, finishing).",
        "Complex editorial pieces (magazines, posters, packaging) with strong typography.",
        "Creative projects solo and in teams—from brief to presentation.",
      ],
      skills: [
        "Adobe CC (Photoshop, Illustrator, InDesign)",
        "Layout",
        "Typography rules",
        "Image retouching",
        "Logotype design",
        "Graphic production chain",
      ],
    },
    {
      id: "ed-3",
      period: "2013",
      title: "Year 1 — Information & Communication",
      organization: "Université de Lorraine",
      location: "Nancy",
      level: "Bac+1",
      summary:
        "Introduction to information sciences and digital/media communication issues.",
      content: [
        "Communication theory and how audiences relate to media.",
        "Critical reading of news and institutional communication strategies.",
        "Digital culture and how channels evolve online.",
        "Writing and summarizing for different audiences.",
      ],
      skills: [
        "Communication",
        "Digital culture",
        "Media analysis",
        "Semiotics",
        "News monitoring",
        "Writing",
      ],
    },
    {
      id: "ed-4",
      period: "2010 — 2013",
      title:
        "French vocational baccalaureate — Graphic Communication (AMA pathway)",
      organization: "Lycée St Vincent de Paul",
      location: "Algrange",
      level: "Vocational high-school diploma",
      summary:
        "Core training in the graphic chain, mixing traditional art practice with digital tools.",
      content: [
        "Academic drawing basics, composition, and color theory.",
        "Desktop publishing fundamentals and key software for marketing assets.",
        "Art history and design movements to feed creative thinking.",
        "Production constraints and light project management (quotes, costs, deadlines).",
        "Work placements for a first look at the graphic industries.",
      ],
      skills: [
        "Graphic design",
        "Print production",
        "Layout",
        "DTP",
        "Art history",
        "Drawing",
        "Business & management basics",
        "Creative process",
      ],
    },
  ],
  languageSkills: [
    { id: "lang-fr", name: "French", level: "Native" },
    { id: "lang-en", name: "English", level: "C1" },
    { id: "lang-it", name: "Italian", level: "B2" },
  ],
  hobbies: [
    "Photography",
    "Guitar",
    "Skiing",
    "Table tennis",
    "Basketball",
    "Walking & nature",
    "Travel",
    "Reading",
    "Video games",
  ],
  chatbotCareerContext: {
    whatSheWants:
      "Keep growing in front-end development and integration (React, Next.js) on projects that blend visual craft and solid engineering.",
    whereSheWantsToWork:
      "Open to roles in Luxembourg, the Greater Region (including cross-border from Lorraine), or remote/hybrid depending on the team.",
  },
};
