class Task {
    static load() {
        const tasks = JSON.parse(localStorage.getItem(Task.storageKey) || "[]");
        Task.id = 1;
        Task.all = tasks.reduce((tasks, task) => {
            tasks[task.id] = Task.fromData(task);
            Task.id = Math.max(task.id, Task.id);
            return tasks;
        }, {});
    }
    static fromData({ id, text, created, completed }) {
        return new Task(id, text, created, completed);
    }
    static create(text) {
        return new Task(++Task.id, text, Date.now()).save();
    }
    static save() {
        localStorage.setItem(Task.storageKey, JSON.stringify(Object.values(Task.all)));
    }
    constructor(id, text, created, completed) {
        this.id = id;
        this.text = text;
        this.created = created;
        this.completed = completed;
    }
    remove() {
        delete Task.all[this.id];
        Task.save();
    }
    save() {
        Task.all[this.id] = this;
        Task.save();
        return this;
    }
}
Task.storageKey = "tasks";
export default Task;
