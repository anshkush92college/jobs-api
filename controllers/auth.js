const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if all the required fields are provided, and throwing an error if not
    if (!name || !email || !password) {
      throw new BadRequestError('Please provide all the required fields');
    }

    // Creating a user in the MongoDB database
    const user = await User.create({ ...req.body });

    // Sending a response to the client
    res
      .status(StatusCodes.CREATED)
      .json({ message: '/auth/register route', user });
  } catch (error) {
    console.log(error.message);
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
