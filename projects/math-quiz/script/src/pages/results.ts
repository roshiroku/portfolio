import Quiz from "../Quiz.js";

const tbody = document.getElementsByTagName("tbody")[0];
const results: Quiz[] = JSON.parse(localStorage.getItem("math-quiz-results") || "[]").map((result: Quiz) => {
  const quiz = new Quiz(result.questions.length, result.settings, result);
  quiz.timeStarted = result.timeStarted;
  quiz.timeCompleted = result.timeCompleted;
  return quiz;
});

results.reverse().forEach((quiz, i) => {
  tbody.innerHTML += /* html */`
    <td>${i + 1}</td>
    <td>${new Date(quiz.timeStarted).toLocaleDateString()}</td>
    <td>${quiz.correctAnswerCount}/${quiz.questions.length}</td>
    <td>${quiz.grade}%</td>
    <td>${quiz.timeCompleted ? formatDuration(quiz.timeCompleted - quiz.timeStarted) : ""}</td>
    <td>
      <a href="./quiz.html?id=${i}" target="_blank">
        <i class="fas fa-up-right-from-square"></i>
      </a>
    </td>`;
});

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = remainingMinutes.toString().padStart(2, '0');
  const secondsString = remainingSeconds.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}:${secondsString}`;
}