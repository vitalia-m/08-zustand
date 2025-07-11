import css from "./NotFound.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - NoteHub",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "Page Not Found - NoteHub",
    description: "The page you are looking for does not exist on NoteHub.",
    url: "https://08-zustand-ten-jet.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Not Found page preview image",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.notfound}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
