import { settings as defaultSettings, Settings } from "./config.js";
import { aboutEqual, generateMathProblem, solveMathProblem } from "./math.js";

export default class Quiz {
  readonly settings;
  readonly questions: string[] = [];
  readonly correctAnswers: number[] = [];
  readonly answers: (number | null)[] = [];
  timeStarted = Date.now();
  timeCompleted?: number;
  protected _currentQuestionIndex = 0;

  get currentQuestionIndex() {
    return this._currentQuestionIndex;
  }

  set currentQuestionIndex(index) {
    if (index > -1 && index < this.questions.length) {
      this._currentQuestionIndex = index;
    }
  }

  get currentQuestion() {
    return this.questions[this._currentQuestionIndex];
  }

  get currentAnswer() {
    return this.answers[this._currentQuestionIndex];
  }

  set currentAnswer(answer) {
    this.answers[this._currentQuestionIndex] = answer;
  }

  get correctAnswerCount() {
    return this.answers.reduce((total: number, _, i) => total + Number(this.checkAnswer(i)), 0);
  }

  get grade() {
    return Math.round(10000 * (this.correctAnswerCount / this.questions.length)) / 100;
  }

  constructor(
    numQuestions = 5,
    settings: Settings = defaultSettings,
    { questions, answers }: { questions?: string[]; answers?: (number | null)[] } = {}) {
    this.settings = { ...settings, operations: [...settings.operations] };

    for (let i = 0; i < numQuestions; i++) {
      let question = questions ? questions[i] : generateMathProblem(this.settings);

      while (this.questions.includes(question)) {
        question = generateMathProblem(this.settings);
      }

      this.questions.push(question);
      this.correctAnswers.push(solveMathProblem(this.questions[i]));
      this.answers.push(answers ? answers[i] : null);
    }
  }

  checkAnswer(index: number) {
    return this.answers[index] != null && aboutEqual(this.answers[index], this.correctAnswers[index]);
  }
}