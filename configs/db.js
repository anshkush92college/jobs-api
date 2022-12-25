const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// To avoid the warnings in the terminal
mongoose.set('strictQuery', true);

// Connecting to the MONGO database using mongoose
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;

// To check if the connection is successful
connection.on('error', console.error.bind(console, 'Mongodb connection error'));

connection.once('open', () => {
  console.log('Connected to MONGODB databse successfully');
});

module.exports = connection;
