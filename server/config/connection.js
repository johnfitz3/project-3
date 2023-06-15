require("dotenv").config();
const mongoose = require('mongoose');
const mongoConnection = process.env.REACT_APP_MONGOOSE_STRING;

mongoose
  .connect(mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  module.exports = mongoose.connection