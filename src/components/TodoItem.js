import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onDeleteTodo, onDeleteDateTime }) => {
  const { id, title, completed, date } = todo;

  const handleDelete = () => {
    onDeleteTodo(id);
  };

  const handleDeleteDateTime = () => {
    onDeleteDateTime(id);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={completed} />
      <span className="todo-title">{title}</span>
      <button onClick={handleDelete}>Delete Todo</button>
      {date && (
        <div>
          <span className="todo-date">{date}</span>
          <button onClick={handleDeleteDateTime}>Delete Date/Time</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
