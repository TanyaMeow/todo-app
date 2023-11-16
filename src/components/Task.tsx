import React, {JSX} from "react";
import {CommandTask} from "./CommandTask";
import {TaskInterface} from "./TodoApp";

type TaskProps = {
    title: string,
    taskId: number,
    completed: boolean,
    onClosingPopup(change: boolean): void,
    onRemoveTask(id: number): void,
    onCompleteTask(task: TaskInterface): void,
    onChangeTaskNew(task: TaskInterface): void
}

export function Task(props: TaskProps): JSX.Element {
        return (
            <div className="task" key={props.taskId}>
                <div className="task_complete">
                    <input type="checkbox" checked={props.completed}
                           onChange={(e) => {
                               props.onCompleteTask({
                                   title: props.title,
                                   taskId: props.taskId,
                                   completed: e.target.checked
                               });
                           }}/>
                    <p className="name_task">{props.title}</p>
                </div>
                <CommandTask taskId={props.taskId}
                             title={props.title}
                             completed={props.completed}
                             onClosingPopup={(change: boolean) => props.onClosingPopup(change)}
                             onRemoveTask={(id: number) => props.onRemoveTask(id)}
                             onChangeTask={(task: TaskInterface) => props.onChangeTaskNew(task)}/>
            </div>
        )
}