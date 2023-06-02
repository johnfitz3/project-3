const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Mutation {
    registerUser(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
