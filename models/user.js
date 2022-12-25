const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');

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
  console.log('🚀 ~ file: user.js:35 ~ salt', salt);
  // Hashing the password with the generated salt
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = model('User', userSchema);

module.exports = User;
