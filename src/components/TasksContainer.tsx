import React, {Component} from "react";
import {Task} from "./Task";

export class TasksContainer extends Component<any, any> {
    render() {
        return (
            <div className="tasks_container" onClick={() => console.log(this.props.tasks)}>
                {this.props.tasks.map((task: any) => <Task title={task.title}
                                                            userId={task.userId}
                                                            completes={task.completed}/>)
                }
            </div>
        )
    }
}