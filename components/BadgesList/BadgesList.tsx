import { Level } from "@/types/level";
import css from "./BadgesList.module.css";
import BadgeItem from "../BadgeItem/BadgeItem";

interface BadgesListProps {
  levels: Level[];
}

export default function BadgesList({ levels }: BadgesListProps) {
  return (
    <ul className={css.list}>
      {levels.map((level, index) => {
        const badgeId = `${level.toLowerCase()}-${index}`;
        return <BadgeItem key={badgeId} level={level} />;
      })}
    </ul>
  );
}
