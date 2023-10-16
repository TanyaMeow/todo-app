import React, {Component} from "react";

export class PopupCreateTask extends Component<any, any> {
    render() {
        return (
            <div className="popup_container">
                <div className="popup">
                    <h1 className="title_popup">Создать новую задачу</h1>
                    <div className="create_task">
                        <input className="create-task"/>
                        <button className="button-popup_create-task">Создать</button>
                        <p className="cancel">Отмена</p>
                    </div>
                </div>
            </div>
        )
    }
}