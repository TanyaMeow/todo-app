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
        // @ts-ignore
        this.setState({...this.state, tasks: this.todoApi.get()});
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
        this.todoApi.post(task);

        // @ts-ignore
        this.setState((state) => {
            const tasks = this.todoApi.get();
            return {...state, tasks: [...tasks], ascent: false}
        });
    }

    changeTask(task: TaskInterface): void {
        this.setState((state: TodoAppState) => {
            return {...state, change: false, tasks: this.todoApi.update(task)};
        });
    }

    removeTask(id: number): void {
        this.setState({...this.state, tasks: this.todoApi.delete(id)});
    }

    removeCompletedTask() {
        this.setState({...this.state, tasks: this.todoApi.deleteCompletedTasks()});
    }

    setTaskComplete(): void {
        this.setState((state: any) => {
            return {...state, tasks: this.todoApi.markTasksCompleted()}
        })
    }

    setComplete(task: TaskInterface) {
        this.setState((state: TodoAppState) => {
            return {...state, tasks: this.todoApi.update(task)};
        });
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