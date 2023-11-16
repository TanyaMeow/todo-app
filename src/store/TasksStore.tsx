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

    public async loadTasks(): Promise<void> {
        this.tasks = await this.todoApi.get();
    }

    public async createTask(task: TaskInterface): Promise<void> {
        await this.todoApi.post(task);
        this.tasks.push(task);
    }

    public async updateTasks(task: TaskInterface): Promise<void> {
        await this.todoApi.update(task);
        // FIXME тут не push нужен. Нужно найти по taskId таску и заменить на обновленную
        this.tasks.push(task);
    }

    public async removeTask(id: number): Promise<void> {
        await this.todoApi.delete(id);
        // FIXME нужно удалить из this.tasks
    }

    public async markCompletedTasks(): Promise<void> {
        await this.todoApi.markTasksCompleted();
        // FIXME нужно обновить this.tasks
    }

    public async deleteCompletedTasks(): Promise<void> {
        await this.todoApi.deleteCompletedTasks()
        // FIXME нужно обновить this.tasks
    }
}

export const tasksStore: TasksStore = new TasksStore(new MockTodoApi());