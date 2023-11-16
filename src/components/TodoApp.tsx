import React, {createContext, useState} from "react";
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

export const PopupStateContextCreate: React.Context<boolean> = createContext<boolean>(false);
export const PopupStateContextChange: React.Context<boolean> = createContext<boolean>(false);
export const TaskContext = createContext({completed: false, taskId: 0, title: ""});

export const TodoApp = observer(() => {
    const [ascent, setAscent] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [task, setTask] = useState<TaskInterface>({completed: false, taskId: 0, title: ""});

    function closingTaskPopupCreate(change: boolean): void {
        setAscent(change);
    }

    function closingTaskPopupChange(change: boolean): void {
        setChange(change);
    }

    function changeTaskCreate(task: TaskInterface): void {
        setTask(task);
    }

    function createTask(task: TaskInterface): void {
        tasksStore.createTask(task);
        setAscent(false);
    }

    function changeTask(task: TaskInterface): void {
        setTask(task);
        tasksStore.updateTasks(task);
        setChange(false);
    }

    function setComplete(task: TaskInterface): void {
        setTask(task);
        tasksStore.updateTasks(task);
    }

    return (
        <div className="todo_task_container">
            <PopupStateContextCreate.Provider value={ascent}>
                <PopupCreateTask onClosingPopup={closingTaskPopupCreate}
                                 onNewTask={(task: TaskInterface) => createTask(task)}
                                 tasks={tasksStore.getTasks()}
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
                <FunctionalTasks onCompleteTasks={tasksStore.markCompletedTasks}
                                 onRemoveCompleteTask={tasksStore.deleteCompletedTasks}/>
            </div>
            <TasksContainer tasks={tasksStore.getTasks()}
                            onClosingPopup={closingTaskPopupChange}
                            onCompleteTask={setComplete}
                            onChangeTaskNew={changeTaskCreate}
                            onRemoveTask={(id: number) => tasksStore.removeTask(id)}/>
            <ButtonCreateTask onChangeAscent={closingTaskPopupCreate}/>
        </div>
    )
})