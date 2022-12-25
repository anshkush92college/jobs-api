const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if all the required fields are provided, and throwing an error if not
    if (!name || !email || !password) {
      throw new BadRequestError('Please provide all the required fields');
    }

    // Creating a user in the MongoDB database
    const user = await User.create({ ...req.body });

    // Creating the JWT Token for the user on registration
    // Don't store the sensitive information in the token, as it gets stored on the client side
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Sending a response to the client
    res.status(StatusCodes.CREATED).json({
      message: '/auth/register route',
      user,
      token,
      mongodbData: user.getPublicFields(),
    });
  } catch (error) {
    console.log(error.message, error);
    res.status(404).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    res.status(200).json({ message: '/auth/login route', data: req.body });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { register, login };
