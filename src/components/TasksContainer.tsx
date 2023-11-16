import React, {JSX} from "react";
import {Task} from "./Task";
import {TaskInterface} from "../store/TasksStore";

type TasksContainerProps = {
    tasks: TaskInterface[]
    onClosingPopup(change: boolean): void,
    onRemoveTask(id: number): void,
    onCompleteTask(task: TaskInterface): void,
    onChangeTaskNew(task: TaskInterface): void
}

export function TasksContainer(props: TasksContainerProps): JSX.Element {
    return (
        <div className="tasks_container">
            {props.tasks.map((task: TaskInterface, key: number) => <Task key={key}
                                                                         title={task.title}
                                                                         taskId={task.taskId}
                                                                         completed={task.completed}
                                                                         onRemoveTask={(id: number) => props.onRemoveTask(id)}
                                                                         onClosingPopup={(change: boolean) => props.onClosingPopup(change)}
                                                                         onCompleteTask={(task: TaskInterface) => props.onCompleteTask(task)}
                                                                         onChangeTaskNew={(task: TaskInterface) => props.onChangeTaskNew(task)}/>)
            }
        </div>
    )
}