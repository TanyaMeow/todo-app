import React, {Component} from "react";
import completedTasks from '../icons/task-square.svg';
import deleteTasks from '../icons/note-remove.svg';

export class FunctionalTasks extends Component<any, any>{
    render() {
        return (
            <div className="functional_task">
                <div className="mark_completed">
                    <p>Отметить все как выполненые</p>
                    <img src={completedTasks} alt="" className="completed"/>
                </div>
                <div className="delete_completed">
                    <p>Удалить все выполненные</p>
                    <img src={deleteTasks} alt="" className="delete_tasks"/>
                </div>
            </div>
        )
    }
}