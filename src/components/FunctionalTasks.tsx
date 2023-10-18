import React, {Component} from "react";
import completedTasks from '../icons/task-square.svg';
import deleteTasks from '../icons/note-remove.svg';

type FunctionalTasksState = {

}
type FunctionalTasksProps = {

}

export class FunctionalTasks extends Component<FunctionalTasksProps, FunctionalTasksState>{
    render() {
        return (
            <div className="functional_task">
                <div className="mark_completed" onClick={() => console.log('отметить')}>
                    <p>Отметить все как выполненые</p>
                    <img src={completedTasks} alt="" className="completed"/>
                </div>
                <div className="delete_completed" onClick={() => console.log('удалить')}>
                    <p>Удалить все выполненные</p>
                    <img src={deleteTasks} alt="" className="delete_tasks"/>
                </div>
            </div>
        )
    }
}