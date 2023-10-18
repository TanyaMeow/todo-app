import React, {Component} from 'react';

type ButtonCreateTaskState = {

}
type ButtonCreateTaskProps = {
    onChangeAscent(change: boolean): void
}

export class ButtonCreateTask extends Component<ButtonCreateTaskProps, ButtonCreateTaskState>{

    render() {
        return (
            <button className="button_create-task" onClick={() => this.props.onChangeAscent(true)}>Создать новую задачу</button>
        )
    }
}