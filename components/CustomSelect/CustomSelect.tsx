"use client";

import css from "./CustomSelect.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Props as SelectProps, SingleValue } from "react-select";

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

export default function CustomSelect() {
  const options: IOption[] = [
    ...languages.map((language) => {
      return { value: language, label: language };
    }),
  ];

  const [currentValue, setCurrentValue] = useState<IOption | null>(options[0]);

  function changeLanguage(newValue: SingleValue<IOption>) {
    setCurrentValue(newValue);
  }

  return (
    <Select<IOption>
      className={css.customSelectBox}
      classNamePrefix="customSelect"
      onChange={changeLanguage}
      value={currentValue}
      options={options}
      isSearchable={false}
      placeholder="Choose language"
    />
  );
}
