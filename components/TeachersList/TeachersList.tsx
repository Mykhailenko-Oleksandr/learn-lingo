import { Teacher } from "@/types/teacher";
import css from "./TeachersList.module.css";
import TeacherCard from "../TeacherCard/TeacherCard";

interface TeachersListProps {
  teachers: Teacher[];
  currentLevel: string | null;
}

export default function TeachersList({
  teachers,
  currentLevel,
}: TeachersListProps) {
  return (
    <ul className={css.list}>
      {teachers.map((teacher, index) => {
        const teacherId = `${teacher.name.toLowerCase()}-${teacher.surname.toLowerCase()}-${index}`;
        return (
          <TeacherCard
            key={teacherId}
            teacher={teacher}
            currentLevel={currentLevel}
          />
        );
      })}
    </ul>
  );
}
