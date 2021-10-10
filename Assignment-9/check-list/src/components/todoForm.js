import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 1000),
      text: input,
    });
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className="input-div" onSubmit={handleSubmit}>
      {props.edit ? (
        <div className="edit">
          <h3>Update Your Todo</h3>
          <input
            type="text"
            name="text"
            id="todo-input"
            placeholder="Update a Todo"
            value={input}
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="update_button">Update</button>
        </div>
      ) : (
        <>
          <input
            type="text"
            name="text"
            id="todo-input"
            placeholder="Add a Todo"
            value={input}
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="submit_button">
            <div className="btn"> + </div>
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
