import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import '../styles/TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); // Run only once on component mount

  const handleAddTodo = (todo) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="todo-list-container">
      <h1>To-Do List</h1>
      <div className="todo-list-wrapper">
        <div className="add-todo-form-container">
          <AddTodoForm onAddTodo={handleAddTodo} />
        </div>
        <div className="todo-items-container">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={handleDeleteTodo}
              onCompleteTodo={handleCompleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;

