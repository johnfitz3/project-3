const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
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
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): Auth!
    loginUser(input: LoginUserInput!): Auth!
    createTodo(title: String!, description: String!): Todo!
  }
`;

module.exports = typeDefs;
