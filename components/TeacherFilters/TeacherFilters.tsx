"use client";

import css from "./TeacherFilters.module.css";
import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

const languages = ["French", "English", "German", "Ukrainian", "Polish"];
const prices = [10, 20, 30, 40];

export default function TeacherFilters() {
  return (
    <div>
      <CustomSelect />
    </div>
  );
}
