import React, {Component} from "react";
import {TaskInterface} from "./TodoApp";

type PopupChangeTaskState = {}
type PopupChangeTaskProps = {
    id: number,
    change: boolean,
    title: string,
    onChangeTask(id: number, task: TaskInterface): void,
    onClosingPopup(change: boolean, id: number | null, title: string | null): void
}

export class PopupChangeTask extends Component<PopupChangeTaskProps, PopupChangeTaskState> {
    render() {
        const task: TaskInterface = {
            title: '',
            taskId: this.props.id,
            completed: false
        };

        return (
            <div className="popup_container" style={{display: (this.props.change ? 'flex' : 'none')}}>
                <div className="popup">
                    <h1 className="title_popup">Изменить задачу</h1>
                    <div className="create_task">
                        <input className="create-task" defaultValue={this.props.title}
                               onChange={(event) => task.title = event.target.value}/>
                        <button className="button-popup_create-task" onClick={() => {
                            this.props.onChangeTask(task.taskId, task);
                            this.props.onClosingPopup(false, this.props.id, this.props.title);
                        }}>Изменить
                        </button>
                        <p className="cancel" onClick={() => this.props.onClosingPopup(false, null, null)}>Отмена</p>
                    </div>
                </div>
            </div>
        )
    }
}