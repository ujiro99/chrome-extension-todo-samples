import React, { useState, useEffect } from "react";

import { Storage } from "./storage";

import "./checkbox.css";
import "./todo.css";

const TODO = "todo";

let id = 0;

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInpuVal] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });
    Storage.get(TODO).then((saved) => {
      if (saved) {
        setTodos(saved);
        id = saved.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1;
      }
    });
  }, []); // run only once.

  const add = () => {
    console.log("add: " + inputVal);
    const newTodos = [
      ...todos,
      {
        id: id++,
        title: inputVal,
        complete: false,
      },
    ];
    setTodos(newTodos);
    setInpuVal(""); // clear input field
    Storage.set(TODO, newTodos);
  };

  const check = (e) => {
    const id = Number(e.target.id);
    const checked = e.target.checked;

    console.log("check: " + id);
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.complete = checked;
      }
      return todo;
    });
    setTodos(newTodos);
    Storage.set(TODO, newTodos);
  };

  return (
    <div className="todo">
      <h2>todo sample - react</h2>
      <div className="todo__input">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInpuVal(e.target.value)}
        />
        <button className="todo__input-button" onClick={add}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="checkbox">
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.complete}
                onChange={check}
              />
              <label htmlFor={todo.id} />
            </div>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
