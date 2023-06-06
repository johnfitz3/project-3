import React, { useState } from 'react';
import Select from 'react-select';
import Datetime from 'react-datetime';
import { debounce } from 'lodash';
import '../styles/AddTodoForm.css';
import 'react-datetime/css/react-datetime.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const suggestionOptions = [
    'Buy groceries',
    'Go for a run',
    'Read a book',
    'Learn React',
    'Clean the house',
  ];

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleInputChangeDebounced = debounce(handleInputChange, 300);

  const handleInputChangeAsync = (newValue) => {
    handleInputChangeDebounced(newValue);
    setSuggestions(
      suggestionOptions.filter((option) =>
        option.toLowerCase().includes(newValue.toLowerCase())
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption || selectedOption.value.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      title: selectedOption.value,
      completed: false,
      date: selectedDate ? `${selectedDate} ${timeValue}` : '',
    };

    onAddTodo(newTodo);
    setSelectedOption(null);
    setInputValue('');
    setSelectedDate('');
    setTimeValue('');
  };

  const handleSelectChange = (selected) => {
    if (selected) {
      setSelectedOption(selected);
      setInputValue(selected.value);
    } else {
      setSelectedOption(null);
      setInputValue('');
    }
  };

  const handleDateChange = (momentObj) => {
    setSelectedDate(momentObj.format('MM-DD-YYYY'));
  };

  const handleTimeChange = (momentObj) => {
    setTimeValue(momentObj.format('hh:mm:ss A'));
  };

  const handleClearDate = () => {
    setSelectedDate('');
    setTimeValue('');
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <Select
        isClearable
        isSearchable
        placeholder="Enter a new todo..."
        inputValue={inputValue}
        onInputChange={handleInputChangeAsync}
        onChange={handleSelectChange}
        options={suggestions.map((suggestion) => ({
          value: suggestion,
          label: suggestion,
        }))}
        styles={{
          control: (provided) => ({
            ...provided,
            width: '300px', // Set the desired width for the search bar
          }),
        }}
      />
      <Datetime
        inputProps={{ placeholder: 'Select date' }}
        value={selectedDate}
        dateFormat="MM-DD-YYYY"
        onChange={handleDateChange}
      />
      <Datetime
        inputProps={{ placeholder: 'Select time' }}
        value={timeValue}
        dateFormat={false}
        timeFormat="hh:mm A"
        onChange={handleTimeChange}
      />
      {selectedDate && timeValue && (
        <button type="button" onClick={handleClearDate}>
          Clear Date/Time
        </button>
      )}
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
