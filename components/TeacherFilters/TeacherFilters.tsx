"use client";

import css from "./TeacherFilters.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import LANGUAGES from "../constants/languages";
import LEVELS from "../constants/levels";
import PRICES from "../constants/prices";

export default function TeacherFilters() {
  return (
    <div className={css.box}>
      <CustomSelect values={LANGUAGES} languages />
      <CustomSelect values={LEVELS} levels />
      <CustomSelect values={PRICES} prices />
    </div>
  );
}
