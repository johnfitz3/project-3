const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Todo {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    registerUser(username: String!, password: String!): User!
    loginUser(username: String!, password: String!): User!
    createTodo(title: String!, description: String!): Todo!
  }
`;

module.exports = typeDefs;
