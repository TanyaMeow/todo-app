import React, {useContext, JSX} from "react";
import {PopupStateContextCreate} from "./TodoApp";
import {TaskInterface} from "../store/TasksStore";

type PopupCreateTaskProps = {
    onNewTask(task: TaskInterface): void
    onClosingPopup(change: boolean): void
    tasks: TaskInterface[]
}

export function PopupCreateTask(props: PopupCreateTaskProps): JSX.Element {
    const ascent: boolean = useContext(PopupStateContextCreate);
    const id: number = (props.tasks.length === 0) ? 1 : props.tasks[props.tasks.length - 1].taskId + 1;

    const task: TaskInterface = {
        title: '',
        taskId: id,
        completed: false,
    }

    return (
        <div className="popup_container" style={{display: (ascent ? 'flex' : 'none')}}>
            <div className="popup">
                <h1 className="title_popup">Создать новую задачу</h1>
                <div className="create_task">
                    <input className="create-task" onChange={(event): void => {
                        task.title = event.target.value;
                    }}/>
                    <button className="button-popup_create-task" onClick={() => props.onNewTask(task)}>Создать</button>
                    <p className="cancel" onClick={() => props.onClosingPopup(false)}>Отмена</p>
                </div>
            </div>
        </div>
    )
}