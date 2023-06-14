const Todo = require('../models/Todo');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const signToken = require('../utils/auth');

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
     completed: false,
    });
    await todo.save();
    return todo;
   } catch (error) {
    throw new Error('Error creating todo');
   }
  },
  registerUser: async (_, { email, password }) => {
   try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = new User({
     email,
     password: hashedPassword,
    });
    await user.save();

    // Generate JWT token
    const token = signToken(user);

    return {
     user,
     token,
    };
   } catch (error) {
    console.log(error);
    throw new Error('Error registering user');
   }
  },
  loginUser: async (_, { email, password }) => {
   try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
     throw new Error('Invalid email or password');
    }
    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
     throw new Error('Invalid email or password');
    }
    // Generate JWT token
    const token = signToken(user);
    return {
     user,
     token,
    };
   } catch (error) {
    throw new Error('Invalid email or password');
   }
  },
 },
};

module.exports = resolvers;
