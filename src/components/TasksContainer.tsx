import React, {Component} from "react";
import {Task} from "./Task";
import {TaskInterface} from "./TodoApp";

type TasksContainerState = {}
type TasksContainerProps = {
    tasks: TaskInterface[]
    onClosingPopup(change: boolean): void,
    onRemoveTask(id: number): void,
    onCompleteTask(task: TaskInterface): void,
    onChangeTaskNew(task: TaskInterface): void
}

// export class TasksContainer extends Component<TasksContainerProps, TasksContainerState> {
//     render() {
//         return (
//             <div className="tasks_container">
//                 {this.props.tasks.map((task: TaskInterface, key: number) => <Task key={key}
//                                                                                   title={task.title}
//                                                                                   taskId={task.taskId}
//                                                                                   completed={task.completed}
//                                                                                   onRemoveTask={(id: number) => this.props.onRemoveTask(id)}
//                                                                                   onClosingPopup={(change: boolean) => this.props.onClosingPopup(change)}
//                                                                                   onCompleteTask={(task: TaskInterface) => this.props.onCompleteTask(task)}
//                                                                                   onChangeTask={(task: TaskInterface) => this.props.onChangeTaskNew(task)}/>)
//                 }
//             </div>
//         )
//     }
// }

export function TasksContainer(props: TasksContainerProps) {
    return (
        <div className="tasks_container">
            {props.tasks.map((task: TaskInterface, key: number) => <Task key={key}
                                                                         title={task.title}
                                                                         taskId={task.taskId}
                                                                         completed={task.completed}
                                                                         onRemoveTask={(id: number) => props.onRemoveTask(id)}
                                                                         onClosingPopup={(change: boolean) => props.onClosingPopup(change)}
                                                                         onCompleteTask={(task: TaskInterface) => props.onCompleteTask(task)}
                                                                         onChangeTask={(task: TaskInterface) => props.onChangeTaskNew(task)}/>)
            }
        </div>
    )
}