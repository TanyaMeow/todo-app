import {makeAutoObservable} from "mobx";
import {TaskInterface} from "../components/TodoApp";
import {MockTodoApi} from "../TodoApi/TodoApi";

class TasksStore {
    private todoApi = new MockTodoApi();
    tasks: TaskInterface[] = []

    constructor() {
        makeAutoObservable(this);
        this.loadTasks();
    }

    private loadTasks() {
        this.todoApi.get()
            .then((tasks: TaskInterface[]) => {
                this.tasks = tasks;
            })
    }

    getTasks(): TaskInterface[] {
        return this.tasks;
    }

    createTask(task: TaskInterface) {
        this.todoApi.post(task)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.tasks = tasks;
            })
    }

    updateTasks(task: TaskInterface) {
        this.todoApi.update(task)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.tasks = tasks
            })
    }

    removeTask(id: number) {
        this.todoApi.delete(id)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.tasks = tasks;
            })
    }

    markCompletedTasks() {
        this.todoApi.markTasksCompleted()
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.tasks = tasks;
            })
    }

    deleteCompletedTasks() {
        this.todoApi.deleteCompletedTasks()
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.tasks = tasks;
            })
    }
}

export const tasksStore = new TasksStore();