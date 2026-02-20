"use client";

import Button from "@/components/Button/Button";
import css from "./Teachers.module.css";
import TeacherFilters from "@/components/TeacherFilters/TeacherFilters";
import TeachersList from "@/components/TeachersList/TeachersList";
import { getAllData } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TeachersClient() {
  const [languagesFilter, setLanguagesFilter] = useState<string | null>(null);
  const [levelsFilter, setLevelsFilter] = useState<string | null>(null);
  const [prisesFilter, setPricesFilter] = useState<string | null>(null);

  console.log(languagesFilter, levelsFilter, prisesFilter);

  const {
    data: teachers,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getAllData,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log(teachers);

  return (
    <section className={css.section}>
      <div className={`container ${css.teachersContainer}`}>
        <TeacherFilters
          changeLanguage={(value) => setLanguagesFilter(value)}
          changeLevel={(value) => setLevelsFilter(value)}
          changePrice={(value) => setPricesFilter(value)}
        />

        {teachers && <TeachersList teachers={teachers} />}

        <Button text="Load More" onClick={() => {}} />
      </div>
    </section>
  );
}
