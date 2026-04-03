import { ProjectsBentoGallery } from "@/components/projects/ProjectsBentoGallery";

export default function ProjectsPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pb-16 pt-28">
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Projects
        </h1>
        <p className="mt-2 text-sm text-white/55 sm:text-base">
          Interactive bento gallery — placeholders until real assets and links are
          wired up.
        </p>
      </header>
      <div className="mx-auto max-w-5xl">
        <ProjectsBentoGallery />
      </div>
    </main>
  );
}
