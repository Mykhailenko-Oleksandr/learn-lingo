"use client";

import css from "./TeacherFilters.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import LANGUAGES from "../../constants/languages";
import LEVELS from "../../constants/levels";
import PRICES from "../../constants/prices";

interface TeacherFiltersProps {
  changeLanguage: () => void;
  changeLevel: () => void;
  changePrice: () => void;
}

export default function TeacherFilters() {
  return (
    <div className={css.box}>
      <CustomSelect values={LANGUAGES} languages onChange={} />
      <CustomSelect values={LEVELS} levels onChange={} />
      <CustomSelect values={PRICES} prices onChange={} />
    </div>
  );
}
