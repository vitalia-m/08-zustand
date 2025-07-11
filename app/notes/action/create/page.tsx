import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Note | NoteHub",
  description:
    "Start capturing your thoughts with NoteHub. This page lets you quickly create and organize a new note.",
  alternates: {
    canonical: "https://08-zustand-ten-jet.vercel.app/notes/action/create",
  },

  openGraph: {
    title: "Create a New Note — NoteHub",
    description:
      "Quickly add a new note and keep your ideas organized in NotesHub.",
    url: "https://08-zustand-ten-jet.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Preview of the note creation page",
      },
    ],
    siteName: "NoteHub",
    type: "article",
  },
};
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
