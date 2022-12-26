const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

// This is a middleware function
const authMiddleware = async (req, res, next) => {
  // Checking for the Authorization header as JWT Token is given in that header
  const authHeader = req.headers.authorization;

  // Checking if the Authorization header is present or not
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Please provide the Authorization Header');
  }

  // Extracting the JWT Token from the Authorization header
  const jwtToken = authHeader.split(' ')[1];

  try {
    // Verifying the JWT Token or getting the payload from the JWT Token
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Finding the user in the database by the id in the JWT Token
    const user = await User.findById(decodedToken.id);

    // Checking if the user is present or not
    if (!user) {
      throw new UnauthenticatedError('User not found');
    } else {
      // Adding the user to the request object
      req.user = user;
    }
  } catch (error) {
    throw new UnauthenticatedError('Invalid Authorization Header / JWT Token');
  }

  // Since it is a middleware, we need to pass the user to the next function, otherwise it will be stuck here
  next();
};

module.exports = authMiddleware;
