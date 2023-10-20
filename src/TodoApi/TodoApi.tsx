import {TaskInterface} from "../components/TodoApp";

export interface TodoApi {
    get(): Promise<TaskInterface[]>
    post(task: TaskInterface): Promise<void>
    update(modifiedTask: TaskInterface): Promise<void>
    delete(id: number) : Promise<void>
    deleteCompletedTasks(): Promise<void>
    markTasksCompleted() : Promise<void>
}

export class MockTodoApi implements TodoApi {
    private storage = localStorage;

    private setTasks(tasks: TaskInterface[]): void {
        this.storage.setItem('tasks', JSON.stringify(tasks));
    }

    private getTasks(): TaskInterface[] {
        return (this.storage.getItem('tasks') === null) ? [] : JSON.parse(this.storage.getItem('tasks') as string)
    }

    get(): Promise<TaskInterface[]> {
        return fetch('https://jsonplaceholder.typicode.com/todos')
            .then(() => this.getTasks())
    }

    post(task: TaskInterface): Promise<void> {
        return fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(() => {
                this.setTasks([...this.getTasks(), task]);
            });
    }

    update(modifiedTask: TaskInterface): Promise<void> {
        return fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'PUT',
            body: JSON.stringify(modifiedTask),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(() => {
                const updatedTasks = this.getTasks().map((task: TaskInterface) => {
                    if (task.taskId === modifiedTask.taskId) {
                        return modifiedTask;
                    }
                    return task;
                });
                this.setTasks(updatedTasks);
            });
    }

    delete(id: number): Promise<void> {
        return fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'DELETE',
        })
            .then(() => {
                const newTasks: TaskInterface[] = this.getTasks().filter((task: TaskInterface) => task.taskId !== id);
                this.setTasks(newTasks);
            });
    }

    deleteCompletedTasks(): Promise<void> {
        return fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'DELETE',
        })
            .then(() => {
                const newTasks: TaskInterface[] = this.getTasks().filter((task: TaskInterface) => !task.completed);
                this.setTasks(newTasks);
            });
    }

    markTasksCompleted(): Promise<void> {
        return fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(null),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(() => {
                const complete: TaskInterface[] = this.getTasks().map((task: TaskInterface) => {
                    task.completed = true;

                    return task;
                })

                this.setTasks(complete);
            });
    }
}