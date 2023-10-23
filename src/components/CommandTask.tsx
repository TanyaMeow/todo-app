import React, {Component} from "react";
import changeTask from '../icons/change.svg';
import deleteTask from '../icons/delete.svg';
import {TaskInterface} from "./TodoApp";

type CommandTaskState = {}
type CommandTaskProps = {
    taskId: number,
    title: string,
    completed: boolean,
    onClosingPopup(change: boolean): void,
    onRemoveTask(id: number): void,
    onChangeTask(task: TaskInterface): void
}

export function CommandTask(props: CommandTaskProps) {
    return (
        <div className="commands_task">
            <img src={changeTask} alt="" onClick={() => {
                props.onClosingPopup(true);
                props.onChangeTask({
                    title: props.title,
                    taskId: props.taskId,
                    completed: props.completed
                });
            }} className="change"/>
            <img src={deleteTask} alt="" onClick={() => props.onRemoveTask(props.taskId)} className="delete"/>
        </div>
    )
}