import Link from "next/link";
import css from "./HeroSection.module.css";
import clsx from "clsx";
import Image from "next/image";

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
        <div className={css.imageBox}>
          <Image
            src="/images/head@2x.png"
            alt="Head child"
            className={css.headImg}
            width={339}
            height={339}
          />
          <Image
            src="/images/Mac@2x.png"
            alt="Laptop"
            className={css.laptopImg}
            width={391}
            height={304}
          />
        </div>
      </div>
    </section>
  );
}
