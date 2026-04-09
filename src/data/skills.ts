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
  /** Ex. "CDI", "Stage", "Alternance" */
  contractType?: string;
  /** Ex. "Bac+2", "L1", "Formation certifiante" */
  level?: string;
  /** Une ou deux phrases optionnelles */
  summary?: string;
  /** Compétences mises en avant pour ce poste / cursus */
  skills: string[];
};

export type LanguageSkill = {
  id: string;
  name: string;
  level: string;
};

export const workExperience: SkillsTimelineEntry[] = [
  {
    id: "we-1",
    period: "Juin 2021 — aujourd'hui",
    title: "Digital Coach",
    organization: "Nvision",
    location: "Luxembourg",
    contractType: "CDI",
    summary:
      "Developpement web, assistance client, creation et gestion de newsletters.",
    skills: [
      "Integration web",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Drupal",
      "WordPress",
      "Support client",
      "Emailing",
      "Git",
    ],
  },
  {
    id: "we-2",
    period: "Septembre 2020 — Fevrier 2021",
    title: "Web Developer",
    organization: "Banque Internationale a Luxembourg",
    location: "Luxembourg",
    contractType: "Stage",
    summary:
      "Creation de modules web et participation a la mise en place de composants front.",
    skills: [
      "PHP",
      "SQL",
      "HTML",
      "CSS",
      "JavaScript",
      "AJAX",
      "Git",
    ],
  },
];

export const education: SkillsTimelineEntry[] = [
  {
    id: "ed-1",
    period: "Fevrier 2020 — Mai 2020",
    title: "Developpeur Web (490 heures)",
    organization: "NumericALL",
    location: "Esch-sur-Alzette, Luxembourg",
    level: "Formation professionnelle Bac+2",
    summary:
      "Formation intensive orientee integration web et fondamentaux du developpement.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "SQL",
      "Integration web",      
      "WordPress",
    ],
  },
  {
    id: "ed-2",
    period: "2014 — 2016",
    title: "BTS Design Graphique Print",
    organization: "Lycee Le Corbusier",
    location: "Illkirch-Graffenstaden",
    level: "Bac+2",
    skills: [
      "Suite Adobe (Photoshop, Illustrator, InDesign)",
      "Mise en page",
      "Regles typographiques",
      "Retouche d'images",
      "Logotype",
    ],
  },
  {
    id: "ed-3",
    period: "2013",
    title: "Licence Info-Com",
    organization: "Universite de Lorraine",
    location: "Nancy",
    level: "Bac+1",
    skills: ["Communication", "Culture numerique", "Analyse des medias"],
  },
  {
    id: "ed-4",
    period: "2010 — 2013",
    title: "Bac Pro AMA Communication Graphique",
    organization: "Lycee St V. de Paul",
    location: "Algrange",
    level: "Baccalaureat professionnel",
    skills: ["Graphisme", "Technique d'impression", "Mise en page", "PAO", "Histoire de l'art", "Dessin", "Economie & Gestion"],
  },
];

export const languageSkills: LanguageSkill[] = [
  { id: "lang-fr", name: "Francais", level: "Courant" },
  { id: "lang-en", name: "Anglais", level: "C1" },
  { id: "lang-it", name: "Italien", level: "B2" },
];

export const hobbies: string[] = [
  "Photographie",
  "Guitare",
  "Ski",
  "Tennis de table",
  "Basket-ball",
  "Marche & nature",
  "Voyage",
  "Lecture",
  "Jeux vidéos",
];
