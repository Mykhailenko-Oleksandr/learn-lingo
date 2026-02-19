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
  label: string | number;
}

interface CustomSelectProps {
  values: string[] | number[];
  languages?: boolean;
  prices?: boolean;
  levels?: boolean;
}

export default function CustomSelect({
  values,
  languages,
  prices,
  levels,
}: CustomSelectProps) {
  const options: IOption[] = [
    ...values.map((val) => {
      return { value: val.toString(), label: val };
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
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          ...(languages && { width: "221px" }),
          ...(levels && { width: "198px" }),
          ...(prices && { width: "124px" }),
        }),
      }}
    />
  );
}
