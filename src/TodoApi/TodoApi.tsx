import {TaskInterface} from "../components/TodoApp";

export interface TodoApi {
    get(): TaskInterface[]
    post(task: TaskInterface): void
    update(task: TaskInterface[], id: number, newTask: TaskInterface): TaskInterface[]
    delete(tasks: TaskInterface[], id: number) : TaskInterface[]
    deleteCompletedTasks(tasks: TaskInterface[], complete: boolean): TaskInterface[]
    markTasksCompleted(tasks: TaskInterface[]) : TaskInterface[]
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
        // @ts-ignore
        const tasks:TaskInterface[] = this.get();
        this.storage.setItem('tasks', JSON.stringify([...tasks, task]));
    }

    update(tasks: TaskInterface[], id: number, newTask: TaskInterface): TaskInterface[] {
        const updatedTasks = tasks.map(task => {
            if (task.taskId === id) {
                return newTask;
            }
            return task;
        });
        this.setTasks(updatedTasks);

        // @ts-ignore
        return this.get();
    }

    delete(tasks: TaskInterface[], id: number): TaskInterface[] {
        let newTasks: TaskInterface[] = tasks.filter((task: TaskInterface) => task.taskId !== id);
        this.setTasks(newTasks);

        // @ts-ignore
        return this.get();
    }

    deleteCompletedTasks(tasks: TaskInterface[], complete: boolean): TaskInterface[] {
        let newTasks: TaskInterface[] = tasks.filter((task: TaskInterface) => task.completed !== complete);
        this.setTasks(newTasks);

        return this.get();
    }

    markTasksCompleted(tasks: TaskInterface[]): TaskInterface[] {
        let complete = tasks.map((task: TaskInterface) => {
            task.completed = true;

            return task;
        })
        this.setTasks(complete);

        return this.get();
    }
}