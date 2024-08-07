export interface ITask {
  id: number;
  text: string;
  created: number;
  completed?: number;
}

export default class Task implements ITask {
  private static readonly storageKey = "tasks";
  static id: number;
  static all: { [id: number]: Task };

  static load() {
    const tasks = JSON.parse(localStorage.getItem(Task.storageKey) || "[]") as ITask[];
    Task.id = 1;
    Task.all = tasks.reduce((tasks, task) => {
      tasks[task.id] = Task.fromData(task);
      Task.id = Math.max(task.id, Task.id);
      return tasks;
    }, {} as { [id: number]: Task });
  }

  static fromData({ id, text, created, completed }: ITask) {
    return new Task(id, text, created, completed);
  }

  static create(text: string) {
    return new Task(++Task.id, text, Date.now()).save();
  }

  static save() {
    localStorage.setItem(Task.storageKey, JSON.stringify(Object.values(Task.all)));
  }

  id;
  text;
  created;
  completed;

  constructor(id: number, text: string, created: number, completed?: number) {
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