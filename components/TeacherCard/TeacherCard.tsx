"use client";

import { Teacher } from "@/types/teacher";
import css from "./TeacherCard.module.css";
import Image from "next/image";
import { useState } from "react";
import FeedbacksList from "../FeedbacksList/FeedbacksList";
import BadgesList from "../BadgesList/BadgesList";
import { useFavoriteTeachers } from "@/lib/store/teachersFavoriteStore";
import Button from "../Button/Button";
import ModalBooking from "../ModalBooking/ModalBooking";
import { useAuthStore } from "@/lib/store/authStore";
import toast from "react-hot-toast";
import { addFavorite, removeFavorite } from "@/lib/api/api";
import clsx from "clsx";
import ModalSuccess from "../ModalSuccess/ModalSuccess";
import FormData from "@/types/formDataBooking";

interface TeacherCardProps {
  teacher: Teacher;
  currentLevel: string | null;
}

export default function TeacherCard({
  teacher,
  currentLevel,
}: TeacherCardProps) {
  const [isOpenReadMore, setIsOpenReadMore] = useState(false);
  const [isModalBooking, setIsModalBooking] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { isAuthenticated, user } = useAuthStore();
  const isFavorite = useFavoriteTeachers((state) =>
    state.favoriteTeachers.includes(teacher.id!),
  );
  const { removeFavoriteStore, addFavoriteStore } = useFavoriteTeachers();

  async function handleFavoriteBtn() {
    if (!isAuthenticated) {
      toast.error("Available only to authorized users");
      return;
    }

    if (teacher.id && user) {
      if (isFavorite) {
        await removeFavorite(user.uid, teacher.id);
        removeFavoriteStore(teacher.id);
      } else {
        await addFavorite(user.uid, teacher.id);
        addFavoriteStore(teacher.id);
      }
    }
  }

  return (
    <>
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
                className={clsx(css.favoriteBtn, isFavorite && css.favorite)}
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

          {!isOpenReadMore && (
            <button
              type="button"
              className={css.readMoreBtn}
              onClick={() => setIsOpenReadMore(true)}
            >
              Read more
            </button>
          )}

          {isOpenReadMore && (
            <>
              <p className={css.experienceText}>{teacher.experience}</p>

              {teacher.reviews && teacher.reviews.length > 0 && (
                <FeedbacksList feedbacks={teacher.reviews} />
              )}
            </>
          )}

          {teacher.levels && teacher.levels.length > 0 && (
            <BadgesList levels={teacher.levels} currentLevel={currentLevel} />
          )}

          {isOpenReadMore && (
            <Button
              text="Book trial lesson"
              teacherCard
              onClick={() => setIsModalBooking(true)}
              type="button"
            />
          )}
        </div>
      </li>

      {isModalBooking && (
        <ModalBooking
          onClose={() => setIsModalBooking(false)}
          teacher={teacher}
          openModalSuccess={() => setIsModalSuccess(true)}
          setFormData={(data) => setFormData(data)}
        />
      )}

      {isModalSuccess && formData && (
        <ModalSuccess
          onClose={() => setIsModalSuccess(false)}
          teacher={teacher}
          formData={formData}
        />
      )}
    </>
  );
}
