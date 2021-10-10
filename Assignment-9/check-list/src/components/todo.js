import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import "../App.css";
import TodoForm from "./todoForm";

function Todo(props) {
  const [edit, setEdit] = useState({ id: null, value: "" });

  const submitUpdate = (value) => {
    props.updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.todos.map((todo, index) => (
    <div
      key={index}
      className="todoCard"
      id={todo.isComplete ? "todo-completed" : "todo-uncompleted"}
    >
      <div
        id="todoText"
        key={todo.id}
        onClick={() => props.completeTodo(todo.id)}
      >
        {todo.text}
      </div>
      <div className="icons">
        <button
          className="todoButton"
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
        >
          <BiEdit />
        </button>
        <button
          className="todoButton"
          onClick={() => {
            props.deleteTodo(todo.id);
          }}
        >
          <MdDelete />
        </button>
        <button
          className="todoButton"
          onClick={() => {
            props.moveUp(todo.id);
          }}
        >
          <MdArrowUpward />
        </button>
        <button
          className="todoButton"
          onClick={() => {
            props.moveDown(todo.id);
          }}
        >
          <MdArrowDownward />
        </button>
      </div>
    </div>
  ));
}

export default Todo;
