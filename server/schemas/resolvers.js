const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('../utils/auth');
const Todo = require('../models/Todo');

const resolvers = {
  Query: {
    todos: async (_, __, { token }) => {
      const decoded = verifyToken(token);
      if (!decoded) throw new Error('Not authenticated');
      return await Todo.find({ user: decoded.userId });
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const { email, password } = input;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = new User({
          email,
          password: hashedPassword,
        });
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        return {
          token,
          user: {
            id: user._id,
            email: user.email,
          },
        };
      } catch (error) {
        console.log(error);
        throw new Error('Error registering user');
      }
    },
    loginUser: async (_, { input }) => {
      try {
        const { email, password } = input;

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
        const token = generateToken(user);

        return {
          token,
          user: {
            id: user._id,
            email: user.email,
          },
        };
      } catch (error) {
        throw new Error('Invalid email or password');
      }
    },
    createTodo: async (_, { title, description }, { token }) => {
      const decoded = verifyToken(token);
      if (!decoded) throw new Error('Not authenticated');
      
      const todo = new Todo({
        title,
        description,
        user: decoded.userId,
        completed: false,
      });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, completed }, { token }) => {
      const decoded = verifyToken(token);
      if (!decoded) throw new Error('Not authenticated');
      
      const todo = await Todo.findOneAndUpdate(
        { _id: id, user: decoded.userId },
        { completed },
        { new: true }
      );
      return todo;
    },
    deleteTodo: async (_, { id }, { token }) => {
      const decoded = verifyToken(token);
      if (!decoded) throw new Error('Not authenticated');
      
      await Todo.findOneAndDelete({ _id: id, user: decoded.userId });
      return true;
    },
  },
};

module.exports = resolvers;
