import React, {Component} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";

export class TodoApp extends Component<any, any>{
    render() {
        return (
            <div className="todo_task_container">
                <div className="header_todo">
                    <h1 className="title">TODOTask</h1>
                    <FunctionalTasks />
                </div>
                <TasksContainer />
                <ButtonCreateTask />
            </div>
        )
    }
}