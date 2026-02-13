"use client";

import { Teacher } from "@/types/teacher";
import css from "./TeacherCard.module.css";
import Image from "next/image";
import { useId } from "react";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const baseId = useId();

  function handleFavoriteBtn() {
    console.log("ok");
  }

  return (
    <li className={css.item}>
      <div className={css.imgBox}>
        <Image
          src={teacher.avatar_url}
          alt="Avatar teacher"
          width={96}
          height={96}
          className={css.avatar}
        />
      </div>
      <div className={css.contentBox}>
        <div className={css.languagesBox}>
          <p className={css.keyBlock}>Languages</p>
          <div className={css.languagesRightBox}>
            <ul className={css.languagesList}>
              <li className={css.languagesItem}>
                <svg width={16} height={16} className={css.openBookIcon}>
                  <use href="/icons.svg#book-open"></use>
                </svg>
                <p className={css.textValue}>Lessons online</p>
              </li>
              <li className={css.line}></li>
              <li className={css.languagesItem}>
                <p className={css.textValue}>
                  Lessons done: {teacher.lessons_done}
                </p>
              </li>
              <li className={css.line}></li>
              <li className={css.languagesItem}>
                <svg width={16} height={16} className={css.starIcon}>
                  <use href="/icons.svg#star"></use>
                </svg>
                <p className={css.textValue}>Rating: {teacher.rating}</p>
              </li>
              <li className={css.line}></li>
              <li className={css.languagesItem}>
                <p className={css.textValue}>
                  Price / 1 hour:{" "}
                  <span className={css.accentText}>
                    {teacher.price_per_hour}$
                  </span>
                </p>
              </li>
            </ul>
            <button
              type="button"
              className={css.favoriteBtn}
              onClick={handleFavoriteBtn}
              aria-label="Add favorite list teacher"
            >
              <svg width={26} height={26}>
                <use href="/icons.svg#heart"></use>
              </svg>
            </button>
          </div>
        </div>
        <h2 className={css.teacherName}>
          {teacher.name} {teacher.surname}
        </h2>
        <ul className={css.infoTeacherList}>
          <li className={css.infoTeacherItem}>
            <p className={css.keyBlock}>Speaks:&nbsp;</p>
            <p className={css.textValue}>{teacher.languages.join(", ")}</p>
          </li>
          <li className={css.infoTeacherItem}>
            <p className={css.keyBlock}>Lesson Info:&nbsp;</p>
            <p className={css.textValue}>{teacher.lesson_info}</p>
          </li>
          <li className={css.infoTeacherItem}>
            <p className={css.keyBlock}>Conditions:&nbsp;</p>
            <p className={css.textValue}>{teacher.conditions}</p>
          </li>
        </ul>
        <button type="button" className={css.readMoreBtn}>
          Read more
        </button>

        <p className={css.experienceText}>{teacher.experience}</p>

        {teacher.reviews && teacher.reviews.length > 0 && (
          <ul className={css.feedbacksList}>
            {teacher.reviews.map((feedback, index) => {
              const uniqueFeedbackId = `${baseId}-${feedback.reviewer_name}-${index}`;
              return (
                <li key={index} className={css.feedbackBox}>
                  <div>
                    <Image
                      src="/images/default-avatar.webp"
                      alt="User avatar"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {teacher.levels && teacher.levels.length > 0 && (
          <ul className={css.badgesList}>
            {teacher.levels.map((level, index) => {
              const uniqueBadgeId = `${baseId}-${level}-${index}`;
              return (
                <li key={uniqueBadgeId} className={css.badge}>
                  {level}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
}
