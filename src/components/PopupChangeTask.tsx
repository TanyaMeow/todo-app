import React, {useContext} from "react";
import {PopupStateContextChange, TaskContext, TaskInterface} from "./TodoApp";

type PopupChangeTaskState = {}
type PopupChangeTaskProps = {
    // taskCreate: TaskInterface
    onChangeTask(task: TaskInterface): void,
    onClosingPopup(change: boolean): void
}

export function PopupChangeTask(props: PopupChangeTaskProps) {
    const change = useContext(PopupStateContextChange);
    const task = useContext(TaskContext);

    return (
        <div className="popup_container" style={{display: (change ? 'flex' : 'none')}}>
            <div className="popup">
                <h1 className="title_popup">Изменить задачу</h1>
                <div className="create_task">
                    <input className="create-task" defaultValue={task.title}
                                                   onChange={(event) => task.title = event.target.value}/>
                    <button className="button-popup_create-task" onClick={() => props.onChangeTask(task)}>Изменить</button>
                    <p className="cancel" onClick={() => props.onClosingPopup(false)}>Отмена</p>
                </div>
            </div>
        </div>
    )
}