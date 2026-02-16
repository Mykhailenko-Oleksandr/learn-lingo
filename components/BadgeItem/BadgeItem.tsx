import { Level } from "@/types/level";
import css from "./BadgeItem.module.css";

interface BadgeItemProps {
  level: Level;
}

export default function BadgeItem({ level }: BadgeItemProps) {
  return <li className={css.badge}>{level}</li>;
}
