import { createSignal, createMemo } from 'solid-js';
import { Show } from 'solid-js/web';
import { quizQuestions, type Question } from '../data/quiz';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import Results from './Results';

type QuizState = 'intro' | 'quiz' | 'results';

export default function QuizApp() {
  const [state, setState] = createSignal<QuizState>('intro');
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [selectedAnswers, setSelectedAnswers] = createSignal<Map<number, number>>(new Map());
  const [markedForReview, setMarkedForReview] = createSignal<Set<number>>(new Set());

  const questions = quizQuestions;
  const total = questions.length;

  const answeredCount = createMemo(() => selectedAnswers().size);
  const currentQuestion = createMemo(() => questions[currentIndex()]);

  const handleSelect = (optionIndex: number) => {
    const answers = new Map(selectedAnswers());
    answers.set(currentIndex(), optionIndex);
    setSelectedAnswers(answers);
  };

  const handleNext = () => {
    if (currentIndex() < total - 1) {
      setCurrentIndex(currentIndex() + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex() > 0) {
      setCurrentIndex(currentIndex() - 1);
    }
  };

  const handleFinish = () => {
    setState('results');
  };

  const handleRestart = () => {
    setSelectedAnswers(new Map());
    setMarkedForReview(new Set());
    setCurrentIndex(0);
    setState('intro');
  };

  const handleReview = () => {
    setState('quiz');
  };

  const toggleReview = () => {
    const set = new Set(markedForReview());
    if (set.has(currentIndex())) {
      set.delete(currentIndex());
    } else {
      set.add(currentIndex());
    }
    setMarkedForReview(set);
  };

  return (
    <>
      <Show when={state() === 'intro'}>
        <div class="intro-screen">
          <div class="intro-content">
            <h1 class="intro-title">Database Systems</h1>
            <p class="intro-subtitle">CSU 34041 · Information Management II</p>

            <div class="intro-stats">
              <div class="stat">
                <span class="stat-value">{total}</span>
                <span class="stat-label">Questions</span>
              </div>
              <div class="stat">
                <span class="stat-value">{[...new Set(questions.map(q => q.category))].length}</span>
                <span class="stat-label">Topics</span>
              </div>
              <div class="stat">
                <span class="stat-value">MCQ</span>
                <span class="stat-label">Format</span>
              </div>
            </div>

            <div class="intro-categories">
              {[...new Set(questions.map(q => q.category))].map(cat => (
                <span class="category-tag">{cat}</span>
              ))}
            </div>

            <button class="btn btn-primary btn-large" onClick={() => setState('quiz')}>
              Begin Quiz
            </button>

            <p class="intro-hint">
              Select the best answer for each question. Diagrams are included where relevant.
            </p>
          </div>
        </div>
      </Show>

      <Show when={state() === 'results'}>
        <div class="results-screen">
          <Results
            questions={questions}
            answers={selectedAnswers()}
            onRestart={handleRestart}
            onReview={handleReview}
          />
        </div>
      </Show>

      <Show when={state() === 'quiz'}>
        <div class="quiz-screen">
          <ProgressBar current={currentIndex() + 1} total={total} answered={answeredCount()} />

          <QuestionCard
            question={currentQuestion}
            selectedAnswers={selectedAnswers}
            currentIndex={currentIndex}
            onSelect={handleSelect}
          />

          <div class="quiz-nav">
            <button class="btn btn-ghost" onClick={handlePrev} disabled={currentIndex() === 0}>
              ← Previous
            </button>

            <button
              class="btn btn-ghost btn-review"
              onClick={toggleReview}
            >
              {markedForReview().has(currentIndex()) ? '★ Marked' : '☆ Mark for Review'}
            </button>

            {currentIndex() === total - 1 ? (
              <button
                class="btn btn-primary"
                onClick={handleFinish}
                disabled={!selectedAnswers().has(currentIndex())}
              >
                Finish Quiz
              </button>
            ) : (
              <button class="btn btn-primary" onClick={handleNext}>
                Next →
              </button>
            )}
          </div>
        </div>
      </Show>
    </>
  );
}