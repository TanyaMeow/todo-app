import React, {Component} from "react";
import changeTask from '../icons/change.svg';
import deleteTask from '../icons/delete.svg';

type CommandTaskState = {}
type CommandTaskProps = {
    id: number,
    onClosingPopup(change: boolean, id: number): void,
    onRemoveTask(id: number): void
}

export class CommandTask extends Component<CommandTaskProps, CommandTaskState> {
    render() {
        return (
            <div className="commands_task">
                <img src={changeTask} alt="" onClick={() => {
                    this.props.onClosingPopup(true, this.props.id);
                }} className="change"/>
                <img src={deleteTask} alt="" onClick={() => this.props.onRemoveTask(this.props.id)} className="delete"/>
            </div>
        )
    }
}