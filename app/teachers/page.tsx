import TeacherCard from "@/components/TeacherCard/TeacherCard";
import css from "./Teachers.module.css";
import { Teacher } from "@/types/teacher";

const teacherOne: Teacher = {
  name: "John",
  surname: "Doe",
  languages: ["English", "Spanish"],
  levels: [
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
    "C2 Proficient",
  ],
  rating: 4.5,
  reviews: [
    {
      reviewer_name: "Alice",
      reviewer_rating: 5,
      comment: "John is an excellent teacher! I highly recommend him.",
    },
    {
      reviewer_name: "Bob",
      reviewer_rating: 4,
      comment: "John is very knowledgeable and patient. I enjoyed his classes.",
    },
  ],
  price_per_hour: 25,
  lessons_done: 1375,
  avatar_url: "https://ftp.goit.study/img/avatars/1.jpg",
  lesson_info:
    "The lessons focus on improving speaking and listening skills through interactive activities and discussions.",
  conditions: [
    "Teaches only adult learners (18 years and above).",
    "Flexible scheduling options available.",
  ],
  experience:
    "John has been teaching languages for 7 years and has extensive experience in helping students improve their language skills. He has successfully taught numerous students from different backgrounds and proficiency levels.",
};

export default function Teachers() {
  return (
    <section className={css.section}>
      <div className={`container ${css.teachersContainer}`}>
        <TeacherCard teacher={teacherOne} />
      </div>
    </section>
  );
}
