import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data.token; // Assuming the server returns the token in the response data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchTodos = async (token) => {
  try {
    const response = await api.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (token, todo) => {
  try {
    const response = await api.post('/todos', todo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (token, id, updates) => {
  try {
    const response = await api.put(`/todos/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (token, id) => {
  try {
    const response = await api.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
