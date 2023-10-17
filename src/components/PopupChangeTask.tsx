import React, {Component} from "react";

export class PopupChangeTask extends Component<any, any> {
    render(){
        return (
            <div className="popup_container" style={{display: (this.props.change ? 'flex' : 'none')}}>
                <div className="popup">
                    <h1 className="title_popup">Изменить задачу</h1>
                    <div className="create_task">
                        <input className="create-task" />
                        <button className="button-popup_create-task">Изменить</button>
                        <p className="cancel" onClick={() => this.props.onClosingPopup(false)}>Отмена</p>
                    </div>
                </div>
            </div>
        )
    }
}