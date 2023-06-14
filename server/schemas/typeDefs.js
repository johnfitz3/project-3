const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Auth {
    token: ID!
    user: User
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

  input RegisterUserInput {
    username: String!
    password: String!
  }

  input LoginUserInput {
    username: String!
    password: String!
  }

  type Mutation {
    registerUser(email: String!, password: String!): Auth!
    loginUser(email: String!, password: String!): Auth!
    createTodo(title: String!, description: String!): Todo!
  }
`;

module.exports = typeDefs;
