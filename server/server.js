const dotenv = require("dotenv").config();  
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const path = require("path");
const mongoose = require("./config/connection");
const PORT = process.env.PORT || 3001;
//const dotenv = require('dotenv').config({path:'./.env'})
// console.log(process.env)

var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  app.use(express.static(path.join(__dirname, "../client/build")));
  
}
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization || "";
    // Add the token to the context
    return { token };
  },
});
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  mongoose.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
