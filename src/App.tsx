import React, {JSX} from 'react';
import {TodoApp} from "./components/TodoApp";
import './App.scss';

function App(): JSX.Element {
    return (
        <div className="todo_block">
            <div className="wrapper">
                <div className="todo_container">
                    <TodoApp/>
                </div>
            </div>
        </div>
    );
}

export default App;
