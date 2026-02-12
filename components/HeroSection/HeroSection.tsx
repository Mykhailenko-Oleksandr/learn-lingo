import Link from "next/link";
import css from "./HeroSection.module.css";
import clsx from "clsx";

export default function HeroSection() {
  return (
    <section className={css.section}>
      <div className={clsx("container", css.heroContainer)}>
        <div className={css.contentBox}>
          <h1 className={css.title}>
            Unlock your potential with the best <span>language</span> tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link href="/teachers" className={css.link}>
            Get started
          </Link>
        </div>
        <div className={css.imageBox}></div>
      </div>
    </section>
  );
}
