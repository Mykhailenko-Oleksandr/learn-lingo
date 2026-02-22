import css from "./BadgesList.module.css";
import BadgeItem from "../BadgeItem/BadgeItem";

interface BadgesListProps {
  levels: string[];
  currentLevel: string | null;
}

export default function BadgesList({ levels, currentLevel }: BadgesListProps) {
  return (
    <ul className={css.list}>
      {levels.map((level, index) => {
        const badgeId = `${level.toLowerCase()}-${index}`;
        return (
          <BadgeItem key={badgeId} level={level} currentLevel={currentLevel} />
        );
      })}
    </ul>
  );
}
