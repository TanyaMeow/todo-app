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
    id: number,
    title: string
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
            id: 0,
            title: ''
        }

        this.setTaskComplete = this.setTaskComplete.bind(this);
        this.setTask = this.setTask.bind(this);
    }

    componentDidMount() {
        // @ts-ignore
        this.setState({...this.state, tasks: this.todoApi.get()});
    }

    changeAscent(change: boolean): void {
        this.setState({...this.state, ascent: change});
    }

    changeTaskPopup(change: boolean, id: number, title: string): void {
        this.setState((state: any) => {
            return {...state, id: id, change: change, title: title}
        });

        console.log(this.state.title);
    }

    setTask(task: TaskInterface) {
        this.todoApi.post(task);

        // @ts-ignore
        this.setState((state) => {
            const tasks = this.todoApi.get();
            return {...state, tasks: [...tasks], ascent: false}
        });
    }

    changeTask(id: number, newTask: TaskInterface): void {
        this.setState((state: TodoAppState) => {
            return {...state, tasks: this.todoApi.update(this.state.tasks, id, newTask)};
        });
    }

    removeTask(id: number): void {
        this.setState({...this.state, tasks: this.todoApi.delete(this.state.tasks, id)});
    }

    removeCompletedTask(complete: boolean) {
        this.setState({...this.state, tasks: this.todoApi.deleteCompletedTasks(this.state.tasks, complete)});
    }

    setTaskComplete(): void {
        this.setState((state: any) => {
            return {...state, tasks: this.todoApi.markTasksCompleted(this.state.tasks)}
        })
    }

    setComplete(id: number, status: boolean) {
        let complete = this.state.tasks.map((task: TaskInterface) => {
            if (task.taskId === id) {
                task.completed = status;

                return task;
            }

            return task;
        })

        this.setState((state: any) => {
            return {...state, tasks: complete}
        })
    }

    render() {
        return (
            <div className="todo_task_container">
                <PopupCreateTask ascent={this.state.ascent}
                                 onClosingPopup={(change: boolean) => this.changeAscent(change)}
                                 onNewTask={(task: TaskInterface) => this.setTask(task)}
                />
                <PopupChangeTask onClosingPopup={(change: boolean, id: number, title: string) => this.changeTaskPopup(change, id, title)}
                                 change={this.state.change}
                                 id={this.state.id}
                                 title={this.state.title}
                                 onChangeTask={(id: number, newTask: TaskInterface) => this.changeTask(id, newTask)}/>
                <div className="header_todo">
                    <h1 className="title">TODOTask</h1>
                    <FunctionalTasks onCompleteTasks={() => this.setTaskComplete()}
                                     onRemoveCompleteTask={(complete: boolean) => this.removeCompletedTask(complete)}/>
                </div>
                <TasksContainer tasks={this.state.tasks}
                                onRemoveTask={(id: number) => this.removeTask(id)}
                                onClosingPopup={(change: boolean, id: number, title: string) => this.changeTaskPopup(change, id, title)}
                                onCompleteTask={(id: number, status: boolean) => this.setComplete(id, status)}/>
                <ButtonCreateTask onChangeAscent={(change: boolean) => this.changeAscent(change)}/>
            </div>
        )
    }
}