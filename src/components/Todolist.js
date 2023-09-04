import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todolist.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showTodoContainer, setShowTodoContainer] = useState(false);
  const [editText, setEditText] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };

      setTodos([newTodoItem, ...todos]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: editText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditText("");
    setEditItemId(null);
  };

  return (
    <div className="todo-container">
      <div className="header">
        <h2>My To Do List</h2>
        <input
          type="text"
          placeholder="Title..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <span className="addBtn" onClick={addTodo}>
          Add
        </span>
        <span
          className="displayBtn"
          onClick={() => setShowTodoContainer(!showTodoContainer)}
        >
          {showTodoContainer ? "Hide Todo" : "Display Todo"}
        </span>
      </div>
      {showTodoContainer && (
        <div className="todo-list">
          <h2>To Do List</h2>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "checked" : ""}`}
              >
                {todo.title}
                <span
                  className="edit-button"
                  onClick={() => {
                    setEditItemId(todo.id);
                    setEditText(todo.title);
                  }}
                >
                  Edit
                </span>
                <span className="delete-button" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </span>
                {editItemId === todo.id && (
                  <span className="edit-field">
                    <input
                      type="text"
                      placeholder="Edit text..."
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button className="update-button" onClick={() => updateTodo(todo.id)}>
                      Update
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
