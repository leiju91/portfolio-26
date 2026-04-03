"use client";

import { Dialog } from "radix-ui";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

import { ProjectDetailAside } from "./ProjectDetailAside";
import { ProjectDetailCloseButton } from "./ProjectDetailCloseButton";
import { ProjectDetailDate } from "./ProjectDetailDate";
import { ProjectDetailDescription } from "./ProjectDetailDescription";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
import { ProjectDetailMedia } from "./ProjectDetailMedia";
import { ProjectDetailTechStack } from "./ProjectDetailTechStack";
import { ProjectDetailTitle } from "./ProjectDetailTitle";

export type ProjectDetailDialogProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {project ? (
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(
              "fixed inset-0 z-50 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "bg-black/60 backdrop-blur-md"
            )}
          />
          <Dialog.Content
            className={cn(
              "fixed top-1/2 left-1/2 z-50 max-h-[min(92vh,900px)] w-[min(calc(100vw-1.5rem),52rem)] -translate-x-1/2 -translate-y-1/2",
              "rounded-2xl border-0 bg-transparent p-0 shadow-none outline-none",
              "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
          >
            <div className="relative">
              <ProjectDetailCloseButton />
              <ProjectDetailLayout
                media={<ProjectDetailMedia project={project} />}
                aside={
                  <ProjectDetailAside>
                    <Dialog.Title asChild>
                      <ProjectDetailTitle>{project.title}</ProjectDetailTitle>
                    </Dialog.Title>
                    <ProjectDetailDate
                      isoDate={project.date}
                      className="mt-3 border-b border-white/10 pb-4"
                    />
                    <ProjectDetailTechStack technologies={project.technologies} />
                    <Dialog.Description asChild>
                      <ProjectDetailDescription>
                        {project.description}
                      </ProjectDetailDescription>
                    </Dialog.Description>
                  </ProjectDetailAside>
                }
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  );
}
