import React, { useState } from "react";
import TodoForm from "./todoForm";
import "../App.css";
import Todo from "./todo";
function TodoList(props) {
  const [todos, setTodos] = useState([]);

  // Function to add todo
  const addTodo = (todo) => {
    if (!todo.text) {
      alert("You need to enter todo first");
      return;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (newValue.text === "") {
      alert("You need to enter  todo first");
      return;
    }

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          return newValue;
        } else return todo;
      })
    );
  };

  const moveArrayItemToNewIndex = (old_index, new_index) => {
    const updatedTodos = [...todos];
    if (new_index >= updatedTodos.length) {
      var k = new_index - updatedTodos.length + 1;
      while (k--) {
        updatedTodos.push(undefined);
      }
    }
    updatedTodos.splice(new_index, 0, updatedTodos.splice(old_index, 1)[0]);
    setTodos(updatedTodos);
  };

  const moveUp = (todoId) => {
    const current = todos.find((ele) => ele.id === todoId);

    const index = todos.indexOf(current);

    if (index > 0) {
      moveArrayItemToNewIndex(index, index - 1);
    }
  };

  const moveDown = (todoId) => {
    const current = todos.find((ele) => ele.id === todoId);
    const index = todos.indexOf(current);

    if (index < todos.length - 1) {
      moveArrayItemToNewIndex(index, index + 1);
    }
  };
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    let updatedTodos = todos.filter((todo) => {
      if (todo.id !== id) {
        return todo;
      }
    });

    setTodos(updatedTodos);
  };

  return (
    <div className="card">
      <div className="head"></div>
      <h1 className="card-heading">Check List</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        moveUp={moveUp}
        moveDown={moveDown}
      />
    </div>
  );
}

export default TodoList;
