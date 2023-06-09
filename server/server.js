const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const secretKey = 'd3a12d84b1d044c1560b8dd99be48e9b';

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization || '';

    // Add the token to the context
    return { token };
  },
});

// Start the server
server.listen(PORT).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
