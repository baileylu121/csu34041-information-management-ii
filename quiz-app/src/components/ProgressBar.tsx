interface ProgressBarProps {
  current: number;
  total: number;
  answered: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { current, total, answered } = props;
  const pct = Math.round((answered / total) * 100);

  return (
    <div class="progress-container">
      <div class="progress-info">
        <span>
          Question {current} of {total}
        </span>
        <span>
          {answered} answered · {pct}%
        </span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
