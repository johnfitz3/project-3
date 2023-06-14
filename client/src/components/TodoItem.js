import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onDeleteTodo, onCompleteTodo }) => {
  const { id, title, completed, date } = todo;

  const handleDelete = () => {
    onDeleteTodo && onDeleteTodo(id);
  };

  const handleComplete = () => {
    onCompleteTodo && onCompleteTodo(id);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <div className="todo-item-title">{title}</div>
        <div className="todo-item-date">{date}</div>
      </div>
      <div className="todo-item-actions">
        <button className="btn-complete" onClick={handleComplete}>
          {completed ? 'Undo' : 'Complete'}
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
