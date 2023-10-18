import React, {Component} from "react";
import {Task} from "./Task";

export class TasksContainer extends Component<any, any> {
    render() {
        return (
            <div className="tasks_container">
                {this.props.tasks.map((task: any, key: number) => <Task key={key}
                                                                        title={task.title}
                                                                        taskId={task.taskId}
                                                                        completed={task.completed}
                                                                        onChangeTask={(id: number) => this.props.onChangeTask(id)}
                                                                        onRemoveTask={(id: number) => this.props.onRemoveTask(id)}
                                                                        onClosingPopup={(change: boolean, id: number) => this.props.onClosingPopup(change, id)}/>)
                }
            </div>
        )
    }
}