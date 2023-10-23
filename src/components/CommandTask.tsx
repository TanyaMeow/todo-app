import React, {Component} from "react";
import changeTask from '../icons/change.svg';
import deleteTask from '../icons/delete.svg';
import {TaskInterface} from "./TodoApp";

type CommandTaskState = {}
type CommandTaskProps = {
    taskId: number,
    title: string,
    completed: boolean,
    onClosingPopup(change: boolean): void,
    onRemoveTask(id: number): void,
    onChangeTask(task: TaskInterface): void
}

// export class CommandTask extends Component<CommandTaskProps, CommandTaskState> {
//     render() {
//         return (
//             <div className="commands_task">
//                 <img src={changeTask} alt="" onClick={() => {
//                     this.props.onClosingPopup(true);
//                     this.props.onChangeTask({
//                         title: this.props.title,
//                         taskId: this.props.taskId,
//                         completed: this.props.completed
//                     })
//                 }} className="change"/>
//                 <img src={deleteTask} alt="" onClick={() => this.props.onRemoveTask(this.props.taskId)} className="delete"/>
//             </div>
//         )
//     }
// }

export function CommandTask(props: CommandTaskProps) {
    return (
        <div className="commands_task">
            <img src={changeTask} alt="" onClick={() => {
                props.onClosingPopup(true);
                props.onChangeTask({
                    title: props.title,
                    taskId: props.taskId,
                    completed: props.completed
                })
            }} className="change"/>
            <img src={deleteTask} alt="" onClick={() => props.onRemoveTask(props.taskId)} className="delete"/>
        </div>
    )
}