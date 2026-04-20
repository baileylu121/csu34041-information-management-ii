import type { Question } from "../data/quiz";

interface ResultsProps {
  questions: Question[];
  answers: Map<number, number>;
  onRestart: () => void;
  onReview: () => void;
}

export default function Results(props: ResultsProps) {
  const { questions, answers, onRestart, onReview } = props;

  let correct = 0;
  questions.forEach((q, i) => {
    if (answers.get(i) === q.correct) correct++;
  });

  const pct = Math.round((correct / questions.length) * 100);

  const grade = pct >= 90 ? "Excellent" : pct >= 70 ? "Good" : pct >= 50 ? "Fair" : "Needs work";
  const gradeColor = pct >= 70 ? "#00b894" : pct >= 50 ? "#e17055" : "#d63031";

  return (
    <div class="results-container">
      <h2 class="results-title">Results</h2>

      <div class="score-circle" style={{ borderColor: gradeColor }}>
        <span class="score-pct" style={{ color: gradeColor }}>
          {pct}%
        </span>
        <span class="score-label">
          {correct} / {questions.length}
        </span>
      </div>

      <p class="grade-text" style={{ color: gradeColor }}>
        {grade}
      </p>

      <div class="result-actions">
        <button class="btn btn-primary" onClick={onReview}>
          Review Answers
        </button>
        <button class="btn btn-secondary" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
