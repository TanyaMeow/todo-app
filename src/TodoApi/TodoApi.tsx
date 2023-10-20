import {TaskInterface} from "../components/TodoApp";

export interface TodoApi {
    get(): any
    post(task: TaskInterface): void
    update(modifiedTask: TaskInterface): any
    delete(id: number) : any
    deleteCompletedTasks(): any
    markTasksCompleted() : any
}

export class MockTodoApi implements TodoApi {
    private storage = localStorage;
    private setTasks(tasks: TaskInterface[]): void {
        this.storage.setItem('tasks', JSON.stringify(tasks));
    }

    get(): any {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(() => {// @ts-ignore
                return (this.storage.getItem('tasks') === null) ? [] : JSON.parse(localStorage.getItem('tasks'))
                }
            )
    }

    post(task: TaskInterface): void {
        let tasks = this.get();
        // @ts-ignore
        this.storage.setItem('tasks', JSON.stringify([...tasks, task]));
    }

    update(modifiedTask: TaskInterface): TaskInterface[] {
        let tasks = this.get();

        const updatedTasks = tasks.map((task: TaskInterface) => {
            if (task.taskId === modifiedTask.taskId) {
                return modifiedTask;
            }
            return task;
        });
        this.setTasks(updatedTasks);

        // @ts-ignore
        return this.get();
    }

    delete(id: number): any {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'DELETE',
        })
            .then(() => {
                this.get()
                    .then((tasks: TaskInterface[]) => {
                        let newTasks: TaskInterface[] = tasks.filter((task: TaskInterface) => task.taskId !== id);
                        this.setTasks(newTasks);

                        return this.get();
                    });
            })
    }

    deleteCompletedTasks(): any {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'DELETE',
        })
            .then(() => {
                this.get()
                    .then((tasks: TaskInterface[]) => {
                    let newTasks: TaskInterface[] = tasks.filter((task: TaskInterface) => !task.completed);
                    this.setTasks(newTasks);

                    return this.get();
                });
            })
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