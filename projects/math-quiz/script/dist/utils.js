import Quiz from "./Quiz.js";
export function loadQuizzes() {
    return JSON.parse(localStorage.getItem("math-quiz-results") || "[]").map((result) => {
        const quiz = new Quiz(result.questions.length, result.settings, result);
        quiz.timeStarted = result.timeStarted;
        quiz.timeCompleted = result.timeCompleted;
        return quiz;
    });
}
function createElement(tagName, attrsOrChildren, children = []) {
    const el = document.createElement(tagName);
    if (Array.isArray(attrsOrChildren)) {
        // Case where attrsOrChildren is the children array
        el.append(...attrsOrChildren);
    }
    else if (attrsOrChildren) {
        // Case where attrsOrChildren is the attributes object
        for (const key in attrsOrChildren) {
            if (attrsOrChildren.hasOwnProperty(key)) {
                el[key] = attrsOrChildren[key];
            }
        }
        // Append children if provided
        el.append(...children);
    }
    return el;
}
export { createElement };
