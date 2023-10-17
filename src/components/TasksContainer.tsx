import React, {Component} from "react";
import {Task} from "./Task";

export class TasksContainer extends Component<any, any> {
    render() {
        return (
            <div className="tasks_container">
                {this.props.tasks.map((task: any, key: number) => <Task key={key}
                                                                        title={task.title}
                                                                        taskId={task.taskId}
                                                                        completes={task.completed}
                                                                        onChangeTask={(id: number, change: boolean, title: string) => this.props.onChangeTask(id, change, title)}
                                                                        onRemoveTask={(id: number) => this.props.onRemoveTask(id)}
                                                                        onClosingPopup={(change: boolean) => this.props.onClosingPopup(change)}/>)
                }
            </div>
        )
    }
}