import { Levels } from "./levels";
import { Review } from "./review";

export interface Teacher {
  name: string;
  surname: string;
  languages: string[];
  levels: Levels[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}
