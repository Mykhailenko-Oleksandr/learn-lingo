import Image from "next/image";
import css from "./FeedbackItem.module.css";
import { Review } from "@/types/review";

interface FeedbackProps {
  feedback: Review;
}

export default function FeedbackItem({ feedback }: FeedbackProps) {
  return (
    <li className={css.item}>
      <div className={css.topBox}>
        <Image
          src="/images/default-avatar.webp"
          alt="User avatar"
          className={css.img}
          width={44}
          height={44}
        />
        <div className={css.nameRateBox}>
          <p className={css.userName}>{feedback.reviewer_name}</p>
          <div className={css.rateBox}>
            <svg width={16} height={16} className={css.starIcon}>
              <use href="/icons.svg#star"></use>
            </svg>
            <p className={css.rating}>{feedback.reviewer_rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
      <p className={css.comment}>{feedback.comment}</p>
    </li>
  );
}
