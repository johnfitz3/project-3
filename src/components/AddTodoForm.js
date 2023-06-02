import React, { useState } from 'react';
import '../styles/AddTodoForm.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    onAddTodo(newTodo);
    setTitle('');
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new todo..."
        value={title}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
