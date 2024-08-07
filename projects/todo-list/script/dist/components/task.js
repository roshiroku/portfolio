import { iconButton } from "./ui.js";
import Task from "../Task.js";
export function taskItem(task) {
    const el = document.createElement("div");
    const checkboxCol = document.createElement("div");
    const textCol = document.createElement("div");
    const btnCol = document.createElement("div");
    const checkbox = taskCheckbox(task);
    const editBtn = iconButton("pencil");
    const removeBtn = taskRemoveBtn(task, () => el.remove());
    const setButtons = (...buttons) => {
        btnCol.innerHTML = "";
        btnCol.append(...buttons);
    };
    el.append(checkboxCol, textCol, btnCol);
    checkboxCol.append(checkbox);
    textCol.innerText = task.text;
    setButtons(editBtn, removeBtn);
    editBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        const confirmBtn = iconButton("check", () => {
            if (input.value) {
                textCol.innerText = task.text = input.value;
                setButtons(editBtn, removeBtn);
                Task.save();
            }
        });
        const cancelBtn = iconButton("x", () => {
            textCol.innerText = task.text;
            setButtons(editBtn, removeBtn);
        });
        textCol.innerText = "";
        textCol.append(input);
        input.value = task.text;
        setButtons(confirmBtn, cancelBtn);
    });
    return el;
}
export function taskCheckbox(task, onChange) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!task.completed;
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            task.completed ?? (task.completed = Date.now());
        }
        else {
            task.completed = undefined;
        }
        Task.save();
        if (onChange)
            onChange();
    });
    return checkbox;
}
export function taskRemoveBtn(task, onRemove) {
    const removeBtn = iconButton("trash");
    removeBtn.addEventListener("click", () => {
        if (confirm(`Remove ${task.text}?`)) {
            task.remove();
            if (onRemove)
                onRemove();
        }
    });
    return removeBtn;
}
