import React, {Component} from "react";
import changeTask from '../icons/change.svg';
import deleteTask from '../icons/delete.svg';

export class CommandTask extends Component<any, any>{
    render() {
        return (
            <div className="commands_task">
                <img src={changeTask} alt=""/>
                <img src={deleteTask} alt="" className="delete"/>
            </div>
        )
    }
}