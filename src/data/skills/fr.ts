import type { SkillsBundle } from "./types";

export const skillsFr: SkillsBundle = {
  workExperience: [
    {
      id: "we-1",
      period: "Juin 2021 — Mai 2026",
      title: "Digital Coach",
      organization: "Nvision",
      location: "Luxembourg",
      contractType: "CDI",
      summary:
        "Développement web, assistance client, création et gestion de newsletters.",
      skills: [
        "Intégration web",
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
      period: "Septembre 2020 — Février 2021",
      title: "Web Developer",
      organization: "Banque Internationale à Luxembourg",
      location: "Luxembourg",
      contractType: "Stage",
      summary:
        "Création de modules web et participation à la mise en place de composants front.",
      skills: ["PHP", "SQL", "HTML", "CSS", "JavaScript", "AJAX", "Git"],
    },
  ],
  education: [
    {
      id: "ed-1",
      period: "Février 2020 — Mai 2020",
      title: "Développeur Web (490 heures)",
      organization: "NumericALL",
      location: "Esch-sur-Alzette, Luxembourg",
      level: "Formation professionnelle Bac+2",
      summary:
        "Formation intensive orientée intégration web et fondamentaux du développement.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "SQL",
        "Intégration web",
        "WordPress",
      ],
    },
    {
      id: "ed-2",
      period: "2014 — 2016",
      title:
        "BTS Design Graphique option Communication et Médias Imprimés",
      organization: "Lycée Le Corbusier",
      location: "Illkirch-Graffenstaden",
      level: "Bac+2",
      summary:
        "Formation intensive axée sur la maîtrise de la chaîne graphique, de la conception identitaire à la réalisation technique pour l'édition.",
      content: [
        "Apprentissage des fondamentaux de la communication visuelle et de la sémiologie.",
        "Conception d'identités visuelles complètes : de la recherche de concept à la création de logotypes et chartes graphiques.",
        "Maîtrise des contraintes techniques d'impression (pré-presse, gestion des couleurs, façonnage).",
        "Élaboration de supports d'édition complexes (magazines, affiches, packagings) avec une exigence typographique forte.",
        "Gestion de projets créatifs en autonomie et en équipe, de la prise de brief à la présentation orale.",
      ],
      skills: [
        "Suite Adobe (Photoshop, Illustrator, InDesign)",
        "Mise en page",
        "Règles typographiques",
        "Retouche d'images",
        "Logotype",
        "Chaîne graphique",
      ],
    },
    {
      id: "ed-3",
      period: "2013",
      title: "L1 Information et Communication",
      organization: "Université de Lorraine",
      location: "Nancy",
      level: "Bac+1",
      summary:
        "Introduction aux sciences de l'information et aux enjeux de la communication digitale et médiatique.",
      content: [
        "Étude des théories de la communication et analyse des comportements des usagers face aux médias.",
        "Analyse critique de l'information et décryptage des stratégies de communication institutionnelle.",
        "Appréhension des enjeux sociétaux de la culture numérique et de l'évolution des supports web.",
        "Développement de capacités rédactionnelles et de synthèse pour différents publics.",
      ],
      skills: [
        "Communication",
        "Culture numérique",
        "Analyse des médias",
        "Sémiologie",
        "Veille informationnelle",
        "Rédaction",
      ],
    },
    {
      id: "ed-4",
      period: "2010 — 2013",
      title:
        "Bac Pro AMA (Artisanat et Métiers d'Art) option Communication Graphique",
      organization: "Lycée St Vincent de Paul",
      location: "Algrange",
      level: "Baccalauréat professionnel",
      summary:
        "Formation de base aux métiers de la chaîne graphique, combinant pratique artistique traditionnelle et apprentissage des outils numériques.",
      content: [
        "Apprentissage des bases du dessin académique, de la composition et de la théorie des couleurs.",
        "Initiation à la PAO et maîtrise des logiciels fondamentaux pour la création de supports de communication.",
        "Étude de l'histoire de l'art et des courants graphiques pour nourrir la réflexion créative.",
        "Sensibilisation aux contraintes de production et de gestion de projet (devis, coûts, délais).",
        "Réalisation de stages en entreprise pour une première immersion dans le monde professionnel des industries graphiques.",
      ],
      skills: [
        "Graphisme",
        "Technique d'impression",
        "Mise en page",
        "PAO",
        "Histoire de l'art",
        "Dessin",
        "Économie & Gestion",
        "Processus créatif",
      ],
    },
  ],
  languageSkills: [
    { id: "lang-fr", name: "Français", level: "Courant" },
    { id: "lang-en", name: "Anglais", level: "C1" },
    { id: "lang-it", name: "Italien", level: "B2" },
  ],
  hobbies: [
    "Photographie",
    "Guitare",
    "Ski",
    "Tennis de table",
    "Basket-ball",
    "Marche & nature",
    "Voyage",
    "Lecture",
    "Jeux vidéo",
  ],
  chatbotCareerContext: {
    whatSheWants:
      "Poursuivre dans le développement web front-end et l'intégration (React, Next.js), sur des projets qui allient exigence visuelle et technique.",
    whereSheWantsToWork:
      "Ouverte aux opportunités au Luxembourg, en Grande Région (dont frontalier depuis la Lorraine) ou en télétravail / hybride selon le rythme d'équipe.",
  },
};
