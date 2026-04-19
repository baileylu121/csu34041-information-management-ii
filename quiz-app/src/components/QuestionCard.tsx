import type { Question } from '../data/quiz';
import MermaidRenderer from './MermaidRenderer';

interface QuestionCardProps {
  question: () => Question;
  selectedAnswers: () => Map<number, number>;
  currentIndex: () => number;
  onSelect: (index: number) => void;
}

const optionLabels = ['A', 'B', 'C', 'D'];

export default function QuestionCard(props: QuestionCardProps) {
  const { question, selectedAnswers, currentIndex, onSelect } = props;

  const selected = () => {
    const map = selectedAnswers();
    return map.has(currentIndex()) ? map.get(currentIndex())! : null;
  };

  const answered = () => selectedAnswers().has(currentIndex());
  const q = () => question();

  const optionClass = (index: number) => {
    if (!answered()) {
      return selected() === index ? 'selected' : '';
    }
    if (index === q().correct) return 'correct';
    if (index === selected() && index !== q().correct) return 'wrong';
    return '';
  };

  return (
    <div class="question-card">
      <div class="question-header">
        <span class="category-badge">{q().category}</span>
        <span class="question-number">Q{q().id}</span>
      </div>

      <h3 class="question-text">{q().question}</h3>

      {q().diagram && (
        <div class="diagram-wrapper">
          <MermaidRenderer diagram={q().diagram} type={q().diagramType} />
        </div>
      )}

      <div class="options-grid">
        {q().options.map((option, index) => (
          <button
            class={`option-btn ${optionClass(index)}`}
            disabled={answered()}
            onClick={() => onSelect(index)}
          >
            <span class="option-label">{optionLabels[index]}</span>
            <span class="option-text">{option}</span>
          </button>
        ))}
      </div>

      {answered() && (
        <div class={`explanation ${selected() === q().correct ? 'explanation-correct' : 'explanation-wrong'}`}>
          <div class="explanation-header">
            {selected() === q().correct ? (
              <span class="icon">✓</span>
            ) : (
              <span class="icon">✗</span>
            )}
            <span>{selected() === q().correct ? 'Correct' : 'Incorrect'}</span>
          </div>
          <p class="explanation-text">{q().explanation}</p>
        </div>
      )}
    </div>
  );
}