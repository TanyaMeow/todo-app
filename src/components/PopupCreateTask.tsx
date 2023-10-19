import React, {Component} from "react";
import {TaskInterface} from "./TodoApp";

type PopupCreateTaskState = {}
type PopupCreateTaskProps = {
    ascent: boolean,
    onNewTask(task: TaskInterface): void
    onClosingPopup(change: boolean): void
}

export class PopupCreateTask extends Component<PopupCreateTaskProps, PopupCreateTaskState> {
    render() {
        const task = {
            title: '',
            taskId: Math.floor(Math.random() * 100),
            completed: false,
        }

        return (
            <div className="popup_container" style={{display: (this.props.ascent ? 'flex' : 'none')}}>
                <div className="popup">
                    <h1 className="title_popup">Создать новую задачу</h1>
                    <div className="create_task">
                        <input className="create-task" onChange={(event) => {
                            task.title = event.target.value;
                        }}/>
                        <button className="button-popup_create-task" onClick={() => {
                            this.props.onNewTask(task);
                        }}>Создать
                        </button>
                        <p className="cancel" onClick={() => this.props.onClosingPopup(false)}>Отмена</p>
                    </div>
                </div>
            </div>
        )
    }
}