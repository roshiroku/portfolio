import Quiz from "./Quiz.js";

export function loadQuizzes() {
  return JSON.parse(localStorage.getItem("math-quiz-results") || "[]").map((result: Quiz) => {
    const quiz = new Quiz(result.questions.length, result.settings, result);
    quiz.timeStarted = result.timeStarted;
    quiz.timeCompleted = result.timeCompleted;
    return quiz;
  }) as Quiz[];
}

function createElement<T extends keyof HTMLElementTagNameMap>(tagName: T): HTMLElementTagNameMap[T];
function createElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  children: (HTMLElement | string)[]
): HTMLElementTagNameMap[T];
function createElement<T extends keyof HTMLElementTagNameMap, K extends keyof HTMLElementTagNameMap[T]>(
  tagName: T,
  attrs: { [P in K]?: HTMLElementTagNameMap[T][P] },
  children?: (HTMLElement | string)[]
): HTMLElementTagNameMap[T];
function createElement<T extends keyof HTMLElementTagNameMap, K extends keyof HTMLElementTagNameMap[T]>(
  tagName: T,
  attrsOrChildren?: { [P in K]?: HTMLElementTagNameMap[T][P] } | (HTMLElement | string)[],
  children: (HTMLElement | string)[] = []
) {
  const el = document.createElement(tagName) as HTMLElementTagNameMap[T];

  if (Array.isArray(attrsOrChildren)) {
    // Case where attrsOrChildren is the children array
    el.append(...attrsOrChildren);
  } else if (attrsOrChildren) {
    // Case where attrsOrChildren is the attributes object
    for (const key in attrsOrChildren) {
      if (attrsOrChildren.hasOwnProperty(key)) {
        (el as any)[key] = attrsOrChildren[key as K];
      }
    }
    // Append children if provided
    el.append(...children);
  }

  return el;
}

export { createElement };