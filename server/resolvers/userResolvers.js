const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
  },
};

module.exports = resolvers;
