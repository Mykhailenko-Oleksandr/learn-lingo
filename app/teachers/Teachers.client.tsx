"use client";

import css from "./Teachers.module.css";
import TeacherFilters from "@/components/TeacherFilters/TeacherFilters";
import TeachersList from "@/components/TeachersList/TeachersList";
import { getAllData } from "@/lib/api/clientApi";
import { Level } from "@/types/level";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TeachersClient() {
  const [languagesFilter, setLanguagesFilter] = useState<string | null>(null);
  const [levelsFilter, setLevelsFilter] = useState<Level | null>(null);
  const [prisesFilter, setPricesFilter] = useState<number | null>(null);

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
        <TeacherFilters />

        {teachers && <TeachersList teachers={teachers} />}
      </div>
    </section>
  );
}
