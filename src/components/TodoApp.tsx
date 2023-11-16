import React, {createContext, useContext, useEffect, useState} from "react";
import {FunctionalTasks} from "./FunctionalTasks";
import {TasksContainer} from "./TasksContainer";
import {ButtonCreateTask} from "./ButtonCreateTask";
import {PopupCreateTask} from "./PopupCreateTask";

import {PopupChangeTask} from "./PopupChangeTask";
import {MockTodoApi, TodoApi} from "../TodoApi/TodoApi";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

export interface TaskInterface {
    title: string,
    taskId: number,
    completed: boolean
}

type TodoAppState = {
    tasks: TaskInterface[],
    ascent: boolean,
    change: boolean,
    taskCreate: {
        taskId: number,
        title: string,
        completed: boolean
    }
}
type TodoAppProps = {}

export const PopupStateContextCreate = createContext<boolean>(false);
export const PopupStateContextChange = createContext<boolean>(false);
export const TaskContext = createContext({completed: false, taskId: 0, title: ""});

export function TodoApp() {
    const todoApi: TodoApi = new MockTodoApi();
    // FIXME создай 2 mobx стора TasksStore и TaskStore внутри храни состояние тас(ки/ок)
    //  а также методы для взаимодействия, все обращения к api должны быть имплементированы в сторах,
    //  компоненты ничего про api знать не должны
    const [ascent, setAscent] = useState(false);
    const [change, setChange] = useState(false);
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [task, setTask] = useState<TaskInterface>({completed: false, taskId: 0, title: ""});

    useEffect(() => {
        todoApi.get()
            .then((tasks: TaskInterface[]) => {
                setTasks(tasks);
            })
    }, [])

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
        todoApi.post(task)
            .then(() => todoApi.get())
            .then((tasks: TaskInterface[]) => {
                setTasks(tasks);
                setAscent(false);
            })
    }

    function changeTask(task: TaskInterface): void {
        todoApi.update(task)
            .then(() => todoApi.get())
            .then((tasks: TaskInterface[]) => {
                setTask(task);
                setTasks(tasks);
                setChange(false);
            })
    }

    function removeTask(id: number): void {
        todoApi.delete(id)
            .then(() => todoApi.get())
            .then((tasks: TaskInterface[]) => {
                setTasks(tasks)
            })

    }

    function removeCompletedTask() {
        todoApi.deleteCompletedTasks()
            .then(() => todoApi.get())
            .then((tasks: TaskInterface[]) => {
                setTasks(tasks);
            })
    }

    function setTaskComplete(): void {
        todoApi.markTasksCompleted()
            .then(() => todoApi.get())
            .then((tasks: TaskInterface[]) => {
                setTasks(tasks);
            })
    }

    function setComplete(task: TaskInterface) {
        todoApi.update(task)
            .then(() => todoApi.get())
            .then((tasks: TaskInterface[]) => {
                setTask(task);
                setTasks(tasks);
            })
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
                <TasksContainer tasks={tasks}
                                onClosingPopup={closingTaskPopupChange}
                                onCompleteTask={setComplete}
                                onChangeTaskNew={changeTaskCreate}
                                onRemoveTask={removeTask}/>
            <ButtonCreateTask onChangeAscent={closingTaskPopupCreate}/>
        </div>
    )
}