const jwt = require('jsonwebtoken');

const signToken = (user) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const verifyToken = (token) => {
  try {
    if (!token) return null;
    const tokenValue = token.split(' ')[1]; // this line Removes "Bearer" prefix
    return jwt.verify(tokenValue, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

module.exports = { generateToken: signToken, verifyToken };
