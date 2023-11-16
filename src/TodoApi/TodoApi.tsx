import {TaskInterface} from "../store/TasksStore";

interface TodoApi {
    get(): TaskInterface[]
    post(task: TaskInterface): void
    update(modifiedTask: TaskInterface): void
    delete(id: number): void
    deleteCompletedTasks(): void
    markTasksCompleted(): void
}

// FIXME удали все запросы fetch. Это моковый сервис (DONE)
export class MockTodoApi implements TodoApi {
    private storage: Storage = localStorage;

    private setTasks(tasks: TaskInterface[]): void {
        this.storage.setItem('tasks', JSON.stringify(tasks));
    }

    private getTasks(): TaskInterface[] {
        return (this.storage.getItem('tasks') === null) ? [] : JSON.parse(this.storage.getItem('tasks') as string)
    }

    public get(): TaskInterface[] {
        return this.getTasks();
    }

    public post(task: TaskInterface): void {
        this.setTasks([...this.getTasks(), task]);
    }

    public update(modifiedTask: TaskInterface): void {
        const updatedTasks: TaskInterface[] = this.getTasks().map((task: TaskInterface): TaskInterface => {
            if (task.taskId === modifiedTask.taskId) {
                return modifiedTask;
            }
            return task;
        });

        this.setTasks(updatedTasks);
    }

    public delete(id: number): void {
        const newTasks: TaskInterface[] = this.getTasks().filter((task: TaskInterface) => task.taskId !== id);

        this.setTasks(newTasks);
    }

    public deleteCompletedTasks(): void {
        const newTasks: TaskInterface[] = this.getTasks().filter((task: TaskInterface) => !task.completed);

        this.setTasks(newTasks);
    }

    public markTasksCompleted(): void {
        const complete: TaskInterface[] = this.getTasks().map((task: TaskInterface) => {
            task.completed = true;

            return task;
        });

        this.setTasks(complete);
    }
}