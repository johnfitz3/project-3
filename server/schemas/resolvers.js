const { gql } = require('apollo-server');
const Todo = require('../models/todo.js');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    createTodo(title: String!, description: String!): Todo!
    registerUser(username: String!, password: String!): User!
    loginUser(username: String!, password: String!): User!
  }
`;

const resolvers = {
  Query: {
    todos: async () => {
      try {
        const todos = await Todo.find();
        return todos;
      } catch (error) {
        throw new Error('Error retrieving todos');
      }
    },
  },
  Mutation: {
    createTodo: async (_, { title, description }) => {
      try {
        const todo = new Todo({
          title,
          description,
        });
        await todo.save();
        return todo;
      } catch (error) {
        throw new Error('Error creating todo');
      }
    },
    registerUser: async (_, { username, password }) => {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('Username is already taken');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = new User({
          username,
          password: hashedPassword,
        });
        await user.save();

        return user;
      } catch (error) {
        throw new Error('Error registering user');
      }
    },
    loginUser: async (_, { username, password }) => {
      try {
        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('Invalid username or password');
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid username or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

        return {
          user,
          token,
        };
      } catch (error) {
        throw new Error('Invalid username or password');
      }
    },
  },
};

module.exports = resolvers;
