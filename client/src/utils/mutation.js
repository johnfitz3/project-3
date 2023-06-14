import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      _id
      title
      content
      author {
        _id
        username
      }
    }
  }
`;
