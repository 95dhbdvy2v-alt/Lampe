import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { StudyProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "ExamenHub – Lernplattform Erstes Staatsexamen",
  description: "Datenbank, Lernpfade und Karteikarten für die juristische Examensvorbereitung.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('examen-hub:theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StudyProvider>
          <div className="min-h-screen">
            <Sidebar />
            <main className="min-w-0 lg:pl-64">{children}</main>
          </div>
        </StudyProvider>
      </body>
    </html>
  );
}
