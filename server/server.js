const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const bodyParser = require("body-parser");
var express = require('express')
var app = express()
const path = require('path')
const mongoose = require('./config/connection')
const dotenv = require('dotenv').config({path:'./.env'})
console.log(process.env)
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  console.log(__dirname, "dirname")
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}
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
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  mongoose.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
