const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Add your query resolvers here...
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
    // Add your other mutation resolvers here...
  },
};

module.exports = resolvers;
