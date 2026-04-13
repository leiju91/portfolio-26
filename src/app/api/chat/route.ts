import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "@/lib/chatbot-api";
import { getSkillsBundle } from "@/data/skills";
import { getProjects } from "@/data/projects";

const JULIE_BIRTHDATE = process.env.JULIE_BIRTHDATE ?? "";
const JULIE_ASTRO_SIGN = process.env.JULIE_ASTRO_SIGN ?? "";
const JULIE_ASCENDANT = process.env.JULIE_ASCENDANT ?? "";

const computeAge = (birthdateIso: string, now = new Date()): number | null => {
  if (!birthdateIso) return null;

  const birthDate = new Date(birthdateIso);
  if (Number.isNaN(birthDate.getTime())) return null;

  let age = now.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 0 ? age : null;
};

const getZodiacSign = (birthdateIso: string): string | null => {
  if (!birthdateIso) return null;
  const birthDate = new Date(birthdateIso);
  if (Number.isNaN(birthDate.getTime())) return null;

  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const mmdd = month * 100 + day;

  if ((mmdd >= 321 && mmdd <= 419)) return "Belier";
  if ((mmdd >= 420 && mmdd <= 520)) return "Taureau";
  if ((mmdd >= 521 && mmdd <= 620)) return "Gemeaux";
  if ((mmdd >= 621 && mmdd <= 722)) return "Cancer";
  if ((mmdd >= 723 && mmdd <= 822)) return "Lion";
  if ((mmdd >= 823 && mmdd <= 922)) return "Vierge";
  if ((mmdd >= 923 && mmdd <= 1022)) return "Balance";
  if ((mmdd >= 1023 && mmdd <= 1121)) return "Scorpion";
  if ((mmdd >= 1122 && mmdd <= 1221)) return "Sagittaire";
  if (mmdd >= 1222 || mmdd <= 119) return "Capricorne";
  if ((mmdd >= 120 && mmdd <= 218)) return "Verseau";
  if ((mmdd >= 219 && mmdd <= 320)) return "Poissons";

  return null;
};

const buildPersonalFacts = () => {
  const age = computeAge(JULIE_BIRTHDATE);
  const zodiacSign = JULIE_ASTRO_SIGN || getZodiacSign(JULIE_BIRTHDATE);

  const lines = [
    "Informations personnelles calculees:",
    JULIE_BIRTHDATE
      ? `- Date de naissance: ${JULIE_BIRTHDATE} (format ISO YYYY-MM-DD)`
      : "- Date de naissance: non renseignee",
    age !== null ? `- Age actuel de Julie: ${age} ans` : "- Age actuel de Julie: non disponible",
    zodiacSign ? `- Signe astrologique de Julie: ${zodiacSign}` : "- Signe astrologique: non renseigne",
    JULIE_ASCENDANT ? `- Ascendant de Julie: ${JULIE_ASCENDANT}` : "- Ascendant: non renseigne",
    "- Si on te demande l'age, utilise cet age calcule ci-dessus.",
    "- Si on te demande le signe astro ou l'ascendant, utilise uniquement les valeurs ci-dessus.",
  ];

  return lines.join("\n");
};

