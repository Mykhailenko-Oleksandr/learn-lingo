import css from "./Home.module.css";

export default function Home() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.contentBox}>
          <h1 className={css.title}>
            Unlock your potential with the best <span>language</span> tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
        </div>
        <div className={css.imageBox}></div>
      </div>
    </section>
  );
}
