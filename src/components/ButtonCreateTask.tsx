import React, {JSX} from 'react';

type ButtonCreateTaskProps = {
    onChangeAscent(change: boolean): void
}

export function ButtonCreateTask(props: ButtonCreateTaskProps): JSX.Element {
    return (
        <button className="button_create-task" onClick={() => props.onChangeAscent(true)}>Создать новую задачу</button>
    )
}