const CV_KNOWLEDGE_BASE = `
Julie Lacresse
- Email: julie.lacresse@gmail.com
- Localisation: Hagondange (57300), France

Profil
- Developpeuse web et graphiste print

Formations
- BTS Design Graphique Print (Lycee Le Corbusier, 2014-2016, Illkirch-Graffenstaden)
- Licence Info-Com L1 (Universite de Lorraine, 2013, Nancy)
- Bac Pro AMA Communication Graphique (Lycee St V. de Paul, 2010-2013, Algrange)
- Formation Developpeur Web, 490 hours (NumericAll, fev-mai 2020, Esch-sur-Alzette)

Experiences professionnelles
- NVISION (CDI), Digital Coach, Luxembourg, juin 2021 a aujourd'hui
  - Developpement web, assistance client, creation et gestion de newsletters
- Banque Internationale a Luxembourg (Stage), Web Developer, sept 2020 - fev 2021
  - Modules web: PHP, SQL, CSS, HTML, JS, Ajax
- Lidl (CDD), Employee libre-service, Terville, juil-sept 2019
- Waffle Factory (Apprentissage), employee restauration rapide, Thionville, 2017-2019
- AFTRAL (Stage), communication interne, mai-juil 2015
- Les Tablettes Lorraines (Stage), graphiste publicitaire, mai-juil 2012
- Billiote & Co (Stage), graphiste, oct-nov 2011

Competences
- Web: HTML/CSS, JavaScript, React, Next.js, CMS Drupal/WordPress
- Print/graphisme: Suite Adobe (Photoshop, Illustrator, InDesign), mise en page, typographie, retouche d'images, logotype

Langues
- Francais: courant
- Anglais: B1
- Italien: B2

(Loisirs et details a jour: uniquement dans le bloc dynamique du portfolio ci-dessous.)
`.trim();

const SYSTEM_PROMPT = `
Identite:
Tu es "Le Compagnon de Julie", une loutre de mer virtuelle, maligne et tres attachante.
Tu es l'assistant officiel du portfolio de Julie.

Base de connaissances:
Tu dois t'appuyer uniquement sur les faits presents dans la base suivante, issue du CV de Julie.
Ne reinvente jamais son parcours, ses competences ou son experience.

${CV_KNOWLEDGE_BASE}

Ton de voix:
- Sois professionnel, chaleureux et precis.
- Le style loutre/marin doit rester leger et discret (pas systematique).
- Evite les formulations trop enfantines ou theatrales.
- Limite les emojis a 0 ou 1 par reponse.

Style des reponses:
- Reponds dans la langue du message de l'utilisateur (francais ou anglais).
- Ecris comme dans une vraie conversation : phrases liees entre elles, pas d'enumeration seche du type "A, B, C, D." quand tu parles de passions ou de personnalite.
- Pour les hobbies ou centres d'interet : regroupe les themes (ex. creation, sport, detente, culture) et donne de la couleur en une ou deux phrases, sans recopier mot pour mot la liste du portfolio.
- Pour ce qu'elle cherche comme poste ou zone geographique : t'appuie uniquement sur le bloc "Envies professionnelles" de la base ; reformule avec tes mots, en restant fidele au sens.
- Tu peux utiliser quelques puces seulement pour les competences techniques ou le parcours date, si la question est "liste de stack" ou chronologie.
- Quand c'est pertinent, ajoute une mini ligne de credibilite en fin de reponse:
  "Source: portfolio de Julie (CV + donnees projets/competences)."
- Si la question concerne une info datable (experience, formation, techno), cite 1 ou 2 reperes concrets de la base (ex: entreprise/periode/projet), sans inventer.

Regles d'or:
- Si la question n'est pas couverte par la base de connaissances, reponds exactement:
"Ma petite moustache ne fretille pas sur ce sujet, je n'ai pas l'info ! Le mieux est de contacter Julie directement par email."
- Limite la longueur : un petit paragraphe ou deux courts paragraphes en general.
- Ne sors jamais de ton role de loutre.
`.trim();

const buildPortfolioKnowledgeBlock = (
  localeLabel: string,
  context: ReturnType<typeof getSkillsBundle>,
  projects: ReturnType<typeof getProjects>
) => {
  const careerWhat =
    context.chatbotCareerContext.whatSheWants ||
    "Non renseigne dans les donnees du portfolio.";
  const careerWhere =
    context.chatbotCareerContext.whereSheWantsToWork ||
    "Non renseigne dans les donnees du portfolio.";

  const experienceLines = context.workExperience.map(
    (entry) =>
      `- ${entry.period} | ${entry.title} @ ${entry.organization} (${entry.location ?? "N/A"})${
        entry.summary ? `: ${entry.summary}` : ""
      }`
  );

  const educationLines = context.education.map(
    (entry) =>
      `- ${entry.period} | ${entry.title} - ${entry.organization}${
        entry.location ? ` (${entry.location})` : ""
      }`
  );

  const languageLines = context.languageSkills.map(
    (language) => `- ${language.name}: ${language.level}`
  );

  const hobbyLines = context.hobbies.map((hobby) => `- ${hobby}`);

  const projectLines = projects.map(
    (project) =>
      `- ${project.title}: ${project.summary} | Tech: ${project.technologies.join(", ")}`
  );

  return `
[${localeLabel}]

Experiences:
${experienceLines.join("\n")}

Education:
${educationLines.join("\n")}

Languages:
${languageLines.join("\n")}

Hobbies (reference list — weave into prose, do not recite):
${hobbyLines.join("\n")}

Career preferences (Julie's wording — paraphrase naturally):
- Role / environment: ${careerWhat}
- Location / work mode: ${careerWhere}

Projects:
${projectLines.join("\n")}
`.trim();
};

