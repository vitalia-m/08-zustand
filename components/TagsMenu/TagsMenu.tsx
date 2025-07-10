"use client";
import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState, useEffect, useRef } from "react";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              onClick={toggle}
              href={`/notes/filter/All`}
              className={css.menuLink}
            >
              All
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggle}
              href={`/notes/filter/Todo`}
              className={css.menuLink}
            >
              Todo
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggle}
              href={`/notes/filter/Work`}
              className={css.menuLink}
            >
              Work
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggle}
              href={`/notes/filter/Personal`}
              className={css.menuLink}
            >
              Personal
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggle}
              href={`/notes/filter/Meeting`}
              className={css.menuLink}
            >
              Meeting
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              onClick={toggle}
              href={`/notes/filter/Shopping`}
              className={css.menuLink}
            >
              Shopping
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
