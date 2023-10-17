import React, {Component} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";
import {PopupCreateTask} from "./PopupCreateTask";

import {TodoApi} from "../TodoApi/TodoApi";
import {PopupChangeTask} from "./PopupChangeTask";

class MockTodoApi implements TodoApi {
    static GET(): [{ }] {
        // @ts-ignore
        return (localStorage.getItem('tasks') === null) ? [] : JSON.parse(localStorage.getItem('tasks'));
    }

    static POST(task: object): void {
        // @ts-ignore
        const tasks = this.GET();
        localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
    }

    static UPDATE(task: {}): {} {
        return {};
    }

    static DELETE(task: {} | [{}]): void {

    }
}

export class TodoApp extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [],
            ascent: false,
            change: false
        }
    }

    changeAscent(change: boolean): void {
        this.setState({...this.state, ascent: change});
    }

    setTask(task: object) {
        MockTodoApi.POST(task);
        this.setState({tasks: this.state.tasks.push(task)});
    }

    changeTask(id: number, change: boolean, title: string) {
        this.changeAscent(change);
    }

    changeTaskPopup(change: boolean) {
        this.setState({...this.state, change: change});
    }

    removeTask(id: number) {
        let newTasks = this.state.tasks.filter((task: any) => task.taskId !== id);
        this.setState({...this.state, tasks: newTasks});
    }

    render() {
        return (
            <div className="todo_task_container">
                <PopupCreateTask ascent={this.state.ascent}
                                 onClosingPopup={(change: boolean) => this.changeAscent(change)}
                                 onNewTask={(task: object) => this.setTask(task)}
                />
                <PopupChangeTask onClosingPopup={(change: boolean) => this.changeTaskPopup(change)}
                                 change={this.state.change}/>
                <div className="header_todo">
                    <h1 className="title">TODOTask</h1>
                    <FunctionalTasks />
                </div>
                <TasksContainer tasks = {this.state.tasks}
                                onChangeTask={(id: number, change: boolean, title: string) => this.changeTask(id, change, title)}
                                onRemoveTask={(id: number) => this.removeTask(id)}
                                onClosingPopup = {(change: boolean) => this.changeTaskPopup(change)}/>
                <ButtonCreateTask onChangeAscent = {(change: boolean) => this.changeAscent(change)}/>
            </div>
        )
    }
}