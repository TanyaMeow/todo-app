import React, {Component} from "react";
import {TaskInterface} from "./TodoApp";

type PopupChangeTaskState = {}
type PopupChangeTaskProps = {
    id: number,
    change: boolean,
    onChangeTask(id: number, task: TaskInterface): void,
    onClosingPopup(change: boolean, id: number | null): void
}

export class PopupChangeTask extends Component<PopupChangeTaskProps, PopupChangeTaskState> {
    render() {
        const task: TaskInterface = {
            title: 'yyy',
            taskId: this.props.id,
            completed: false
        };

        return (
            <div className="popup_container" style={{display: (this.props.change ? 'flex' : 'none')}}>
                <div className="popup">
                    <h1 className="title_popup">Изменить задачу</h1>
                    <div className="create_task">
                        <input className="create-task" defaultValue={task.title}
                               onChange={(event) => task.title = event.target.value}/>
                        <button className="button-popup_create-task" onClick={() => {
                            this.props.onChangeTask(task.taskId, task);
                            this.props.onClosingPopup(false, this.props.id);
                        }}>Изменить
                        </button>
                        <p className="cancel" onClick={() => this.props.onClosingPopup(false, null)}>Отмена</p>
                    </div>
                </div>
            </div>
        )
    }
}