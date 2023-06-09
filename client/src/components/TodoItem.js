import React, { useState } from 'react';
import Select from 'react-select';
import Datetime from 'react-datetime';
import '../styles/AddTodoForm.css';
import 'react-datetime/css/react-datetime.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption || selectedOption.value.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      title: selectedOption.value,
      completed: false,
      date: selectedDate ? selectedDate.format('MM-DD-YYYY hh:mm:ss A') : '',
    };

    onAddTodo(newTodo);
    setSelectedOption(null);
    setSelectedDate('');
  };

  const handleSelectChange = (selected) => {
    if (selected) {
      setSelectedOption(selected);
    } else {
      setSelectedOption(null);
    }
  };

  const handleDateChange = (momentObj) => {
    setSelectedDate(momentObj);
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <Select
        isClearable
        isSearchable
        placeholder="Enter a new todo..."
        value={selectedOption}
        onChange={handleSelectChange}
        options={[]}
        styles={{
          control: (provided) => ({
            ...provided,
            width: '300px',
          }),
        }}
      />
      <Datetime
        inputProps={{ placeholder: 'Select date and time' }}
        value={selectedDate}
        dateFormat="MM-DD-YYYY"
        timeFormat="hh:mm:ss A"
        onChange={handleDateChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
