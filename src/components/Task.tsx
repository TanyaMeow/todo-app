import React, {Component} from "react";
import {CommandTask} from "./CommandTask";

export class Task extends Component<any, any>{
    render() {
        console.log('я таска')
        return (
            <div className="task" key={this.props.userId}>
                <div className="task_complete">
                    <input type="checkbox" checked={this.props.completed}/>
                    <p className="name_task">{this.props.title}</p>
                </div>
                <CommandTask />
            </div>
        )
    }
}