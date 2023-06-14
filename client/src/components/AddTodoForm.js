import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/AddTodoForm.css';
import 'react-datetime/css/react-datetime.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

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
    const completedTodo = todos.find((todo) => todo.id === id);
    setCompletedTodo(completedTodo);
    setShowCompletionModal(true);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
    deleteTodoFromList(completedTodo.id);
    setCompletedTodo(null);
  };

  const deleteTodoFromList = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
          <Modal.Title>New To-Do Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>A new to-do has been added to the list.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCompletionModal} onHide={handleCloseCompletionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congratulations! You completed the To-Do: {completedTodo?.title}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCompletionModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div>
              <p className="todo-item-title">{todo.title}</p>
              <p>Date: {moment(todo.date).format('MMMM Do YYYY')}</p>
              <p>Time: {moment(todo.date).format('h:mm A')}</p>
            </div>
            {!todo.completed && (
              <button
                className="complete-button"
                onClick={() => handleTodoComplete(todo.id)}
              >
                Complete
              </button>
            )}
            <button
              className="delete-button"
              onClick={() => deleteTodoFromList(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTodoForm;
