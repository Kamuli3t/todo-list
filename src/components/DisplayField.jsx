import React, { useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";

function DisplayField({ task, todoDispatch, types }) {
  const [editing, setEditing] = useState(false);
  return (
    <li
      key={task.id}
      style={{
        display: "flex",
      }}
    >
      {" "}
      {!editing ? (
        <>
          <input
            type="checkbox"
            name={task.title}
            id={task.id}
            checked={task.completed}
            onChange={() =>
              todoDispatch({
                type: types.TOGGLE_COMPLETE,
                payload: task.id,
              })
            }
          />
          <label
            htmlFor={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </label>

          <button
            style={{ marginLeft: "auto" }}
            onClick={(e) =>
              todoDispatch({ type: types.EDIT, payload: e.target.value })
            }
          >
            <FiEdit />
          </button>
          <button
            style={{ color: "red" }}
            onClick={() =>
              todoDispatch({ type: types.DELETE, payload: task.id })
            }
          >
            <FiDelete />
          </button>
        </>
      ) : (
        <></>
      )}
    </li>
  );
}

export default DisplayField;
