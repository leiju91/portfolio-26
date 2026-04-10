export type SkillsTimelineEntry = {
  id: string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  contractType?: string;
  level?: string;
  summary?: string;
  content?: string[];
  skills: string[];
};

export type LanguageSkill = {
  id: string;
  name: string;
  level: string;
};

export type ChatbotCareerContext = {
  whatSheWants: string;
  whereSheWantsToWork: string;
};

export type SkillsBundle = {
  workExperience: SkillsTimelineEntry[];
  education: SkillsTimelineEntry[];
  languageSkills: LanguageSkill[];
  hobbies: string[];
  chatbotCareerContext: ChatbotCareerContext;
};
