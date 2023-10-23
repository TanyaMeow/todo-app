import React, {useContext, useEffect, useState} from "react";
import {PopupStateContextCreate, TaskInterface} from "./TodoApp";

type PopupCreateTaskState = {}
type PopupCreateTaskProps = {
    onNewTask(task: TaskInterface): void
    onClosingPopup(change: boolean): void
}

export function PopupCreateTask(props: PopupCreateTaskProps) {
    const ascent = useContext(PopupStateContextCreate);

    const task = {
        title: '',
        taskId: Math.floor(Math.random() * 100),
        completed: false,
    }

    return (
        <div className="popup_container" style={{display: (ascent ? 'flex' : 'none')}}>
            <div className="popup">
                <h1 className="title_popup">Создать новую задачу</h1>
                <div className="create_task">
                    <input className="create-task" onChange={(event) => {
                        task.title = event.target.value;
                    }}/>
                    <button className="button-popup_create-task" onClick={() => props.onNewTask(task)}>Создать</button>
                    <p className="cancel" onClick={() => props.onClosingPopup(false)}>Отмена</p>
                </div>
            </div>
        </div>
    )
}