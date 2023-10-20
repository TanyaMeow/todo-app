import React, {Component} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";
import {PopupCreateTask} from "./PopupCreateTask";

import {PopupChangeTask} from "./PopupChangeTask";
import {MockTodoApi, TodoApi} from "../TodoApi/TodoApi";

export interface TaskInterface {
    title: string,
    taskId: number,
    completed: boolean
}

type TodoAppState = {
    tasks: TaskInterface[],
    ascent: boolean,
    change: boolean,
    taskCreate: {
        taskId: number,
        title: string,
        completed: boolean
    }
}
type TodoAppProps = {}

export class TodoApp extends Component<TodoAppProps, TodoAppState> {
    todoApi: TodoApi = new MockTodoApi();

    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [],
            ascent: false,
            change: false,
            taskCreate: {
                taskId: 0,
                title: '',
                completed: false
            }
        }

        this.setTaskComplete = this.setTaskComplete.bind(this);
        this.setTask = this.setTask.bind(this);
    }

    componentDidMount() {
        this.todoApi.get()
            .then((tasks: TaskInterface[]) => {
                this.setState({...this.state, tasks: tasks});
            })
    }

    closingTaskPopupCreate(change: boolean): void {
        this.setState({...this.state, ascent: change});
    }

    closingTaskPopupChange(change: boolean): void {
        this.setState((state: any) => {
            return {...state, change: change}
        });
    }

    changeTaskCreate(task: TaskInterface) {
        this.setState((state: TodoAppState) => {
            return {...state, taskCreate: task};
        });
    }

    setTask(task: TaskInterface) {
        this.todoApi.post(task)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.setState((state) => {
                    return {...state, tasks: [...tasks], ascent: false}
                });
            })
    }

    changeTask(task: TaskInterface): void {
        this.todoApi.update(task)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.setState((state: TodoAppState) => {
                    return {...state, change: false, tasks: tasks};
                });
            })
    }

    removeTask(id: number): void {
        this.todoApi.delete(id)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.setState({...this.state, tasks: tasks});
            })

    }

    removeCompletedTask() {
        this.todoApi.deleteCompletedTasks()
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.setState({...this.state, tasks: tasks})
            })
    }

    setTaskComplete(): void {
        this.todoApi.markTasksCompleted()
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.setState({...this.state, tasks: tasks})
            })
    }

    setComplete(task: TaskInterface) {
        this.todoApi.update(task)
            .then(() => this.todoApi.get())
            .then((tasks: TaskInterface[]) => {
                this.setState((state: TodoAppState) => {
                    return {...state, tasks: tasks};
                });
            })
    }

    render() {
        return (
            <div className="todo_task_container">
                <PopupCreateTask ascent={this.state.ascent}
                                 onClosingPopup={(change: boolean) => this.closingTaskPopupCreate(change)}
                                 onNewTask={(task: TaskInterface) => this.setTask(task)}
                />
                <PopupChangeTask onClosingPopup={(change: boolean) => this.closingTaskPopupChange(change)}
                                 change={this.state.change}
                                 taskCreate={this.state.taskCreate}
                                 onChangeTask={(task: TaskInterface) => this.changeTask(task)}/>
                <div className="header_todo">
                    <h1 className="title">TODOTask</h1>
                    <FunctionalTasks onCompleteTasks={() => this.setTaskComplete()}
                                     onRemoveCompleteTask={() => this.removeCompletedTask()}/>
                </div>
                <TasksContainer tasks={this.state.tasks}
                                onRemoveTask={(id: number) => this.removeTask(id)}
                                onClosingPopup={(change: boolean) => this.closingTaskPopupChange(change)}
                                onCompleteTask={(task: TaskInterface) => this.setComplete(task)}
                                onChangeTaskNew={(task: TaskInterface) => this.changeTaskCreate(task)}/>
                <ButtonCreateTask onChangeAscent={(change: boolean) => this.closingTaskPopupCreate(change)}/>
            </div>
        )
    }
}