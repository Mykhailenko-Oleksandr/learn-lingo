"use client";

import Button from "@/components/Button/Button";
import css from "./Teachers.module.css";
import TeacherFilters from "@/components/TeacherFilters/TeacherFilters";
import TeachersList from "@/components/TeachersList/TeachersList";
import { getTeachers } from "@/lib/api/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Teacher } from "@/types/teacher";

export default function TeachersClient() {
  const [languagesFilter, setLanguagesFilter] = useState<string | null>(null);
  const [levelsFilter, setLevelsFilter] = useState<string | null>(null);
  const [prisesFilter, setPricesFilter] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["teachers"],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getTeachers(4, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.length ? lastPage[lastPage.length - 1].id : undefined,
  });

  const teachers: Teacher[] = data?.pages.flatMap((page) => page) ?? [];

  return (
    <section className={css.section}>
      <div className={`container ${css.teachersContainer}`}>
        <TeacherFilters
          changeLanguage={(value) => setLanguagesFilter(value)}
          changeLevel={(value) => setLevelsFilter(value)}
          changePrice={(value) => setPricesFilter(value)}
        />

        {teachers && teachers.length > 0 && (
          <TeachersList teachers={teachers} />
        )}

        {hasNextPage && <Button text="Load More" onClick={fetchNextPage} />}
      </div>
    </section>
  );
}
