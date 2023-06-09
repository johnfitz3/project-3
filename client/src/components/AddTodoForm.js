import React, { useState } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import '../styles/AddTodoForm.css';
import 'react-datetime/css/react-datetime.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      title: todoText,
      completed: false,
      date: selectedDate ? selectedDate.format('MM-DD-YYYY hh:mm:ss A') : '',
    };

    setTodos([...todos, newTodo]);
    setTodoText('');
    setSelectedDate('');
  };

  const handleTextChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleDateChange = (momentObj) => {
    setSelectedDate(momentObj);
  };

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    const formattedTime = moment(selectedDate).format('MM-DD-YYYY') + ' ' + timeValue;
    const newDate = moment(formattedTime, 'MM-DD-YYYY hh:mm A', true);
    if (newDate.isValid()) {
      setSelectedDate(newDate);
    }
  };

  const handleTodoComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    if (id === 'check-api-checkbox-done') {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
              onChange={handleTextChange}
            />
          </div>
          <div className="todo-content">
            <div className="date-picker">
              <Datetime
                inputProps={{ placeholder: 'Select date' }}
                value={selectedDate}
                dateFormat="MM-DD-YYYY"
                timeFormat={false}
                onChange={handleDateChange}
              />
            </div>
            <div className="time-input">
              <input
                type="text"
                placeholder="Enter time (hh:mm AM/PM) or choose from the calendar"
                value={selectedDate ? moment(selectedDate).format('hh:mm A') : ''}
                onChange={handleTimeChange}
              />
            </div>
          </div>
          <div className="todo-footer">
            <button type="submit">Add</button>
          </div>
        </div>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-title">{todo.title}</div>
            <div className="todo-actions">
              <FontAwesomeIcon
                icon={todo.completed ? faCheck : null}
                className={`todo-action ${todo.completed ? 'completed' : 'incomplete'}`}
                onClick={() => handleTodoComplete(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <Form>
        <div className="mb-3 d-flex flex-column align-items-center">
          <div className="d-flex">
            <div className="me-3">
              <Form.Check type="checkbox" id="check-api-checkbox-done">
                <Form.Check.Input
                  type="checkbox"
                  isValid
                  onClick={() => handleTodoComplete('check-api-checkbox-done')}
                />
                <Form.Check.Label>I did it</Form.Check.Label>
                <Form.Control.Feedback type="valid">Success!</Form.Control.Feedback>
              </Form.Check>
            </div>
            <div>
              <Form.Check type="checkbox" id="check-api-checkbox-not-done">
                <Form.Check.Input
                  type="checkbox"
                  isValid
                  onClick={() => handleTodoComplete('check-api-checkbox-not-done')}
                />
                <Form.Check.Label>I could not do it</Form.Check.Label>
                <Form.Control.Feedback type="valid">Nope!</Form.Control.Feedback>
              </Form.Check>
            </div>
          </div>
        </div>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations <img src="https://icons8.com/icon/33824/confetti" alt="confetti" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you completed the task!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTodoForm;
