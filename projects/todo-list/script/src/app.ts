import { taskInput, taskList } from "./components/task-list.js";
import Task from "./Task.js";

Task.load();

document.body.children[0].append(taskList(Object.values(Task.all)));