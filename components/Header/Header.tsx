"use client";

import Link from "next/link";
import css from "./Header.module.css";

import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Header() {
  const router = usePathname();

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Link href="/" className={css.logo}>
          <svg width={28} height={28}>
            <use href="/icons.svg#ukraine"></use>
          </svg>
          <span>LearnLingo</span>
        </Link>

        <nav className={css.navigation}>
          <Link href="/" className={css.navLink}>
            Home
          </Link>
          <Link
            href="/teachers"
            className={clsx(
              css.navLink,
              router === "/teachers" && css.currentUrl,
            )}
          >
            Teachers
          </Link>
        </nav>

        <div className={css.authBtnBox}>
          <button type="button" className={css.loginBtn}>
            <svg width={20} height={20}>
              <use href="/icons.svg#log-in"></use>
            </svg>
            Log in
          </button>
          <button type="button" className={css.registerBtn}>
            Registration
          </button>
        </div>
      </div>
    </header>
  );
}
