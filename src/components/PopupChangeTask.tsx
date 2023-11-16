import React, {useContext, JSX} from "react";
import {PopupStateContextChange, TaskContext} from "./TodoApp";
import {TaskInterface} from "../store/TasksStore";

type PopupChangeTaskProps = {
    onChangeTask(task: TaskInterface): void,
    onClosingPopup(change: boolean): void
}

export function PopupChangeTask(props: PopupChangeTaskProps): JSX.Element {
    const change: boolean = useContext(PopupStateContextChange);
    const task: TaskInterface = useContext(TaskContext);

    return (
        <div className="popup_container" style={{display: (change ? 'flex' : 'none')}}>
            <div className="popup">
                <h1 className="title_popup">Изменить задачу</h1>
                <div className="create_task">
                    <input className="create-task" defaultValue={task.title}
                           onChange={(event) => task.title = event.target.value}/>
                    <button className="button-popup_create-task" onClick={() => props.onChangeTask(task)}>Изменить
                    </button>
                    <p className="cancel" onClick={() => props.onClosingPopup(false)}>Отмена</p>
                </div>
            </div>
        </div>
    )
}