import React, {Component} from "react";
import {Task} from "./Task";
import {TaskInterface} from "./TodoApp";

type TasksContainerState = {}
type TasksContainerProps = {
    tasks: TaskInterface[]
    onClosingPopup(change: boolean, id: number): void,
    onRemoveTask(id: number): void
}

export class TasksContainer extends Component<TasksContainerProps, TasksContainerState> {
    render() {
        return (
            <div className="tasks_container">
                {this.props.tasks.map((task: any, key: number) => <Task key={key}
                                                                        title={task.title}
                                                                        taskId={task.taskId}
                                                                        completed={task.completed}
                                                                        onRemoveTask={(id: number) => this.props.onRemoveTask(id)}
                                                                        onClosingPopup={(change: boolean, id: number) => this.props.onClosingPopup(change, id)}/>)
                }
            </div>
        )
    }
}