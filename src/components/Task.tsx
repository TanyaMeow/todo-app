import React, {Component} from "react";
import {CommandTask} from "./CommandTask";

export class Task extends Component<any, any>{
    render() {
        return (
            <div className="task" key={this.props.taskId}>
                <div className="task_complete">
                    <input type="checkbox" checked={this.props.completed}/>
                    <p className="name_task">{this.props.title}</p>
                </div>
                <CommandTask id={this.props.taskId}
                             title={this.props.title}
                             onChangeTask={(id: number, change: boolean, title: string) => this.props.onChangeTask(id, change, title)}
                             onClosingPopup={(change: boolean) => this.props.onClosingPopup(change)}
                             onRemoveTask={(id: number) => this.props.onRemoveTask(id)}/>
            </div>
        )
    }
}