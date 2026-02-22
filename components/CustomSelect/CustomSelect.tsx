"use client";

import css from "./CustomSelect.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
  onChange: (value: string) => void;
  value?: string | null;
}

export default function CustomSelect({
  values,
  languages,
  prices,
  levels,
  onChange,
  value,
}: CustomSelectProps) {
  const options: IOption[] = [
    ...values.map((val) => {
      return { value: val.toString(), label: val };
    }),
  ];

  const [currentValue, setCurrentValue] = useState<IOption | null>(null);

  useEffect(() => {
    if (value === null) setCurrentValue(null);
  }, [value]);

  function changeLanguage(newValue: SingleValue<IOption>) {
    setCurrentValue(newValue);

    if (newValue) onChange(newValue.value);
  }

  return (
    <label className={css.label}>
      {languages && "Languages"}
      {levels && "Level of knowledge"}
      {prices && "Price"}
      <Select<IOption>
        className={css.customSelectBox}
        classNamePrefix="customSelect"
        onChange={changeLanguage}
        value={currentValue}
        options={options}
        isSearchable={false}
        placeholder={options[0].value}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            ...(languages && { width: "221px" }),
            ...(levels && { width: "198px" }),
            ...(prices && { width: "124px" }),
          }),
        }}
      />
    </label>
  );
}
