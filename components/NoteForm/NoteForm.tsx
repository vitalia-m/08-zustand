"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { type NoteFormData } from "@/types/note";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short title, min 3 symbols")
    .max(50, "Too long title, max 50 symbols")
    .required("Title is required"),
  content: Yup.string().max(500, "Too long content, max 500 symbols"),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
});

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (
      pathname === "/notes/action/create" &&
      !draft?.title &&
      !draft?.content &&
      !draft.tag
    ) {
      setDraft({ title: "", content: "", tag: "Todo" });
    }
  }, [pathname, draft, setDraft]);

  const addNewNote = useMutation({
    mutationFn: (newNoteData: NoteFormData) => createNote(newNoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Notes"] });
      clearDraft();
      handleClose();
    },
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const values: NoteFormData = {
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    };

    try {
      await NoteFormSchema.validate(values, { abortEarly: false });
      addNewNote.mutate(values);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
        />
        {errors.title && <div className={css.error}>{errors.title}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
          rows={8}
        />
        {errors.content && <div className={css.error}>{errors.content}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <div className={css.error}>{errors.tag}</div>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleClose}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={addNewNote.isPending}
        >
          {addNewNote.isPending ? "Creating note..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
