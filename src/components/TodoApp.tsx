import React, {Component} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";
import {PopupCreateTask} from "./PopupCreateTask";

export class TodoApp extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [],
            ascent: false
        }
    }

    changeAscent(change: boolean): void {
        this.setState({...this.state, ascent: change});
    }

    setTask(task: object) {
        this.setState({...this.state, tasks: this.state.tasks.push(task)});
    }

    render() {
        return (
            <div className="todo_task_container">
                <PopupCreateTask ascent={this.state.ascent}
                                 onClosingPopup={(change: boolean) => this.changeAscent(change)}
                                 onNewTask={(task: object) => this.setTask(task)}
                />
                <div className="header_todo">
                    <h1 className="title">TODOTask</h1>
                    <FunctionalTasks />
                </div>
                <TasksContainer tasks = {this.state.tasks}/>
                <ButtonCreateTask onChangeAscent = {(change: boolean) => this.changeAscent(change)}/>
            </div>
        )
    }
}