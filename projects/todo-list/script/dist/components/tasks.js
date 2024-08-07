import { dateISO } from "../utils.js";
import { taskItem } from "./task.js";
import { iconButton } from "./ui.js";
export function taskList(tasks) {
    const el = document.createElement("div");
    const input = taskInput();
    const tasksByDate = tasks.reduce((all, task) => {
        const date = dateISO(task.date);
        if (!all[date])
            all[date] = [];
        all[date].push(task);
        return all;
    }, {});
    el.append(input);
    Object.keys(tasksByDate).sort((a, b) => Number(a) - Number(b))
        .forEach(date => el.append(dateTasks(date, tasksByDate[date])));
    return el;
}
export function taskInput(onAdd) {
    const el = document.createElement("div");
    const textInput = document.createElement("input");
    const dateInput = document.createElement("input");
    const submitBtn = document.createElement("button");
    textInput.placeholder = "New task";
    dateInput.type = "date";
    dateInput.valueAsNumber = Date.now();
    submitBtn.innerText = "Add";
    el.append(textInput, dateInput, submitBtn);
    submitBtn.addEventListener("click", () => {
        if (textInput.value && dateInput.value) {
        }
    });
    return el;
}
export function dateTasks(date, tasks, expand = false) {
    const el = document.createElement("div");
    const heading = document.createElement("div");
    const expandBtn = iconButton(expand ? "caret-up" : "caret-down");
    const taskItems = document.createElement("div");
    el.append(heading);
    heading.innerText = new Date(date).toLocaleDateString();
    heading.append(expandBtn);
    expandBtn.addEventListener("click", () => {
        if (expand = !expand) {
            el.append(taskItems);
            expandBtn.innerHTML = /* html */ `<i class="fas fa-caret-up"></i>`;
        }
        else {
            taskItems.remove();
            expandBtn.innerHTML = /* html */ `<i class="fas fa-caret-down"></i>`;
        }
    });
    tasks.forEach(task => taskItems.append(taskItem(task)));
    return el;
}
