import { LibraryTree } from "@/components/datenbank/LibraryTree";

export default function DatenbankLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <LibraryTree />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
