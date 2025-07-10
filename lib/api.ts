import axios from "axios";
import type { Note, NoteFormData } from "../types/note";

interface NoteHubResponse {
  notes: Note[];
  totalPages: number;
}

interface NoteHubSearchParams {
  params: {
    search?: string;
    page: number;
    perPage: number;
    tag?: string | undefined;
  };
  headers: {
    authorization: string;
  };
}

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!myToken) {
  throw new Error(
    "Missing NoteHub API token. Set NEXT_PUBLIC_NOTEHUB_TOKEN in .env"
  );
}

const headers = {
  authorization: `Bearer ${myToken}`,
};
export async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
  perPage: number = 12
): Promise<NoteHubResponse> {
  const params: NoteHubSearchParams["params"] = {
    page,
    perPage,
    tag,
  };

  if (query.trim() !== "") {
    params.search = query.trim();
  }
  const response = await axios.get<NoteHubResponse>(
    "https://notehub-public.goit.study/api/notes/",
    { params, headers }
  );
  return response.data;
}

export async function removeNote(id: number): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}

export async function createNote(note: NoteFormData): Promise<Note> {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes/",
    note,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}
