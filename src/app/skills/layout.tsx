import { SkillsPageScrollSnap } from "@/components/skills/SkillsPageScrollSnap";

export default function SkillsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkillsPageScrollSnap />
      {children}
    </>
  );
}
