import { settings as defaultSettings } from "./config.js";
import { aboutEqual, generateMathProblem, solveMathProblem } from "./math.js";
export default class Quiz {
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
        return this.answers.reduce((total, _, i) => total + Number(this.checkAnswer(i)), 0);
    }
    get grade() {
        return Math.round(10000 * (this.correctAnswerCount / this.questions.length)) / 100;
    }
    constructor(numQuestions = 5, settings = defaultSettings, { questions, answers } = {}) {
        this.questions = [];
        this.correctAnswers = [];
        this.answers = [];
        this.timeStarted = Date.now();
        this._currentQuestionIndex = 0;
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
    checkAnswer(index) {
        return this.answers[index] != null && aboutEqual(this.answers[index], this.correctAnswers[index]);
    }
}
