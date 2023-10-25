import React, {createContext, useEffect, useState} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";
import {PopupCreateTask} from "./PopupCreateTask";
import {PopupChangeTask} from "./PopupChangeTask";
import {tasksStore} from "../store/TasksStore";
import {observer} from "mobx-react-lite";

export interface TaskInterface {
    title: string,
    taskId: number,
    completed: boolean
}

export const PopupStateContextCreate = createContext<boolean>(false);
export const PopupStateContextChange = createContext<boolean>(false);
export const TaskContext = createContext({completed: false, taskId: 0, title: ""});

export const TodoApp = observer(() => {
    const [ascent, setAscent] = useState(false);
    const [change, setChange] = useState(false);
    const [task, setTask] = useState<TaskInterface>({completed: false, taskId: 0, title: ""});

    function closingTaskPopupCreate(change: boolean): void {
        setAscent(change);
    }

    function closingTaskPopupChange(change: boolean): void {
        setChange(change);
    }

    function changeTaskCreate(task: TaskInterface) {
        setTask(task);
    }

    function createTask(task: TaskInterface) {
        tasksStore.createTask(task);
        setAscent(false);
    }

    function changeTask(task: TaskInterface): void {
        setTask(task);
        tasksStore.updateTasks(task);
        setChange(false);
    }

    function removeTask(id: number): void {
        tasksStore.removeTask(id);
    }

    function removeCompletedTask() {
        tasksStore.deleteCompletedTasks();
    }

    function setTaskComplete(): void {
        tasksStore.markCompletedTasks();
    }

    function setComplete(task: TaskInterface) {
        setTask(task);
        tasksStore.updateTasks(task);
    }

    return (
        <div className="todo_task_container">
            <PopupStateContextCreate.Provider value={ascent}>
                <PopupCreateTask onClosingPopup={closingTaskPopupCreate}
                                 onNewTask={(task: TaskInterface) => createTask(task)}
                />
            </PopupStateContextCreate.Provider>
            <PopupStateContextChange.Provider value={change}>
                <TaskContext.Provider value={task}>
                    <PopupChangeTask onChangeTask={changeTask}
                                     onClosingPopup={closingTaskPopupChange}/>
                </TaskContext.Provider>
            </PopupStateContextChange.Provider>
            <div className="header_todo">
                <h1 className="title">TODOTask</h1>
                <FunctionalTasks onCompleteTasks={setTaskComplete}
                                 onRemoveCompleteTask={removeCompletedTask}/>
            </div>
            <TasksContainer tasks={tasksStore.getTasks()}
                            onClosingPopup={closingTaskPopupChange}
                            onCompleteTask={setComplete}
                            onChangeTaskNew={changeTaskCreate}
                            onRemoveTask={removeTask}/>
            <ButtonCreateTask onChangeAscent={closingTaskPopupCreate}/>
        </div>
    )
})