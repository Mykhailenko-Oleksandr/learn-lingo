import css from "./FeedbacksList.module.css";
import FeedbackItem from "../FeedbackItem/FeedbackItem";
import { Review } from "@/types/review";

interface FeedbacksListProps {
  feedbacks: Review[];
}

export default function FeedbacksList({ feedbacks }: FeedbacksListProps) {
  return (
    <ul className={css.feedbacksList}>
      {feedbacks.map((feedback, index) => {
        const feedbackId = `${feedback.reviewer_name.toLowerCase()}-${index}`;
        return <FeedbackItem feedback={feedback} key={feedbackId} />;
      })}
    </ul>
  );
}
