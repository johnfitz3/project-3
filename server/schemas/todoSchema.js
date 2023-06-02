const { gql } = require('apollo-server');

const typeDefs = gql`
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
    createTodo(title: String!, description: String!): Todo!
  }
`;

module.exports = typeDefs;
