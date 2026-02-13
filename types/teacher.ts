import { Reviews } from "./review";

export interface Teacher {
  name: string;
  surname: string;
  languages: ["English", "Spanish"];
  levels: [
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
    "C2 Proficient",
  ];
  rating: number;
  reviews: Reviews[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}
