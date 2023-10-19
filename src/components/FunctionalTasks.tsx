import React, {Component} from "react";
import completedTasks from '../icons/task-square.svg';
import deleteTasks from '../icons/note-remove.svg';

type FunctionalTasksState = {}
type FunctionalTasksProps = {
    onCompleteTasks(): void,
    onRemoveCompleteTask(complete: boolean): void
}

export class FunctionalTasks extends Component<FunctionalTasksProps, FunctionalTasksState> {
    render() {
        return (
            <div className="functional_task">
                <div className="mark_completed" onClick={() => this.props.onCompleteTasks()}>
                    <p>Отметить все как выполненые</p>
                    <img src={completedTasks} alt="" className="completed"/>
                </div>
                <div className="delete_completed" onClick={() => this.props.onRemoveCompleteTask(true)}>
                    <p>Удалить все выполненные</p>
                    <img src={deleteTasks} alt="" className="delete_tasks"/>
                </div>
            </div>
        )
    }
}