const buildPortfolioKnowledgeBase = () => {
  const fr = getSkillsBundle("fr");
  const en = getSkillsBundle("en");
  const frProjects = getProjects("fr");
  const enProjects = getProjects("en");

  return `
Dynamic portfolio data (French + English; facts should agree across both):

${buildPortfolioKnowledgeBlock("FR", fr, frProjects)}

${buildPortfolioKnowledgeBlock("EN", en, enProjects)}
`.trim();
};

const buildSystemPrompt = () =>
  `${SYSTEM_PROMPT}

${buildPersonalFacts()}

${buildPortfolioKnowledgeBase()}`;

type Provider = "openai" | "gemini";

const maskApiKey = (key: string) => {
  if (key.length <= 8) return "[hidden]";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

const normalizeError = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return { message: String(error) };
  }

  const asRecord = error as Record<string, unknown>;
  const normalized: Record<string, unknown> = {
    name: asRecord.name,
    message: asRecord.message,
    stack: asRecord.stack,
  };

  for (const key of [
    "status",
    "statusText",
    "code",
    "details",
    "errorDetails",
    "response",
    "cause",
  ]) {
    if (asRecord[key] !== undefined) {
      normalized[key] = asRecord[key];
    }
  }

  return normalized;
};

const toChatHistory = (messages: ChatMessage[]) =>
  messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

