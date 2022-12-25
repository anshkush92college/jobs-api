/* ENTRYPOINT */

/* Loading all the relevant dependencies */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

/* IMPORTS */
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
const db = require('./configs/db');

/* Loading the middlewares */
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

/* CONFIGURATION */
const app = express();

/* Using the required middlewares */
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Using the routes */
app.use(generalRoutes);
app.use('/auth', authRoutes);
app.use(jobRoutes);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

/* Running the server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
