"use client";

import { X } from "lucide-react";
import { Dialog } from "radix-ui";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProjectDetailCloseButtonProps = {
  className?: string;
};

export function ProjectDetailCloseButton({
  className,
}: ProjectDetailCloseButtonProps) {
  return (
    <Dialog.Close
      className={cn(
        buttonVariants({ variant: "navGlass", size: "icon" }),
        "absolute right-3 top-3 z-20 size-10 cursor-pointer rounded-full border-white/15 shadow-lg",
        className
      )}
      aria-label="Fermer"
    >
      <X className="size-5" aria-hidden />
    </Dialog.Close>
  );
}
