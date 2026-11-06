import { Suspense } from "react";
import { StudySession } from "@/components/karteikarten/StudySession";

export default function LernenPage() {
  return (
    <Suspense>
      <StudySession />
    </Suspense>
  );
}
