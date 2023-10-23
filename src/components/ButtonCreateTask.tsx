import React, {Component, useContext} from 'react';

type ButtonCreateTaskState = {};
type ButtonCreateTaskProps = {
    onChangeAscent(change: boolean): void
}

export function ButtonCreateTask(props: ButtonCreateTaskProps) {
    return(
        <button className="button_create-task" onClick={() => props.onChangeAscent(true)}>Создать новую задачу</button>
    )
}