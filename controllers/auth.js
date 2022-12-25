const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const { BadRequestError } = require('../errors');
const User = require('../models/user');

const SALT_ROUNDS = process.env.SALT_ROUNDS;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if all the required fields are provided, and throwing an error if not
    if (!name || !email || !password) {
      throw new BadRequestError('Please provide all the required fields');
    }

    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = { name, email, password: hashedPassword };

    // Creating a user in the MongoDB database
    const user = await User.create({ ...tempUser });

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
