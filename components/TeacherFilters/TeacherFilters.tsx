import { Levels } from "@/types/level";
import css from "./TeacherFilters.module.css";

export default function TeacherFilters() {
  const languages = ["French", "English", "German", "Ukrainian", "Polish"];
  const prices = [10, 20, 30, 40];

  return (
    <>
      <label htmlFor="languages">Languages</label>
      <select name="languages" id="languages">
        {languages.map((language, index) => {
          return (
            <option key={`${language}-${index}`} value={language}>
              {language}
            </option>
          );
        })}
      </select>

      <label htmlFor="level">Level of knowledge</label>
      <select name="level" id="level">
        {Levels.map((level, index) => {
          return (
            <option key={`${level}-${index}`} value={level}>
              {level}
            </option>
          );
        })}
      </select>

      <label htmlFor="price">Price</label>
      <select name="price" id="price">
        {prices.map((price, index) => {
          return (
            <option key={`${price}-${index}`} value={price}>
              {price}$
            </option>
          );
        })}
      </select>
    </>
  );
}
