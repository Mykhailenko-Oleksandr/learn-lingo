"use client";

import css from "./TeacherFilters.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import LANGUAGES from "../../constants/languages";
import LEVELS from "../../constants/levels";
import PRICES from "../../constants/prices";
import { useState } from "react";

interface TeacherFiltersProps {
  changeLanguage: (value: string | null) => void;
  changeLevel: (value: string | null) => void;
  changePrice: (value: string | null) => void;
}

export default function TeacherFilters({
  changeLanguage,
  changeLevel,
  changePrice,
}: TeacherFiltersProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const hasFilters = selectedLanguage || selectedLevel || selectedPrice;

  const handleReset = () => {
    setSelectedLanguage(null);
    setSelectedLevel(null);
    setSelectedPrice(null);

    changeLanguage(null);
    changeLevel(null);
    changePrice(null);
  };

  return (
    <div className={css.box}>
      <CustomSelect
        values={LANGUAGES}
        languages
        onChange={(value) => {
          setSelectedLanguage(value);
          changeLanguage(value);
        }}
        value={selectedLanguage}
      />
      <CustomSelect
        values={LEVELS}
        levels
        onChange={(value) => {
          setSelectedLevel(value);
          changeLevel(value);
        }}
        value={selectedLevel}
      />
      <CustomSelect
        values={PRICES}
        prices
        onChange={(value) => {
          setSelectedPrice(value);
          changePrice(value);
        }}
        value={selectedPrice}
      />

      {hasFilters && (
        <button className={css.resetBtn} onClick={handleReset}>
          Reset Filters
        </button>
      )}
    </div>
  );
}
