import {makeAutoObservable} from "mobx";
// FIXME store не может зависеть он модулей визуализации.
//  Перенеси TaskInterface сюда
import {TaskInterface} from "../components/TodoApp";
import {MockTodoApi} from "../TodoApi/TodoApi";

class TasksStore {
    // FIXME вынеси в конструктор, передавай инстанс в момент создания стора
    private todoApi: MockTodoApi = new MockTodoApi();
    tasks: TaskInterface[] = []

    constructor() {
        makeAutoObservable(this, undefined, {autoBind: true});
        // FIXME стор не может знать, когда ему следует загрузить данные
        //  если я зайду в приложение и не будут использовать страницу с туду, то они все равно загрузятся
        //  это избыточная нагрузка на сервер + избытычные действия для клиента
        this.loadTasks();
    }

    private loadTasks(): void {
        // FIXME мы не используем then, если можем использовать await
        //  читаемость кода в цепочках сильно ниже
        // FIXME поправь везде где есть then
        this.todoApi.get()
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    // FIXME нет смысла в этой функции, tasks - public
    public getTasks(): TaskInterface[] {
        return this.tasks;
    }

    public createTask(task: TaskInterface): void {
        this.todoApi.post(task)
            // FIXME метод отвечает за создание таски, он не должен запрашивать данные
            //  ты можешь запросить данные внутри компонента, либо тут можешь руками добавить новую таску в this.tasks
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    public updateTasks(task: TaskInterface): void {
        this.todoApi.update(task)
            // FIXME логика такая же как и при создании
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks
            })
    }

    public removeTask(id: number): void {
        this.todoApi.delete(id)
            // FIXME логика такая же как и при создании
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    public markCompletedTasks(): void {
        this.todoApi.markTasksCompleted()
            // FIXME логика такая же как и при создании
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }

    public deleteCompletedTasks(): void {
        this.todoApi.deleteCompletedTasks()
            // FIXME логика такая же как и при создании
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]): void => {
                this.tasks = tasks;
            })
    }
}

export const tasksStore: TasksStore = new TasksStore();