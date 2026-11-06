import { notFound } from "next/navigation";
import { topicById, topics } from "@/lib/data";
import { QuizRunner } from "@/components/lernpfade/QuizRunner";

export function generateStaticParams() {
  return topics.map((t) => ({ topicId: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  return { title: `Lernpfad: ${topicById(topicId)?.title ?? "Thema"} – ExamenHub` };
}

export default async function QuizPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = topicById(topicId);
  if (!topic) notFound();
  return <QuizRunner key={topic.id} topic={topic} />;
}
