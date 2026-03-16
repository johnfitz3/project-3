import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS } from '../utils/queries';
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '../utils/mutation';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import '../styles/TodoList.css';

const TodoList = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => refetch(),
  });
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => refetch(),
  });

  const handleAddTodo = (todo) => {
    createTodo({
      variables: {
        title: todo.title,
        description: todo.description,
      },
    });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({ variables: { id } });
  };

  const handleCompleteTodo = (id, currentStatus) => {
    updateTodo({
      variables: { id, completed: !currentStatus },
      optimisticResponse: {
        updateTodo: {
          __typename: 'Todo',
          id,
          completed: !currentStatus,
        },
      },
    });
  };

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>Error loading todos: {error.message}</p>;

  const todos = data?.todos || [];

  return (
    <div className="todo-list-container">
      <h1>To-Do List</h1>
      <div className="todo-list-wrapper">
        <div className="add-todo-form-container">
          <AddTodoForm onAddTodo={handleAddTodo} />
        </div>
        <div className="todo-items-container">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={handleDeleteTodo}
              onCompleteTodo={() => handleCompleteTodo(todo.id, todo.completed)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;