const requestOpenAI = async (messages: ChatMessage[]) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const model = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.65,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...toChatHistory(messages),
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`OpenAI request failed: ${details}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
};

const requestOpenAIStream = async (
  messages: ChatMessage[],
  onDelta: (chunk: string) => void | Promise<void>
): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const model = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.65,
      stream: true,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...toChatHistory(messages),
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`OpenAI request failed: ${details}`);
  }

  if (!response.body) {
    throw new Error("OpenAI stream: empty body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") continue;
        try {
          const json = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const piece = json.choices?.[0]?.delta?.content;
          if (piece) {
            full += piece;
            await onDelta(piece);
          }
        } catch {
          // ignore malformed SSE chunks
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return full.trim();
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const isRetryableGeminiError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  const m = error.message.toLowerCase();
  return (
    m.includes("503") ||
    m.includes("service unavailable") ||
    m.includes("high demand") ||
    m.includes("429") ||
    m.includes("resource_exhausted") ||
    m.includes("try again later") ||
    (m.includes("temporarily") && m.includes("unavailable"))
  );
};

const withGeminiRetries = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
  const maxAttempts = 4;
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (!isRetryableGeminiError(e) || attempt === maxAttempts) throw e;
      const delayMs =
        Math.min(8_000, 500 * 2 ** attempt) + Math.floor(Math.random() * 250);
      console.warn(`[/api/chat] ${label} attempt ${attempt}/${maxAttempts} failed, retry in ${delayMs}ms`, e);
      await sleep(delayMs);
    }
  }
  throw lastError;
};

const requestGemini = async (messages: ChatMessage[]) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  console.info("[/api/chat] Gemini SDK init", {
    provider: "gemini",
    model,
    hasApiKey: Boolean(apiKey),
    apiKeyPreview: maskApiKey(apiKey),
  });

  const genAI = new GoogleGenerativeAI(apiKey);
  const geminiModel = genAI.getGenerativeModel({
    model,
    systemInstruction: buildSystemPrompt(),
  });

  const result = await withGeminiRetries("Gemini generateContent", () =>
    geminiModel.generateContent({
      contents: messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
      generationConfig: {
        temperature: 0.65,
      },
    })
  );

  const text = result.response.text()?.trim();
  if (text) return text;

  throw new Error(
    `Gemini returned empty content: ${JSON.stringify(
      {
        promptFeedback: result.response.promptFeedback,
        candidates: result.response.candidates,
      },
      null,
      2
    )}`
  );
};

const requestGeminiStream = async (
  messages: ChatMessage[],
  onDelta: (chunk: string) => void | Promise<void>
): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const genAI = new GoogleGenerativeAI(apiKey);
  const geminiModel = genAI.getGenerativeModel({
    model,
    systemInstruction: buildSystemPrompt(),
  });

  const streamResult = await withGeminiRetries("Gemini generateContentStream", () =>
    geminiModel.generateContentStream({
      contents: messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
      generationConfig: {
        temperature: 0.65,
      },
    })
  );

  let full = "";
  for await (const chunk of streamResult.stream) {
    const piece = chunk.text();
    if (piece) {
      full += piece;
      await onDelta(piece);
    }
  }

  const trimmed = full.trim();
  if (trimmed) return trimmed;

  throw new Error("Gemini stream returned empty content");
};

const getProvider = (): Provider => {
  const provider = process.env.AI_PROVIDER?.toLowerCase();
  if (provider === "openai" || provider === "gemini") return provider;
  return "gemini";
};

const getFallbackAnswer = () =>
  "Ma petite moustache ne fretille pas sur ce sujet, je n'ai pas l'info ! Le mieux est de contacter Julie directement par email.";

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const hasWholeWord = (text: string, word: string) =>
  new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(text);

const buildPersonalFactsAnswer = (messages: ChatMessage[]): string | null => {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  if (!latestUserMessage?.content) return null;

  const text = normalizeText(latestUserMessage.content);
  const asksAge =
    text === "age" ||
    /\bquel\s+age\b/.test(text) ||
    /\bage\s+de\s+julie\b/.test(text) ||
    /\bson\s+age\b/.test(text) ||
    /\btu\s+as\s+quel\s+age\b/.test(text) ||
    /\bcest\s+quoi\s+son\s+age\b/.test(text);
  const asksZodiac = text.includes("signe astro") || text.includes("signe astrologique");
  const asksAscendant = text.includes("ascendant");

  console.info("[/api/chat] personal facts detection", {
    text,
    asksAge,
    asksZodiac,
    asksAscendant,
  });

  if (!asksAge && !asksZodiac && !asksAscendant) return null;

  const age = computeAge(JULIE_BIRTHDATE);
  const zodiacSign = JULIE_ASTRO_SIGN || getZodiacSign(JULIE_BIRTHDATE);
  const ascendant = JULIE_ASCENDANT || null;
  const parts: string[] = [];

  if (asksAge) {
    parts.push(
      age !== null
        ? `Age de Julie: ${age} ans.`
        : "Age de Julie: non disponible pour le moment."
    );
  }

  if (asksZodiac) {
    parts.push(
      zodiacSign
        ? `Signe astro de Julie: ${zodiacSign}.`
        : "Signe astro de Julie: non disponible pour le moment."
    );
  }

  if (asksAscendant) {
    parts.push(
      ascendant
        ? `Ascendant de Julie: ${ascendant}.`
        : "Ascendant de Julie: non renseigne pour le moment."
    );
  }

  return `Oui moussaillon 🦦 ${parts.join(" ")}`;
};

const buildDirectKnowledgeAnswer = (messages: ChatMessage[]): string | null => {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  if (!latestUserMessage?.content) return null;

  const text = normalizeText(latestUserMessage.content);

  const asksIdentity =
    text.includes("qui es tu") ||
    text.includes("t es qui") ||
    text.includes("es tu une loutre") ||
    text.includes("tu es une loutre");
  if (asksIdentity) {
    return "Oui moussaillon 🦦 Je suis Le Compagnon de Julie, sa loutre virtuelle. Je peux te parler de son parcours, ses projets, ses competences et ses formations.";
  }

  const asksEmail =
    text.includes("email") || text.includes("mail") || text.includes("contacter") || text.includes("contact");
  if (asksEmail) {
    return "Pour contacter Julie: julie.lacresse@gmail.com 📩";
  }

  const asksAiNature =
    text.includes("ia") ||
    text.includes("intelligence artificielle") ||
    text.includes("ai") ||
    text.includes("statique") ||
    text.includes("pre enregistre") ||
    text.includes("preenregistre");
  if (asksAiNature) {
    return "Je suis un assistant IA relie au portfolio de Julie. Mes reponses utilisent une base de connaissances (CV + projets + competences) et quelques reponses directes existent pour des infos precises comme le contact.";
  }

  const asksLocation =
    text.includes("ou habite") || text.includes("localisation") || text.includes("ou est basee");
  if (asksLocation) {
    return "Julie est basee a Hagondange (57300), France 🌍";
  }

  return null;
};

const buildRecruiterEasterEggAnswer = (messages: ChatMessage[]): string | null => {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  if (!latestUserMessage?.content) return null;

  const text = normalizeText(latestUserMessage.content);
  const isRecruiterCommand =
    text.includes("otter://recruiter") ||
    text.includes("recruiter mode") ||
    text.includes("mode recruteur");

  if (!isRecruiterCommand) return null;

  const provider = getProvider();
  const providerLabel = provider === "openai" ? "OpenAI" : "Gemini";

  return [
    "🧪 Easter egg recruteur technique active.",
    `- IA active: ${providerLabel} (switchable via AI_PROVIDER)`,
    "- Endpoint: /api/chat (Next.js Route Handler, streaming texte)",
    "- Contexte: CV statique + donnees portfolio FR/EN injectees au prompt systeme",
    "- Garde-fous: rate limit memoire + fallback + reponses directes sur infos clefs",
    "- UX: streaming token par token dans le widget flottant React",
  ].join("\n");
};

const unique = <T,>(items: T[]) => Array.from(new Set(items));

const buildExperienceAwareAnswer = (messages: ChatMessage[]): string | null => {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  if (!latestUserMessage?.content) return null;

  const rawText = latestUserMessage.content;
  const text = normalizeText(rawText);
  const skills = getSkillsBundle("fr");
  const projects = getProjects("fr");

  const asksInternships =
    text.includes("stage") ||
    text.includes("stages") ||
    text.includes("internship") ||
    text.includes("internships");

  if (asksInternships) {
    const internships = skills.workExperience.filter((entry) =>
      normalizeText(entry.contractType ?? "").includes("stage")
    );

    if (internships.length === 0) {
      return "Je n'ai pas de stage enregistre dans mes donnees actuelles.";
    }

    const internshipLines = internships
      .map(
        (entry) =>
          `- ${entry.title} chez ${entry.organization} (${entry.period}${entry.location ? `, ${entry.location}` : ""})`
      )
      .join("\n");

    return `Oui, Julie a deja fait des stages.\n${internshipLines}\nSource: portfolio de Julie (experiences).`;
  }

  const asksSkillCheck =
    text.includes("connait") ||
    text.includes("connais") ||
    text.includes("maitrise") ||
    text.includes("sait faire") ||
    text.includes("utilise") ||
    text.includes("know") ||
    text.includes("knows") ||
    text.includes("experienced with");

  if (!asksSkillCheck) return null;

  const allKnownSkills = unique(
    [
      ...skills.workExperience.flatMap((entry) => entry.skills),
      ...skills.education.flatMap((entry) => entry.skills),
      ...projects.flatMap((project) => project.technologies),
    ].map((item) => item.trim())
  );

  const knownSkillWithNormalized = allKnownSkills
    .map((label) => ({ label, normalized: normalizeText(label) }))
    .sort((a, b) => b.normalized.length - a.normalized.length);

  const matchedSkill = knownSkillWithNormalized.find(
    (skill) => skill.normalized.length >= 2 && text.includes(skill.normalized)
  );

  if (!matchedSkill) {
    const strongerSkills = unique(projects.flatMap((project) => project.technologies)).slice(0, 6);
    return `Je n'ai pas trouve cette techno exactement dans mes donnees. En revanche, Julie travaille notamment avec: ${strongerSkills.join(", ")}.`;
  }

  const relatedProjects = projects.filter((project) =>
    project.technologies.some((tech) => {
      const normalizedTech = normalizeText(tech);
      return (
        normalizedTech.includes(matchedSkill.normalized) ||
        matchedSkill.normalized.includes(normalizedTech)
      );
    })
  );

  const relatedExperiences = skills.workExperience.filter((entry) =>
    entry.skills.some((skill) => {
      const normalizedSkill = normalizeText(skill);
      return (
        normalizedSkill.includes(matchedSkill.normalized) ||
        matchedSkill.normalized.includes(normalizedSkill)
      );
    })
  );

  const projectHint =
    relatedProjects.length > 0
      ? `Projet(s) a voir dans la section Projets: ${relatedProjects
          .slice(0, 2)
          .map((project) => project.title)
          .join(", ")}.`
      : "Je n'ai pas de projet tagge avec cette techno pour l'instant.";

  const experienceHint =
    relatedExperiences.length > 0
      ? `Contexte experience: ${relatedExperiences
          .slice(0, 2)
          .map((entry) => `${entry.title} chez ${entry.organization}`)
          .join(" ; ")}.`
      : "Pas de mention explicite en experience pro dans la base actuelle.";

  return `Oui, Julie connait ${matchedSkill.label}. ${projectHint} ${experienceHint} Source: portfolio de Julie (competences + projets).`;
};

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, number[]>();

