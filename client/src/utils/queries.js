import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      username
      email
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
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

export const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
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
