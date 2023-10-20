import {TaskInterface} from "../components/TodoApp";

export interface TodoApi {
    get(): TaskInterface[]
    post(task: TaskInterface): void
    update(modifiedTask: TaskInterface): TaskInterface[]
    delete(id: number) : TaskInterface[]
    deleteCompletedTasks(): TaskInterface[]
    markTasksCompleted() : TaskInterface[]
}

export class MockTodoApi implements TodoApi {
    private storage = localStorage;
    private setTasks(tasks: TaskInterface[]): void {
        this.storage.setItem('tasks', JSON.stringify(tasks));
    }

    get(): TaskInterface[] {
        // @ts-ignore
        return (this.storage.getItem('tasks') === null) ? [] : JSON.parse(localStorage.getItem('tasks'));
    }

    post(task: TaskInterface): void {
        let tasks = this.get();
        // @ts-ignore
        this.storage.setItem('tasks', JSON.stringify([...tasks, task]));
    }

    update(modifiedTask: TaskInterface): TaskInterface[] {
        let tasks = this.get();

        const updatedTasks = tasks.map(task => {
            if (task.taskId === modifiedTask.taskId) {
                return modifiedTask;
            }
            return task;
        });
        this.setTasks(updatedTasks);

        // @ts-ignore
        return this.get();
    }

    delete(id: number): TaskInterface[] {
        let tasks = this.get();
        let newTasks: TaskInterface[] = tasks.filter((task: TaskInterface) => task.taskId !== id);
        this.setTasks(newTasks);

        // @ts-ignore
        return this.get();
    }

    deleteCompletedTasks(): TaskInterface[] {
        let tasks = this.get();
        let newTasks: TaskInterface[] = tasks.filter((task: TaskInterface) => !task.completed);
        this.setTasks(newTasks);

        return this.get();
    }

    markTasksCompleted(): TaskInterface[] {
        let tasks = this.get();
        let complete = tasks.map((task: TaskInterface) => {
            task.completed = true;

            return task;
        })
        this.setTasks(complete);

        return this.get();
    }
}