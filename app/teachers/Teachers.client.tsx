"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Teacher } from "@/types/teacher";
import { getTeachers } from "@/lib/api/clientApi";
import TeacherFilters from "@/components/TeacherFilters/TeacherFilters";
import TeachersList from "@/components/TeachersList/TeachersList";
import Button from "@/components/Button/Button";
import css from "./Teachers.module.css";

export default function TeachersClient() {
  const [languagesFilter, setLanguagesFilter] = useState<string | null>(null);
  const [levelsFilter, setLevelsFilter] = useState<string | null>(null);
  const [pricesFilter, setPricesFilter] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["teachers", pricesFilter, languagesFilter, levelsFilter],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getTeachers(4, pageParam, pricesFilter, languagesFilter, levelsFilter),
    getNextPageParam: (lastPage) =>
      lastPage.length ? lastPage[lastPage.length - 1].id : undefined,
    initialPageParam: undefined,
  });

  const teachers: Teacher[] = data?.pages.flatMap((page) => page) ?? [];

  return (
    <section className={css.section}>
      <div className={`container ${css.teachersContainer}`}>
        <TeacherFilters
          changeLanguage={setLanguagesFilter}
          changeLevel={setLevelsFilter}
          changePrice={setPricesFilter}
        />

        {teachers.length > 0 ? (
          <TeachersList teachers={teachers} currentLevel={levelsFilter} />
        ) : (
          <p className={css.text}>No teachers found for selected filters.</p>
        )}

        {hasNextPage && !isFetching && (
          <Button text="Load More" onClick={() => fetchNextPage()} />
        )}
      </div>
    </section>
  );
}
