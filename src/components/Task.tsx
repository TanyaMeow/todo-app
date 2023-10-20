import React, {Component} from "react";
import {CommandTask} from "./CommandTask";
import {TaskInterface} from "./TodoApp";

type TaskState = {}
type TaskProps = {
    title: string,
    taskId: number,
    completed: boolean,
    onClosingPopup(change: boolean): void,
    onRemoveTask(id: number): void,
    onCompleteTask(task: TaskInterface): void,
    onChangeTask(task: TaskInterface): void
}

export class Task extends Component<TaskProps, TaskState> {
    render() {
        return (
            <div className="task" key={this.props.taskId}>
                <div className="task_complete">
                    <input type="checkbox" checked={this.props.completed}
                           onChange={(e) => {
                               this.props.onCompleteTask({
                                   title: this.props.title,
                                   taskId: this.props.taskId,
                                   completed: e.target.checked
                               });
                           }}/>
                    <p className="name_task">{this.props.title}</p>
                </div>
                <CommandTask taskId={this.props.taskId}
                             title={this.props.title}
                             completed={this.props.completed}
                             onClosingPopup={(change: boolean) => this.props.onClosingPopup(change)}
                             onRemoveTask={(id: number) => this.props.onRemoveTask(id)}
                             onChangeTask={(task: TaskInterface) => this.props.onChangeTask(task)}/>
            </div>
        )
    }
}