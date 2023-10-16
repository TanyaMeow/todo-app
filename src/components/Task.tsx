import React, {Component} from "react";
import {CommandTask} from "./CommandTask";

export class Task extends Component<any, any>{

    render() {
        return (
            <div className="task">
                <div className="task_complete">
                    <input type="checkbox"/>
                    <p className="name_task">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                </div>
                <CommandTask />
            </div>
        )
    }
}