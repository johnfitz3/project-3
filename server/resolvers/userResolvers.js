const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Mutation: {
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
