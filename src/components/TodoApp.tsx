import React, {createContext, useEffect, useState} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";
import {PopupCreateTask} from "./PopupCreateTask";
import {PopupChangeTask} from "./PopupChangeTask";
import {TaskInterface, tasksStore} from "../store/TasksStore";
import {observer} from "mobx-react-lite";

export const PopupStateContextCreate: React.Context<boolean> = createContext<boolean>(false);
export const PopupStateContextChange: React.Context<boolean> = createContext<boolean>(false);
export const TaskContext = createContext({completed: false, taskId: 0, title: ""});

export const TodoApp = observer(() => {
    const [ascent, setAscent] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [task, setTask] = useState<TaskInterface>({completed: false, taskId: 0, title: ""});

    useEffect(() => {
        tasksStore.loadTasks();
    }, [])

    function closingTaskPopupCreate(change: boolean): void {
        setAscent(change);
    }

    function closingTaskPopupChange(change: boolean): void {
        setChange(change);
    }

    function changeTaskCreate(task: TaskInterface): void {
        setTask(task);
    }

    async function createTask(task: TaskInterface): Promise<void> {
        await tasksStore.createTask(task)
        await tasksStore.loadTasks();
        setAscent(false);
    }

    async function changeTask(task: TaskInterface): Promise<void> {
        setTask(task);
        await tasksStore.updateTasks(task);
        await tasksStore.loadTasks()
        setChange(false);
    }

    async function setComplete(task: TaskInterface): Promise<void> {
        setTask(task);
        await tasksStore.updateTasks(task);
        await tasksStore.loadTasks();
    }

    return (
        <div className="todo_task_container">
            <PopupStateContextCreate.Provider value={ascent}>
                <PopupCreateTask onClosingPopup={closingTaskPopupCreate}
                                 onNewTask={(task: TaskInterface) => createTask(task)}
                                 tasks={tasksStore.tasks}
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
                <FunctionalTasks
                    onCompleteTasks={() => tasksStore.markCompletedTasks().then(() => tasksStore.loadTasks())}
                    onRemoveCompleteTask={() => tasksStore.deleteCompletedTasks().then(() => tasksStore.loadTasks())}/>
            </div>
            <TasksContainer tasks={tasksStore.tasks}
                            onClosingPopup={closingTaskPopupChange}
                            onCompleteTask={setComplete}
                            onChangeTaskNew={changeTaskCreate}
                            onRemoveTask={(id: number) => tasksStore.removeTask(id).then(() => tasksStore.loadTasks())}/>
            <ButtonCreateTask onChangeAscent={closingTaskPopupCreate}/>
        </div>
    )
})