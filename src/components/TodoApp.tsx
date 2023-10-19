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

        this.completeTask = this.completeTask.bind(this);
    }

    changeAscent(change: boolean): void {
        this.setState({...this.state, ascent: change});
    }

    changeTaskPopup(change: boolean, id: number): void {
        this.setState((state: any) => {
            return {...state, id: id, change: change}
        });
    }

    setTask(task: TaskInterface) {
        // this.todoApi.post(task);
        // @ts-ignore
        this.setState({...this.state, tasks: this.state.tasks.push(task)});
    }

    changeTask(id: number, newTask: TaskInterface): void {

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
        let newTasks: TaskInterface[] = this.state.tasks.filter((task: TaskInterface) => task.taskId !== id);
        this.setState({...this.state, tasks: newTasks});
    }

    removeCompletedTask(complete: boolean) {
        let newTasks: TaskInterface[] = this.state.tasks.filter((task: TaskInterface) => task.completed !== complete);
        this.setState({...this.state, tasks: newTasks});
    }

    completeTask(): void {
        let complete = this.state.tasks.map((task: TaskInterface) => {
            task.completed = true;
            return task;
        })

        this.setState((state: any) => {
            return {...state, tasks: complete}
        })

        console.log(this.state.tasks);
    }

    render() {
        return (
            <div className="todo_task_container">
                <PopupCreateTask ascent={this.state.ascent}
                                 onClosingPopup={(change: boolean) => this.changeAscent(change)}
                                 onNewTask={(task: TaskInterface) => this.setTask(task)}
                />
                <PopupChangeTask onClosingPopup={(change: boolean, id: number) => this.changeTaskPopup(change, id)}
                                 change={this.state.change}
                                 id={this.state.id}
                                 onChangeTask={(id: number, newTask: TaskInterface) => this.changeTask(id, newTask)}/>
                <div className="header_todo">
                    <h1 className="title">TODOTask</h1>
                    <FunctionalTasks onCompleteTasks={() => this.completeTask()}
                                        onRemoveCompleteTask={(complete: boolean) => this.removeCompletedTask(complete)}/>
                </div>
                <TasksContainer tasks = {this.state.tasks}
                                onRemoveTask={(id: number) => this.removeTask(id)}
                                onClosingPopup = {(change: boolean, id: number) => this.changeTaskPopup(change, id)}/>
                <ButtonCreateTask onChangeAscent = {(change: boolean) => this.changeAscent(change)}/>
            </div>
        )
    }
}