const getRequestUserKey = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";

  const ip =
    forwardedFor?.split(",")[0]?.trim() || realIp || cfConnectingIp || "unknown-ip";
  return `${ip}:${userAgent}`;
};

const isRateLimited = (userKey: string): boolean => {
  const now = Date.now();
  const recentRequests =
    rateLimitStore.get(userKey)?.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS) ??
    [];

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(userKey, recentRequests);
    return true;
  }

  recentRequests.push(now);
  rateLimitStore.set(userKey, recentRequests);

  return false;
};

const createTextStreamResponse = (
  producer: (write: (chunk: string) => Promise<void>) => Promise<void>
) => {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          await producer(async (chunk: string) => {
            controller.enqueue(encoder.encode(chunk));
          });
        } catch (error) {
          console.error("[/api/chat] stream error:", error);
          const message = error instanceof Error ? error.message : String(error);
          let fallback =
            "Je rencontre une vague technique cote API. Reessaie dans un instant. 🌊";
          if (
            message.includes("Missing GEMINI_API_KEY") ||
            message.includes("Missing OPENAI_API_KEY")
          ) {
            fallback =
              "Je n'ai pas encore ma cle API dans les nageoires. Ajoute la cle dans .env.local puis relance npm run dev. 🦦";
          } else if (
            message.toLowerCase().includes("quota") ||
            message.includes("RESOURCE_EXHAUSTED") ||
            message.includes("429")
          ) {
            fallback =
              "Mon courant marin est surcharge pour le moment (quota API atteint). Reessaie dans quelques minutes ou change de provider (OpenAI). 🌊";
          } else if (
            message.includes("503") ||
            message.toLowerCase().includes("high demand") ||
            message.toLowerCase().includes("service unavailable")
          ) {
            fallback =
              "Le modele IA est sature (demande elevee cote Google). Reessaie dans quelques secondes, ou mets GEMINI_MODEL=gemini-2.0-flash dans .env.local. 🌊";
          }
          controller.enqueue(encoder.encode(fallback));
        } finally {
          controller.close();
        }
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
};

