import React, { useState } from 'react';
import moment from 'moment';
import '../styles/AddTodoForm.css';
import 'react-datetime/css/react-datetime.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddTodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [latestTodo, setLatestTodo] = useState(null);
  const [showTodoList, setShowTodoList] = useState(false); // New state for showing the todo list

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === '' || selectedTime === '') return;

    const newTodo = {
      id: Date.now(),
      title: todoText,
      completed: false,
      date: selectedDate + ' ' + selectedTime,
    };

    setTodos([...todos, newTodo]);
    setLatestTodo(newTodo);
    setTodoText('');
    setSelectedDate('');
    setSelectedTime('');
    handleShowModal();
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    const formattedTime = moment(timeValue, 'HH:mm').format('HH:mm');
    setSelectedTime(formattedTime);
  };

  const handleTodoComplete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (latestTodo) {
      const confirmClose = window.confirm(
        'Are you sure you want to close? Changes will not be saved.'
      );

      if (confirmClose) {
        setLatestTodo(null);
        setShowModal(false);
      }
    } else {
      setLatestTodo(null);
      setShowModal(false);
    }
  };

  const handleSaveChanges = () => {
    setShowModal(false);
    setShowTodoList(true); // Show the todo list after saving changes
  };

  return (
    <div>
      <form className="add-todo-form" onSubmit={handleSubmit}>
        <div className="todo-container">
          <div className="todo-header">
            <input
              type="text"
              placeholder="Enter a new todo..."
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
          </div>
          <div className="todo-content">
            <div className="date-picker">
              <input
                type="date"
                placeholder="Select date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="time-input">
              <input
                type="time"
                placeholder="Select time"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>
            <div className="add-button">
              <button type="submit">Add</button>
            </div>
          </div>
        </div>
      </form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Latest Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Title: {latestTodo?.title}</p>
          <p>Date: {moment(latestTodo?.date).format('MMMM Do YYYY')}</p>
          <p>Time: {moment(latestTodo?.date).format('h:mm A')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {showTodoList && (
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div>
                <p>{todo.title}</p>
                <p>Date: {moment(todo.date).format('MMMM Do YYYY')}</p>
                <p>Time: {moment(todo.date).format('h:mm A')}</p>
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleTodoComplete(todo.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddTodoForm;
