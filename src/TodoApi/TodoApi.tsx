import {TaskInterface} from "../components/TodoApp";

export interface TodoApi {
    get(): Promise<TaskInterface[]>
    post(task: TaskInterface): Promise<void>
    update(modifiedTask: TaskInterface): Promise<void>
    delete(id: number): Promise<void>
    deleteCompletedTasks(): Promise<void>
    markTasksCompleted(): Promise<void>
}

export class MockTodoApi implements TodoApi {
    private storage: Storage = localStorage;

    private setTasks(tasks: TaskInterface[]): void {
        this.storage.setItem('tasks', JSON.stringify(tasks));
    }

    private getTasks(): TaskInterface[] {
        return (this.storage.getItem('tasks') === null) ? [] : JSON.parse(this.storage.getItem('tasks') as string)
    }

    public async get(): Promise<TaskInterface[]> {
        await fetch('https://jsonplaceholder.typicode.com/todos');
        return this.getTasks();
    }

    public async post(task: TaskInterface): Promise<void> {
        await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        this.setTasks([...this.getTasks(), task]);
    }

    public async update(modifiedTask: TaskInterface): Promise<void> {
        await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'PUT',
            body: JSON.stringify(modifiedTask),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const updatedTasks: TaskInterface[] = this.getTasks().map((task: TaskInterface): TaskInterface => {
            if (task.taskId === modifiedTask.taskId) {
                return modifiedTask;
            }
            return task;
        });
        this.setTasks(updatedTasks);
    }

    public async delete(id: number): Promise<void> {
        await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'DELETE',
        });
        const newTasks: TaskInterface[] = this.getTasks().filter((task: TaskInterface) => task.taskId !== id);
        this.setTasks(newTasks);
    }

    public async deleteCompletedTasks(): Promise<void> {
        await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'DELETE',
        });
        const newTasks: TaskInterface[] = this.getTasks().filter((task: TaskInterface) => !task.completed);
        this.setTasks(newTasks);
    }

    public async markTasksCompleted(): Promise<void> {
        await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(null),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const complete: TaskInterface[] = this.getTasks().map((task: TaskInterface) => {
            task.completed = true;

            return task;
        });
        this.setTasks(complete);
    }
}