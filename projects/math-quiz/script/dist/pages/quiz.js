import Quiz from '../Quiz.js';
import { createElement, loadQuizzes } from '../utils.js';
const questionButtons = document.getElementById('question-buttons');
const questionNumberEl = document.getElementById('question-number');
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const resultsEl = document.getElementById('results');
const prevBtn = document.getElementById('prev-question');
const nextBtn = document.getElementById('next-question');
const finishBtn = document.getElementById('finish-quiz');
const quiz = loadQuiz();
initializeUI();
prevBtn.addEventListener("click", () => {
    quiz.currentQuestionIndex--;
    updateUI();
});
nextBtn.addEventListener("click", () => {
    quiz.currentQuestionIndex++;
    updateUI();
});
answerInput.addEventListener("input", () => {
    const answer = parseFloat(answerInput.value);
    quiz.currentAnswer = isNaN(answer) ? null : answer;
    updateQuestionButtons();
});
finishBtn.addEventListener("click", () => {
    quiz.timeCompleted = Date.now();
    alert(completeMessage());
    updateUI();
    const previousResults = JSON.parse(localStorage.getItem("mathQuizResults") || "[]");
    localStorage.setItem("mathQuizResults", JSON.stringify([...previousResults, quiz].slice(-50)));
});
function initializeUI() {
    quiz.questions.forEach((_, i) => {
        const button = createElement("button", [`${i + 1}`]);
        button.addEventListener("click", () => {
            quiz.currentQuestionIndex = i;
            updateQuestionDisplay();
        });
        questionButtons.append(button);
    });
    updateUI();
}
function updateUI() {
    updateQuestionDisplay();
    updateQuestionButtons();
}
function updateQuestionDisplay() {
    questionNumberEl.textContent = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;
    questionEl.textContent = `${quiz.currentQuestion} = ?`;
    answerInput.value = `${quiz.currentAnswer ?? ""}`;
    answerInput.disabled = !!quiz.timeCompleted;
    feedbackEl.style.display = "none";
    prevBtn.disabled = quiz.currentQuestionIndex == 0;
    nextBtn.disabled = quiz.currentQuestionIndex == quiz.questions.length - 1;
    if (quiz.timeCompleted) {
        const isCorrect = quiz.checkAnswer(quiz.currentQuestionIndex);
        const correctAnswer = quiz.correctAnswers[quiz.currentQuestionIndex];
        feedbackEl.style.display = "block";
        feedbackEl.textContent = isCorrect ? "Correct!" : `Incorrect. Correct answer: ${correctAnswer}`;
        feedbackEl.className = `results ${isCorrect ? "" : "in"}correct`;
        resultsEl.textContent = completeMessage();
        resultsEl.style.display = "block";
        resultsEl.className = `results ${quiz.grade >= 50 ? "" : "in"}correct`;
    }
}
function updateQuestionButtons() {
    for (let i = 0; i < quiz.questions.length; i++) {
        const button = questionButtons.children[i];
        button.classList.toggle("answered", quiz.answers[i] != null);
        if (quiz.timeCompleted) {
            button.classList.add(quiz.checkAnswer(i) ? "correct" : "incorrect");
        }
    }
    finishBtn.disabled = !!quiz.timeCompleted;
}
function loadQuiz() {
    const quizId = new URL(window.location.href).searchParams.get("id");
    if (quizId == null)
        return new Quiz();
    return loadQuizzes().reverse()[Number(quizId)] || new Quiz();
}
function completeMessage() {
    return `Quiz Finished! You scored ${quiz.correctAnswerCount} out of ${quiz.questions.length}. Grade: ${quiz.grade}%`;
}
