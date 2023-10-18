import React, {Component} from "react";
import {CommandTask} from "./CommandTask";

type TaskProps = {
    title: string,
    taskId: number,
    completed: boolean
}

export class Task extends Component<any, TaskProps>{
    render() {
        return (
            <div className="task" key={this.props.taskId}>
                <div className="task_complete">
                    <input type="checkbox" defaultChecked={this.props.completed}/>
                    <p className="name_task">{this.props.title}</p>
                </div>
                <CommandTask id={this.props.taskId}
                             title={this.props.title}
                             onChangeTask={(id: number) => this.props.onChangeTask(id)}
                             onClosingPopup={(change: boolean, id: number) => this.props.onClosingPopup(change, id)}
                             onRemoveTask={(id: number) => this.props.onRemoveTask(id)}/>
            </div>
        )
    }
}