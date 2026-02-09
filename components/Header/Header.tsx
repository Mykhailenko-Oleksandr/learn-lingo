import Link from "next/link";
import css from "./Header.module.css";

export default async function Header() {
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
          <Link href="/teachers" className={css.navLink}>
            Teachers
          </Link>
        </nav>
      </div>
    </header>
  );
}
