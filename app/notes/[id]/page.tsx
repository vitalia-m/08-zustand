import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const note = await fetchNoteById(Number(params.id));

  const noteTitle = note?.title ?? "Note details";
  const noteDescription =
    note?.content ?? "Read the full details of this note on NoteHub.";

  return {
    title: `NoteHub - ${noteTitle}`,
    description: `${noteDescription}`,
    openGraph: {
      type: "article",
      url: `https://08-zustand-ten-jet.vercel.app/notes/${params.id}`,
      title: `NoteHub - ${noteTitle}`,
      description: noteDescription,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "NoteHub preview image",
        },
      ],
    },
  };
}

export default async function NoteDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["Note", parseInt(id)],
    queryFn: () => fetchNoteById(parseInt(id)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
