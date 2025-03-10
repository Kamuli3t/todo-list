import { useReducer, useState } from "react";
import "./App.css";
import { initialTasks } from "./data/tasks";

import DisplayField from "./components/displayField";

const types = {
  EDIT: "EDIT",
  DELETE: "DELETE",
  TOGGLE_COMPLETE: "TOGGLE_COMPLETE",
  ADD: "ADD",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case types.ADD:
      return [
        ...state,
        { id: Date.now(), title: action.payload, completed: false },
      ];

    case types.EDIT:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.text }
          : task
      );

    case types.DELETE:
      return state.filter((task) => task.id !== action.payload);

    case types.TOGGLE_COMPLETE:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    default:
      return state;
  }
};

function App() {
  const [state, todoDispatch] = useReducer(todoReducer, initialTasks);
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() === "") return;

    todoDispatch({ type: types.ADD, payload: taskText });
    setTaskText("");
  };

  return (
    <>
      <h1>Create Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          width: "45%",
          margin: "0.2rem auto",
        }}
      >
        {state.map((task) => (
          <DisplayField task={task} todoDispatch={todoDispatch} types={types} />
        ))}
      </ul>
    </>
  );
}

export default App;
