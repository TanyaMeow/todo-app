import React, {Component} from "react";
import changeTask from '../icons/change.svg';
import deleteTask from '../icons/delete.svg';

type CommandTaskState = {}
type CommandTaskProps = {
    id: number,
    title: string,
    onClosingPopup(change: boolean, id: number, title: string): void,
    onRemoveTask(id: number): void
}

export class CommandTask extends Component<CommandTaskProps, CommandTaskState> {
    render() {
        return (
            <div className="commands_task">
                <img src={changeTask} alt="" onClick={() => {
                    this.props.onClosingPopup(true, this.props.id, this.props.title);
                }} className="change"/>
                <img src={deleteTask} alt="" onClick={() => this.props.onRemoveTask(this.props.id)} className="delete"/>
            </div>
        )
    }
}