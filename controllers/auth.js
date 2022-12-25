const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

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

    // Creating a JWT Token for the user from the MONGO DB methods we created ---> createJWT()
    const jwtToken = user.createJWT();

    // Sending a response to the client
    res.status(StatusCodes.CREATED).json({
      message: '/auth/register route',
      user,
      jwtToken,
    });
  } catch (error) {
    console.log(error.message, error);
    res.status(404).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking if all the required fields are provided, and throwing an error if not
    if (!email || !password) {
      throw new BadRequestError('Please provide all the required fields');
    }

    // Finding the user in the database by email
    const user = await User.findOne({ email });

    // Checking if the user exists in the database, and throwing an error if not
    if (!user) {
      throw new UnauthenticatedError('User doesnt exists');
    }

    // Checking if the password provided by the user matches the password in the database, and throwing an error if not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      throw new UnauthenticatedError('Invalid Password');
    }

    // Creating the JWT token for the user when logging in
    const jwtToken = user.createJWT();

    res
      .status(StatusCodes.OK)
      .json({ message: '/auth/login route', user, jwtToken });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { register, login };
