import { taskList } from "../components/task-list.js";
import Task from "../Task.js";
const tasks = Task.all;
document.body.append(taskList(Object.values(tasks)));
