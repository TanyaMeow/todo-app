import {makeAutoObservable} from "mobx";
import {TaskInterface} from "../components/TodoApp";
import {MockTodoApi} from "../TodoApi/TodoApi";

class TasksStore {
    private todoApi: MockTodoApi = new MockTodoApi();
    tasks: TaskInterface[] = []

    constructor() {
        makeAutoObservable(this, undefined, {autoBind: true});
        this.loadTasks();
    }

    private loadTasks(): void {
        this.todoApi.get()
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    public getTasks(): TaskInterface[] {
        return this.tasks;
    }

    public createTask(task: TaskInterface): void {
        this.todoApi.post(task)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    public updateTasks(task: TaskInterface): void {
        this.todoApi.update(task)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks
            })
    }

    public removeTask(id: number): void {
        this.todoApi.delete(id)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    public markCompletedTasks(): void {
        this.todoApi.markTasksCompleted()
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    public deleteCompletedTasks(): void {
        this.todoApi.deleteCompletedTasks()
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }
}

export const tasksStore: TasksStore = new TasksStore();