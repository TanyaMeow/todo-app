import React, {JSX} from 'react';
import {TodoApp} from "./components/TodoApp";
import './App.scss';

function App(): JSX.Element {
  return (
      <div className="todo_block">
        <div className="todo_container">
          <div className="wrapper">
            <TodoApp />
          </div>
        </div>
      </div>
  );
}

export default App;
