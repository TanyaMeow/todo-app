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
    // FIXME вынеси в конструктор, передавай инстанс в момент создания стора (DONE)
    public tasks: TaskInterface[] = []

    constructor(private todoApi: MockTodoApi) {
        makeAutoObservable(this, undefined, {autoBind: true});
        // FIXME стор не может знать, когда ему следует загрузить данные
        //  если я зайду в приложение и не будут использовать страницу с туду, то они все равно загрузятся
        //  это избыточная нагрузка на сервер + избытычные действия для клиента (DONE)
    }

    public async loadTasks(): Promise<void> {
        // FIXME мы не используем then, если можем использовать await
        //  читаемость кода в цепочках сильно ниже (DONE)
        // FIXME поправь везде где есть then (DONE)
        this.tasks = await this.todoApi.get();
    }

    // FIXME нет смысла в этой функции, tasks - public (DONE)

    public async createTask(task: TaskInterface): Promise<void> {
        await this.todoApi.post(task);
        this.tasks.push(task);

        // FIXME метод отвечает за создание таски, он не должен запрашивать данные
        //  ты можешь запросить данные внутри компонента, либо тут можешь руками добавить новую таску в this.tasks (DONE)
    }

    public async updateTasks(task: TaskInterface): Promise<void> {
        await this.todoApi.update(task);
        this.tasks.push(task);
        // FIXME логика такая же как и при создании (DONE)
    }

    public async removeTask(id: number): Promise<void> {
        await this.todoApi.delete(id);
        // FIXME логика такая же как и при создании (DONE)
    }

    public async markCompletedTasks(): Promise<void> {
        await this.todoApi.markTasksCompleted();
        // FIXME логика такая же как и при создании (DONE)
    }

    public async deleteCompletedTasks(): Promise<void> {
        await this.todoApi.deleteCompletedTasks()
        // FIXME логика такая же как и при создании (DONE)
    }
}

export const tasksStore: TasksStore = new TasksStore(new MockTodoApi());