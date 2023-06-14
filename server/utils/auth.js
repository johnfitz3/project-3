const jwt = require('jsonwebtoken');

const signToken = (user) => {
  const token = jwt.sign({ userId: user.id }, 'd3a12d84b1d044c1560b8dd99be48e9b', {
    expiresIn: '1h',
  });
  return token;
};

module.exports = signToken;
