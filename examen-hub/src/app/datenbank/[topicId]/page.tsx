import { notFound } from "next/navigation";
import { Suspense } from "react";
import { topicById, topics } from "@/lib/data";
import { TopicView } from "@/components/datenbank/TopicView";

export function generateStaticParams() {
  return topics.map((t) => ({ topicId: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  return { title: `${topicById(topicId)?.title ?? "Thema"} – ExamenHub` };
}

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = topicById(topicId);
  if (!topic) notFound();
  return (
    <Suspense>
      <TopicView topic={topic} />
    </Suspense>
  );
}
