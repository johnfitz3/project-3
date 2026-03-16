import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($title: String!, $description: String!) {
    createTodo(title: $title, description: $description) {
      id
      title
      description
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;