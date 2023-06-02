import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

const api = axios.create({
  baseURL: API_URL,
});

export const fetchTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await api.post('/todos', todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
