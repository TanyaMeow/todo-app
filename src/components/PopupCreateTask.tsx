import React, {Component} from "react";

export class PopupCreateTask extends Component<any, any> {
    render() {
        const task = {
            title: '',
            completed: false,
            userId: 0
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
                            this.props.onClosingPopup(false);
                        }}>Создать</button>
                        <p className="cancel" onClick={() => this.props.onClosingPopup(false)}>Отмена</p>
                    </div>
                </div>
            </div>
        )
    }
}