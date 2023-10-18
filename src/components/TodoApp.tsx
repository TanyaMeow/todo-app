import React, {Component} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";
import {PopupCreateTask} from "./PopupCreateTask";

import {PopupChangeTask} from "./PopupChangeTask";
import {MockTodoApi, TodoApi} from "../TodoApi/TodoApi";

export interface task {
    title: string,
    taskId: number,
    completed: boolean
}
type TodoAppState = {
    tasks: task[],
    ascent: boolean,
    change: boolean,
    id: number
}
type TodoAppProps = {

}

export class TodoApp extends Component<TodoAppProps, TodoAppState>{
    todoApi: TodoApi = new MockTodoApi();

    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [],
            ascent: false,
            change: false,
            id: 0
        }
    }

    changeAscent(change: boolean): void {
        this.setState({...this.state, ascent: change});
    }

    changeTaskPopup(change: boolean, id: number): void {
        this.setState((state: any) => {
            return {...state, id: id, change: change}
        });
    }

    setTask(task: task) {
        // this.todoApi.post(task);
        // @ts-ignore
        this.setState({...this.state, tasks: this.state.tasks.push(task)});
    }

    changeTask(id: number, newTask: task): void {

        this.setState((state: TodoAppState) => {
            const updatedTasks = state.tasks.map(task => {
                if (task.taskId === id) {
                    return newTask;
                }
                return task;
            });

            return { ...state, tasks: updatedTasks };
        });
    }

    removeTask(id: number): void {
        let newTasks: task[] = this.state.tasks.filter((task: task) => task.taskId !== id);
        this.setState({...this.state, tasks: newTasks});
    }

    render() {
        return (
            <div className="todo_task_container">
                <PopupCreateTask ascent={this.state.ascent}
                                 onClosingPopup={(change: boolean) => this.changeAscent(change)}
                                 onNewTask={(task: task) => this.setTask(task)}
                />
                <PopupChangeTask onClosingPopup={(change: boolean, id: number) => this.changeTaskPopup(change, id)}
                                 change={this.state.change}
                                 id={this.state.id}
                                 onChangeTask={(id: number, newTask: task) => this.changeTask(id, newTask)}/>
                <div className="header_todo">
                    <h1 className="title">TODOTask</h1>
                    <FunctionalTasks />
                </div>
                <TasksContainer tasks = {this.state.tasks}
                                onRemoveTask={(id: number) => this.removeTask(id)}
                                onClosingPopup = {(change: boolean, id: number) => this.changeTaskPopup(change, id)}/>
                <ButtonCreateTask onChangeAscent = {(change: boolean) => this.changeAscent(change)}/>
            </div>
        )
    }
}