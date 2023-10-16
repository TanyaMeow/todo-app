import React, {Component} from 'react';

export class ButtonCreateTask extends Component<any, any>{

    render() {
        return (
            <button className="button_create-task" onClick={() => this.props.onChangeAscent(true)}>Создать новую задачу</button>
        )
    }
}