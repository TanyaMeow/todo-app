import {makeAutoObservable} from "mobx";
// FIXME store не может зависеть он модулей визуализации.
//  Перенеси TaskInterface сюда (DONE)
import {MockTodoApi} from "../TodoApi/TodoApi";

export interface TaskInterface {
    title: string,
    taskId: number,
    completed: boolean
}

class TasksStore {
    public tasks: TaskInterface[] = []

    constructor(private todoApi: MockTodoApi) {
        makeAutoObservable(this, undefined, {autoBind: true});
    }

    public loadTasks(): void {
        this.tasks = this.todoApi.get();
    }

    public createTask(task: TaskInterface): void {
        this.todoApi.post(task);
        this.tasks.push(task);
    }

    public updateTasks(modifiedTask: TaskInterface): void {
        this.todoApi.update(modifiedTask);
        // FIXME тут не push нужен. Нужно найти по taskId таску и заменить на обновленную (DONE)
        this.tasks = this.tasks.map((task: TaskInterface): TaskInterface => {
            if (task.taskId === modifiedTask.taskId) {
                return modifiedTask;
            }
            return task;
        });
    }

    public removeTask(id: number): void {
        this.todoApi.delete(id);
        // FIXME нужно удалить из this.tasks (DONE)
        this.tasks = this.tasks.filter((task: TaskInterface) => task.taskId !== id);
    }

    public markCompletedTasks(): void {
        this.todoApi.markTasksCompleted();
        // FIXME нужно обновить this.tasks (DONE)
        this.tasks = this.tasks.map((task: TaskInterface) => {
            task.completed = true;

            return task;
        });
    }

    public deleteCompletedTasks(): void {
        this.todoApi.deleteCompletedTasks()
        // FIXME нужно обновить this.tasks (DONE)
        this.tasks = this.tasks.filter((task: TaskInterface) => !task.completed)
    }
}

export const tasksStore: TasksStore = new TasksStore(new MockTodoApi());