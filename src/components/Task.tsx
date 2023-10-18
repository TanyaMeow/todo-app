import React, {Component} from "react";
import {CommandTask} from "./CommandTask";

type TaskState = {}
type TaskProps = {
    title: string,
    taskId: number,
    completed: boolean,
    onClosingPopup(change: boolean, id: number): void,
    onRemoveTask(id: number): void
}

export class Task extends Component<TaskProps, TaskState>{
    render() {
        return (
            <div className="task" key={this.props.taskId}>
                <div className="task_complete">
                    <input type="checkbox" defaultChecked={this.props.completed}/>
                    <p className="name_task">{this.props.title}</p>
                </div>
                <CommandTask id={this.props.taskId}
                             onClosingPopup={(change: boolean, id: number) => this.props.onClosingPopup(change, id)}
                             onRemoveTask={(id: number) => this.props.onRemoveTask(id)}/>
            </div>
        )
    }
}