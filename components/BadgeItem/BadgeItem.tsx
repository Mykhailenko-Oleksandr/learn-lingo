import clsx from "clsx";
import css from "./BadgeItem.module.css";

interface BadgeItemProps {
  level: string;
  currentLevel: string | null;
}

export default function BadgeItem({ level, currentLevel }: BadgeItemProps) {
  return (
    <li className={clsx(css.badge, level === currentLevel && css.badgeAccent)}>
      {level}
    </li>
  );
}
