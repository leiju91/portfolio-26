export type ProjectCategory = "code" | "design";

export type ProjectCoverImage = {
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  date: string;
  description: string;
  coverImage: ProjectCoverImage;
  technologies: string[];
  categories: ProjectCategory[];
  colSpan: 1 | 2 | 3 | 4;
  rowSpan: 1 | 2;
  placeholderClass: string;
};
