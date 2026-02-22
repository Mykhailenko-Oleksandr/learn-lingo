"use client";

import Button from "@/components/Button/Button";
import css from "./Teachers.module.css";
import TeacherFilters from "@/components/TeacherFilters/TeacherFilters";
import TeachersList from "@/components/TeachersList/TeachersList";
import { getTeachers } from "@/lib/api/clientApi";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Teacher } from "@/types/teacher";

export default function TeachersClient() {
  const [languagesFilter, setLanguagesFilter] = useState<string | null>(null);
  const [levelsFilter, setLevelsFilter] = useState<string | null>(null);
  const [pricesFilter, setPricesFilter] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    Teacher[],
    Error,
    InfiniteData<Teacher[]>,
    (string | null)[],
    string | number | undefined
  >({
    queryKey: ["teachers", pricesFilter],
    queryFn: ({ pageParam }) => getTeachers(4, pageParam, pricesFilter),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 4) return undefined;

      return pricesFilter
        ? lastPage[lastPage.length - 1].price_per_hour
        : lastPage[lastPage.length - 1].id;
    },
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

        {teachers && teachers.length > 0 ? (
          <TeachersList teachers={teachers} />
        ) : (
          <p className={css.text}>No teachers found for the specified filter</p>
        )}

        {hasNextPage && <Button text="Load More" onClick={fetchNextPage} />}
      </div>
    </section>
  );
}
