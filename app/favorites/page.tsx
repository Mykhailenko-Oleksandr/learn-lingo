"use client";

import { useEffect, useState } from "react";
import { useFavoriteTeachers } from "@/lib/store/teachersFavoriteStore";
import { get, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";

import css from "./Favorites.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import TeachersList from "@/components/TeachersList/TeachersList";

export default function Favorites() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const favoriteTeacherIds = useFavoriteTeachers(
    (state) => state.favoriteTeachers,
  );
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    router.back();
  }

  useEffect(() => {
    if (!user || favoriteTeacherIds.length === 0) {
      setTeachers([]);
      return;
    }

    async function fetchFavorites() {
      const results = await Promise.all(
        favoriteTeacherIds.map(async (id) => {
          const snapshot = await get(ref(db, `teachers/${id}`));
          if (snapshot.exists()) {
            return { id, ...(snapshot.val() as Teacher) };
          }
          return null;
        }),
      );

      setTeachers(results.filter(Boolean) as Teacher[]);
    }

    fetchFavorites();
  }, [user, favoriteTeacherIds]);

  return (
    <section className={css.section}>
      <div className={`container ${css.teachersContainer}`}>
        {teachers && teachers.length > 0 ? (
          <TeachersList teachers={teachers} />
        ) : (
          <p className={css.text}>You have no favorite teachers yet</p>
        )}
      </div>
    </section>
  );
}
