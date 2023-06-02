import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onDeleteTodo, onCompleteTodo }) => {
  const { id, title, completed } = todo;

  const handleDelete = () => {
    onDeleteTodo(id);
  };

  const handleComplete = () => {
    onCompleteTodo(id);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleComplete}
      />
      <span className="todo-title">{title}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
