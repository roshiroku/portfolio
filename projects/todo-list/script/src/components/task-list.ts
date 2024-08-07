import { taskItem } from "./task-item.js";
import Task from "../Task.js";
import { button } from "./ui.js";

export enum TaskStatus {
  None,
  Complete,
  Incomplete
}

export function taskList(tasks: Task[]) {
  const el = document.createElement("div");
  const items = document.createElement("div");
  const onFilter = (val: TaskStatus) => {
    Object.keys(TaskStatus).forEach(stat =>
      isNaN(Number(stat)) && items.classList.remove(`filter-${stat.toLowerCase()}`));
    if (val) items.classList.add(`filter-${TaskStatus[val].toLowerCase()}`);
  };
  const filter = taskFilter(onFilter);
  const input = taskInput(task => {
    onFilter(TaskStatus.None);
    filter.replaceWith(taskFilter(onFilter));
    items.prepend(taskItem(task));
  });

  el.className = "task-list";
  el.append(input, filter, items);
  items.className = "task-items";
  tasks.forEach(task => items.prepend(taskItem(task)));

  return el;
}

export function taskInput(onAdd?: (task: Task) => void) {
  const el = document.createElement("div");
  const input = document.createElement("input");
  const submitBtn = button("Add", () => {
    if (input.value) {
      const task = Task.create(input.value);
      input.value = "";
      if (onAdd) onAdd(task);
    }
  });

  el.className = "task-input";
  el.append(input, submitBtn);
  input.placeholder = "New task";

  return el;
}

export function taskFilter(onChange?: (value: TaskStatus) => void) {
  const el = document.createElement("div");
  const select = document.createElement("select");
  const label = document.createElement("label") as HTMLLabelElement;

  el.className = "task-filter";
  el.append(label, select);
  label.innerText = "Filter";
  label.htmlFor = "task-filter";
  select.id = "task-filter";
  select.addEventListener("change", () =>
    onChange && onChange(TaskStatus[select.value as keyof typeof TaskStatus]));
  Object.keys(TaskStatus).forEach(stat =>
    isNaN(Number(stat)) && (select.innerHTML += /* html */`<option>${stat}</option>`));

  return el;
}