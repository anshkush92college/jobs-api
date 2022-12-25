const User = require('../models/user');

const register = async (req, res) => {
  try {
    res.status(200).json({ message: '/auth/register route' });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    res.status(200).json({ message: '/auth/login route' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { register, login };