export async function POST(request: Request) {
  const provider = getProvider();

  try {
    const userKey = getRequestUserKey(request);
    if (isRateLimited(userKey)) {
      return NextResponse.json(
        {
          answer:
            "Doucement moussaillon 🦦 Trop de messages d'un coup. Attends une minute avant de replonger.",
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      messages?: ChatMessage[];
      stream?: boolean;
    };
    const messages = body.messages ?? [];
    const wantsStream = body.stream === true;

    const welcomeAnswer =
      "Bienvenue a bord ! Pose-moi une question sur le parcours de Julie. 🦦🌊";

    if (!Array.isArray(messages) || messages.length === 0) {
      if (wantsStream) {
        return createTextStreamResponse(async (write) => {
          await write(welcomeAnswer);
        });
      }
      return NextResponse.json({ answer: welcomeAnswer });
    }

    const experienceAwareAnswer = buildExperienceAwareAnswer(messages);
    if (experienceAwareAnswer) {
      if (wantsStream) {
        return createTextStreamResponse(async (write) => {
          await write(experienceAwareAnswer);
        });
      }
      return NextResponse.json({ answer: experienceAwareAnswer });
    }

    const personalFactsAnswer = buildPersonalFactsAnswer(messages);
    if (personalFactsAnswer) {
      if (wantsStream) {
        return createTextStreamResponse(async (write) => {
          await write(personalFactsAnswer);
        });
      }
      return NextResponse.json({ answer: personalFactsAnswer });
    }

    const directKnowledgeAnswer = buildDirectKnowledgeAnswer(messages);
    if (directKnowledgeAnswer) {
      if (wantsStream) {
        return createTextStreamResponse(async (write) => {
          await write(directKnowledgeAnswer);
        });
      }
      return NextResponse.json({ answer: directKnowledgeAnswer });
    }

    const recruiterEasterEggAnswer = buildRecruiterEasterEggAnswer(messages);
    if (recruiterEasterEggAnswer) {
      if (wantsStream) {
        return createTextStreamResponse(async (write) => {
          await write(recruiterEasterEggAnswer);
        });
      }
      return NextResponse.json({ answer: recruiterEasterEggAnswer });
    }

    if (wantsStream) {
      return createTextStreamResponse(async (write) => {
        const text =
          provider === "openai"
            ? await requestOpenAIStream(messages, write)
            : await requestGeminiStream(messages, write);
        if (!text) {
          await write(getFallbackAnswer());
        }
      });
    }

    const answer =
      provider === "openai"
        ? await requestOpenAI(messages)
        : await requestGemini(messages);

    return NextResponse.json({ answer: answer || getFallbackAnswer() });
  } catch (error) {
    console.error(
      "[/api/chat] provider error (raw):",
      JSON.stringify(
        {
          provider,
          normalized: normalizeError(error),
        },
        null,
        2
      )
    );
    console.error("[/api/chat] provider error (object):", error);

    const message = error instanceof Error ? error.message : "Unknown provider error";

    if (message.includes("Missing GEMINI_API_KEY") || message.includes("Missing OPENAI_API_KEY")) {
      return NextResponse.json(
        {
          answer:
            "Je n'ai pas encore ma cle API dans les nageoires. Ajoute la cle dans .env.local puis relance npm run dev. 🦦",
        },
        { status: 200 }
      );
    }

    if (
      message.toLowerCase().includes("quota") ||
      message.includes("RESOURCE_EXHAUSTED") ||
      message.includes("429")
    ) {
      return NextResponse.json(
        {
          answer:
            "Mon courant marin est surcharge pour le moment (quota API atteint). Reessaie dans quelques minutes ou change de provider (OpenAI). 🌊",
        },
        { status: 200 }
      );
    }

    if (
      message.includes("503") ||
      message.toLowerCase().includes("high demand") ||
      message.toLowerCase().includes("service unavailable")
    ) {
      return NextResponse.json(
        {
          answer:
            "Le modele IA est sature (demande elevee cote Google). Reessaie dans quelques secondes, ou mets GEMINI_MODEL=gemini-2.0-flash dans .env.local. 🌊",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        answer:
          "Je rencontre une vague technique cote API. Reessaie dans un instant. 🌊",
      },
      { status: 200 }
    );
  }
}
