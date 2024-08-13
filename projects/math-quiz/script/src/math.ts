import { Settings } from "./config.js";

export type Operation = "+" | "-" | "*" | "/";

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomOperation(operations: Operation[]) {
  const index = Math.floor(Math.random() * operations.length);
  return operations[index];
}

export function generateMathProblem({ operations, minValue, maxValue, numTerms }: Settings) {
  if (numTerms < 2) {
    throw new Error("Number of terms must be at least 2.");
  }

  let problem = `${getRandomNumber(minValue, maxValue)}`;

  for (let i = 1; i < numTerms; i++) {
    const operation = getRandomOperation(operations);
    let number = getRandomNumber(minValue, maxValue);

    // Avoid division by 0
    while (operation == "/" && !number) {
      number = getRandomNumber(minValue, maxValue);
    }

    problem += ` ${operation} ${number}`;
  }

  return problem;
}

export function solveMathProblem(problem: string) {
  const operators: Operation[] = [];
  const operands: number[] = [];

  const tokens = problem.split(" ");

  for (let i = 0; i < tokens.length; i++) {
    if (i % 2 == 0) {
      operands.push(parseFloat(tokens[i]));
    } else {
      operators.push(tokens[i] as Operation);
    }
  }

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] == "*" || operators[i] == "/") {
      const result = operators[i] == "*"
        ? operands[i] * operands[i + 1]
        : operands[i] / operands[i + 1];
      operands.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

  let result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] == "+") {
      result += operands[i + 1];
    } else if (operators[i] == "-") {
      result -= operands[i + 1];
    }
  }

  return result;
}

export function aboutEqual(a: number, b: number) {
  return Math.abs(a - b) < 1e-2;
}