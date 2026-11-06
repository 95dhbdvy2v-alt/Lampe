import { Suspense } from "react";
import { LearningPaths } from "@/components/lernpfade/LearningPaths";

export default function LernpfadePage() {
  return (
    <Suspense>
      <LearningPaths />
    </Suspense>
  );
}
