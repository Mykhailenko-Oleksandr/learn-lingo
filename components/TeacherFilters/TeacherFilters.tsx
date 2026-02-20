import css from "./TeacherFilters.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import LANGUAGES from "../../constants/languages";
import LEVELS from "../../constants/levels";
import PRICES from "../../constants/prices";

interface TeacherFiltersProps {
  changeLanguage: (value: string) => void;
  changeLevel: (value: string) => void;
  changePrice: (value: string) => void;
}

export default function TeacherFilters({
  changeLanguage,
  changeLevel,
  changePrice,
}: TeacherFiltersProps) {
  return (
    <div className={css.box}>
      <CustomSelect
        values={LANGUAGES}
        languages
        onChange={changeLanguage}
      />
      <CustomSelect
        values={LEVELS}
        levels
        onChange={changeLevel}
      />
      <CustomSelect
        values={PRICES}
        prices
        onChange={changePrice}
      />
    </div>
  );
}
