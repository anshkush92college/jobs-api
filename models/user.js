const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    // Checking for the valid email format
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// This function will be called before saving the user to the database
// Hashing the password before saving the user to the database ---> Middleware
userSchema.pre('save', async function () {
  // Generating a salt
  const salt = await bcryptjs.genSalt(Number(process.env.SALT_ROUNDS));
  // Hashing the password with the generated salt
  this.password = await bcryptjs.hash(this.password, salt);
});

// Creating the function to CREATE a JWT Token for the user
userSchema.methods.createJWT = function () {
  // this -----> refers to the user object
  const { _id, name, email } = this;
  return jwt.sign({ id: _id, name, email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const User = model('User', userSchema);

module.exports = User;
