import { Suspense } from "react";
import { LibraryOverview } from "@/components/datenbank/LibraryOverview";

export default function DatenbankPage() {
  return (
    <Suspense>
      <LibraryOverview />
    </Suspense>
  );
}
