/* ENTRYPOINT */

/* Swagger UI dependencies */
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

/* Loading all the relevant dependencies */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
require('dotenv').config();

/* IMPORTS */
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
const db = require('./configs/db');

/* Loading the middlewares */
const authMiddleware = require('./middlewares/authentication');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

/* CONFIGURATION */
const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/* Using the required middlewares */
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(morgan('dev'));

/* Using the routes */
app.use(generalRoutes);
app.use('/auth', authRoutes);
app.use('/jobs', authMiddleware, jobRoutes);

/* Using the custom middlewares */
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

/* Running the server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
