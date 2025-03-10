import React, { useRef, useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { FaRegSave } from "react-icons/fa";

function DisplayField({ task, todoDispatch, types }) {
  const [editing, setEditing] = useState(false);
  const editInput = useRef();
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
            onClick={() => setEditing((prevState) => !prevState)}
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
        <>
          <input
            type="text"
            placeholder={task.title}
            style={{ width: "100%" }}
            ref={editInput}
          />
          <button
            style={{ color: "red" }}
            onClick={() => setEditing((prevState) => !prevState)}
          >
            <GiCancel />
          </button>
          <button
            style={{ color: "green" }}
            onClick={() => {
              if (editInput.current.value) {
                todoDispatch({
                  type: types.EDIT,
                  payload: { id: task.id, text: editInput.current.value },
                });
                setEditing((prevState) => !prevState);
              } else {
                return;
              }
            }}
          >
            <FaRegSave />
          </button>
        </>
      )}
    </li>
  );
}

export default DisplayField;
