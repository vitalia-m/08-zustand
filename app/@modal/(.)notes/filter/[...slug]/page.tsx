import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params.slug;
  const filter = slug[0] ?? "All";

  const title = `NoteHub - Filter: ${filter}`;
  const description = `Viewing notes filtered by  "${filter}" in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "NoteHub OG Image",
        },
      ],
    },
  };
}
export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const response = await fetchNotes("", 1, tag);

  return <NotesClient initialResponse={response} tag={tag} />;
}
