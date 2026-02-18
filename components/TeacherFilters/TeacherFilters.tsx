"use client";

import dynamic from "next/dynamic";
import css from "./TeacherFilters.module.css";
import type { Props as SelectProps, SingleValue } from "react-select";
import { useState } from "react";

const Select = dynamic(() => import("./ClientSelect"), { ssr: false }) as <
  Option,
  IsMulti extends boolean = false,
>(
  props: SelectProps<Option, IsMulti>,
) => React.ReactElement;

interface IOption {
  value: string;
  label: string;
}

const languages = ["French", "English", "German", "Ukrainian", "Polish"];
const prices = [10, 20, 30, 40];

const options: IOption[] = [
  ...languages.map((language) => {
    return { value: language, label: language };
  }),
];

export default function TeacherFilters() {
  const [currentLanguage, setCurrentLanguage] = useState<IOption | null>(
    options[0],
  );

  function changeLanguage(newValue: SingleValue<IOption>) {
    setCurrentLanguage(newValue);
  }

  return (
    <>
      <Select<IOption>
        className={css.customSelectBox}
        classNamePrefix="customSelect"
        onChange={changeLanguage}
        value={currentLanguage}
        options={options}
        isSearchable={false}
        placeholder="Choose language"
      />
    </>
    // <form className={css.form}>
    //   <div className={css.selectBox}>
    //     <label htmlFor="languages" className={css.label}>
    //       Languages
    //     </label>
    //     <select name="languages" id="languages" className={css.select}>
    //       {languages.map((language, index) => {
    //         return (
    //           <option key={`${language}-${index}`} value={language}>
    //             {language}
    //           </option>
    //         );
    //       })}
    //     </select>
    //   </div>

    //   <div className={css.selectBox}>
    //     <label htmlFor="level" className={css.label}>
    //       Level of knowledge
    //     </label>
    //     <select name="level" id="level" className={css.select}>
    //       {Levels.map((level, index) => {
    //         return (
    //           <option key={`${level}-${index}`} value={level}>
    //             {level}
    //           </option>
    //         );
    //       })}
    //     </select>
    //   </div>

    //   <div className={css.selectBox}>
    //     <label htmlFor="price" className={css.label}>
    //       Price
    //     </label>
    //     <select name="price" id="price" className={css.select}>
    //       {prices.map((price, index) => {
    //         return (
    //           <option key={`${price}-${index}`} value={price}>
    //             {price}$
    //           </option>
    //         );
    //       })}
    //     </select>
    //   </div>
    // </form>
  );
}
